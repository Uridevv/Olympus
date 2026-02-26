import mongoose from 'mongoose';

const offeredProductModel = new mongoose.Schema({
    isOffered: {
        type: Boolean,
        require: true,
        trim: true,
        default: false
    },
    offers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Offer',
        require: true,
        trim: true,
    },
},
    { _id: false } // 
)

export const productModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        trim: true,
    },
    colors: {
        type: [String],
        require: true,
    },
    size: {
        type: [String],
        require: true,
    },
    stock: {
        type: Number,
        require: true,
        trim: true,
    },
    sells: {
        type: Number,
        default: 0,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    offered: {
        type: offeredProductModel,
        default: { isOffered: false, offers: [] },
        require: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productModel);