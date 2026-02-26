import mongoose from 'mongoose'

export const otpModel = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // ⏳ El documento se elimina automáticamente después de 300s (5 min)
    },
})

export default mongoose.model('Otp', otpModel);