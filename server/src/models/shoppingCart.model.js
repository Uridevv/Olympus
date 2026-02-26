import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductImage',
      required: true
    }
  },
  { _id: false } // No necesita _id cada ítem del carrito
);

const ShoppingCartModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [CartItemSchema],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active'
    },
  },
  { timestamps: true }
);

export default mongoose.model('ShoppingCart', ShoppingCartModel);
