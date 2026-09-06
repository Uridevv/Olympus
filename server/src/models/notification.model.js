import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        enum: ['leido', 'sin leer'],
        default: 'sin leer',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['promociones', 'estatus de pedidos', 'novedades'],
        required: true,
    },
}, {
    timestamps: true
})

export default mongoose.model('Notification', notificationSchema);
