import Stripe from 'stripe';
import { STRIPE_PRIVATE_KEY, FRONT_END_URL } from '../config.js';

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!products || !userId) {
      return res.status(400).json({ message: 'Faltan datos necesarios' });
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

    const session = await stripe.checkout.sessions.create({
      line_items: productsToPay,
      mode: 'payment',
      success_url: `${FRONT_END_URL}/success`,
      cancel_url: `${FRONT_END_URL}/cart`,
      metadata: {
        userId,
        products: JSON.stringify(
          products.map(p => ({
            _id: p._id,
            quantity: p.quantity,
            imageId: p.imageId
          }))
        ),
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear sesión de Stripe' });
  }
};