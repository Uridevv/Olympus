import Stripe from 'stripe'
import mongoose from 'mongoose'
import { STRIPE_PRIVATE_KEY, FRONT_END_URL, STRIPE_WEBHOOK_SECRET } from '../config.js'
// controllers/stripeController.js
import Purchase from '../models/purchase.model.js'; // Asegúrate que el modelo esté bien nombrado
import PendingReview from '../models/pendingReview.model.js'

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
    const productsRaw = metadata?.products;

    if (!userId || !productsRaw) {
      return res.status(400).json({ message: 'Missing metadata in Stripe session' });
    }

    const products = JSON.parse(productsRaw); // products: [{ _id, quantity }]

    try {
      // Registrar cada producto como venta
      const sales = products.map((product) => ({
        userId: new mongoose.Types.ObjectId(userId),
        productBought: new mongoose.Types.ObjectId(product._id),
        productImg: new mongoose.Types.ObjectId(product.imageId)
      }));

      const resPurchase = await Purchase.insertMany(sales);
      if (!resPurchase) {
        throw new Error('Error al guardar las ventas en la base de datos');
      }
      console.log('✅ Ventas registradas en base de datos');

      const pendingReviews = products.map((product) => ({
        user: new mongoose.Types.ObjectId(userId),
        product: new mongoose.Types.ObjectId(product._id),
      }));
      const resPendingReviews = await PendingReview.insertMany(pendingReviews);
      if (!resPendingReviews) {
        throw new Error('Error al guardar las reseñas pendientes en la base de datos');
      }
      console.log('✅ Pending Reviews registradas en base de datos');

      return res.status(200).json({ message: 'Ventas y pending reviews registradas correctamente' });
    } catch (error) {
      console.error('Error al guardar ventas:', error);
      return res.status(500).json({ message: 'Error al registrar ventas' });
    }
  }

  // Confirma a Stripe que el evento fue recibido
  res.status(200).send('Evento recibido');
};