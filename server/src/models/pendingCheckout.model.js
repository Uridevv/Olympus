import mongoose from 'mongoose'

export const pendingCheckoutModel = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            imageId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductImage',
            },
        }
    ],
}, {
    timestamps: true
})

export default mongoose.model('PendingCheckout', pendingCheckoutModel);
