import mongoose from 'mongoose'

const imageNewModel = new mongoose.Schema({
    url: {
        type: String,
        require: true,
        trim: true,
    },
    public_id: {
        type: String,
        require: true,
        trim: true,
    },
}, { _id: false })

export const newModel = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: imageNewModel,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

export default mongoose.model('New', newModel);
