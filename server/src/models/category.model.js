import mongoose from 'mongoose'

export const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Category', categoryModel);