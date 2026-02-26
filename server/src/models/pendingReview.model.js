import mongoose from 'mongoose';

const pendingReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    trim: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // opcional si quieres enlazar con la orden
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '90d', // opcional: elimina automáticamente pendientes muy viejos
  },
});

export default mongoose.model('PendingReview', pendingReviewSchema);
