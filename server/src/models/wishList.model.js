import mongoose from 'mongoose';

const WishItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    url: {
      type: String,
      required: true
    }
  },
  { _id: false } // No necesita _id cada ítem del carrito
);

const WishListModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [WishItemSchema],
      default: []
    },
  },
  { timestamps: true }
);

export default mongoose.model('WishList', WishListModel);
