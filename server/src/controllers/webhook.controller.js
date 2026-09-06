import Stripe from 'stripe'
import mongoose from 'mongoose'
import { STRIPE_PRIVATE_KEY, FRONT_END_URL, STRIPE_WEBHOOK_SECRET } from '../config.js'
// controllers/stripeController.js
import Purchase from '../models/purchase.model.js'; // Asegúrate que el modelo esté bien nombrado
import PendingReview from '../models/pendingReview.model.js'
import Notification from '../models/notification.model.js'
import PendingCheckout from '../models/pendingCheckout.model.js'
import Product from '../models/product.model.js'

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

// Middleware del webhook
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Stripe necesita el body sin parsear para verificar la firma
    event = stripe.webhooks.constructEvent(
      req.body, // ← Aquí va `req.body`, no `req.rawBody`, ya que Express lo está recibiendo como raw
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error al verificar la firma del webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejamos el evento de compra completada
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Recuperar metadata enviada en la sesión
    const metadata = session.metadata;
    const userId = metadata?.userId;
    const pendingCheckoutId = metadata?.pendingCheckoutId;

    if (!userId || !pendingCheckoutId) {
      return res.status(400).json({ message: 'Missing metadata in Stripe session' });
    }

    const pendingCheckout = await PendingCheckout.findById(pendingCheckoutId);
    if (!pendingCheckout) {
      return res.status(400).json({ message: 'Pending checkout not found' });
    }

    const products = pendingCheckout.products; // products: [{ _id, quantity, imageId }]

    try {
      // Descontar stock de forma atómica: el filtro exige stock >= quantity,
      // así que si dos compras concurrentes agotan el mismo producto entre la
      // creación de la sesión de Stripe y el pago, solo una gana la carrera
      // y el stock nunca queda en negativo (evita overselling).
      const stockResults = await Promise.all(
        products.map(async (product) => {
          const updated = await Product.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(product._id),
              stock: { $gte: product.quantity }
            },
            {
              $inc: {
                stock: -product.quantity,
                sells: product.quantity
              }
            },
            { new: true }
          );
          return { product, fulfilled: !!updated };
        })
      );

      const fulfilledProducts = stockResults.filter((r) => r.fulfilled).map((r) => r.product);
      const oversoldProducts = stockResults.filter((r) => !r.fulfilled).map((r) => r.product);

      if (oversoldProducts.length > 0) {
        await Notification.create({
          user: new mongoose.Types.ObjectId(userId),
          title: 'Producto sin stock disponible',
          message: 'Uno o más productos de tu compra se agotaron justo antes de confirmarse el pago. Nuestro equipo procesará el reembolso correspondiente.',
          type: 'estatus de pedidos',
        });
      }

      console.log('✅ Stock de productos actualizado');

      if (fulfilledProducts.length > 0) {
        // Registrar cada producto con stock disponible como venta
        const sales = fulfilledProducts.map((product) => ({
          userId: new mongoose.Types.ObjectId(userId),
          productBought: new mongoose.Types.ObjectId(product._id),
          productImg: new mongoose.Types.ObjectId(product.imageId)
        }));

        const resPurchase = await Purchase.insertMany(sales);
        if (!resPurchase) {
          throw new Error('Error al guardar las ventas en la base de datos');
        }
        console.log('✅ Ventas registradas en base de datos');

        const pendingReviews = fulfilledProducts.map((product) => ({
          user: new mongoose.Types.ObjectId(userId),
          product: new mongoose.Types.ObjectId(product._id),
        }));
        const resPendingReviews = await PendingReview.insertMany(pendingReviews);
        if (!resPendingReviews) {
          throw new Error('Error al guardar las reseñas pendientes en la base de datos');
        }
        console.log('✅ Pending Reviews registradas en base de datos');

        const pendingReviewNotifications = resPendingReviews.map(() => ({
          user: new mongoose.Types.ObjectId(userId),
          title: 'Tienes una reseña pendiente',
          message: 'Tienes un producto pendiente por reseñar. ¡Cuéntanos qué te pareció!',
          type: 'estatus de pedidos',
        }));
        await Notification.insertMany(pendingReviewNotifications);
        console.log('✅ Notificaciones de reseñas pendientes registradas en base de datos');
      }

      await PendingCheckout.findByIdAndDelete(pendingCheckoutId);

      return res.status(200).json({
        message: 'Ventas y pending reviews registradas correctamente',
        oversold: oversoldProducts.map((p) => p._id),
      });
    } catch (error) {
      console.error('Error al guardar ventas:', error);
      return res.status(500).json({ message: 'Error al registrar ventas' });
    }
  }

  // Confirma a Stripe que el evento fue recibido
  res.status(200).send('Evento recibido');
};