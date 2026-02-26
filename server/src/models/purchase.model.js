import mongoose from 'mongoose'

export const purchaseModel = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,

    },
    productBought: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        trim: true,
    },
    productImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage',
        trim: true,
    },
    state: {
        type: String,
        enum: ["processing", "inComing", "delivered"],
        default: "processing"
    }
}, {
    timestamps: true
})

export default mongoose.model('Purchase', purchaseModel);