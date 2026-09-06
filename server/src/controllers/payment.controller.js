import Stripe from 'stripe';
import { STRIPE_PRIVATE_KEY, FRONT_END_URL } from '../config.js';
import PendingCheckout from '../models/pendingCheckout.model.js';
import Product from '../models/product.model.js';

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!products || !userId) {
      return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    // Verificamos el stock disponible antes de crear la sesión de pago,
    // para rechazar la compra lo antes posible si no hay suficiente.
    const productIds = products.map((p) => p._id);
    const productsInDb = await Product.find({ _id: { $in: productIds } }, '_id stock name');
    const stockById = new Map(productsInDb.map((p) => [p._id.toString(), p]));

    const outOfStock = [];
    for (const product of products) {
      const dbProduct = stockById.get(product._id.toString());
      if (!dbProduct || dbProduct.stock < product.quantity) {
        outOfStock.push({
          _id: product._id,
          name: dbProduct?.name ?? product.name,
          available: dbProduct?.stock ?? 0,
          requested: product.quantity,
        });
      }
    }

    if (outOfStock.length > 0) {
      return res.status(409).json({
        message: 'Uno o más productos no tienen stock suficiente',
        outOfStock,
      });
    }

    const productsToPay = products.map((product) => ({
      price_data: {
        product_data: {
          name: product.name,
          description: product.description,
        },
        currency: 'usd',
        unit_amount: product.price * 100, // Stripe trabaja en centavos
      },
      quantity: product.quantity,
    }));

    // Guardamos el carrito en la BD para no depender del límite de 500
    // caracteres por valor de metadata en Stripe. El webhook recupera
    // los productos por este id en vez de parsear metadata.products.
    const pendingCheckout = await PendingCheckout.create({
      userId,
      products: products.map(p => ({
        _id: p._id,
        quantity: p.quantity,
        imageId: p.imageId
      }))
    });

    const session = await stripe.checkout.sessions.create({
      line_items: productsToPay,
      mode: 'payment',
      success_url: `${FRONT_END_URL}/success`,
      cancel_url: `${FRONT_END_URL}/cart`,
      metadata: {
        userId,
        pendingCheckoutId: pendingCheckout._id.toString(),
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear sesión de Stripe' });
  }
};