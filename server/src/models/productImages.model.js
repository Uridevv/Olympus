import mongoose from 'mongoose'

export const productImageModel = new mongoose.Schema({
    url: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    public_id: {
        type: String,
        require: true, // ← nuevo campo obligatorio
        trim: true,
        unique: true,   // normalmente es único en Cloudinary
    },
    color: {
        type: String,
        require: true,
        trim: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
}, {
    timestamps: true
})

export default mongoose.model('ProductImage', productImageModel);