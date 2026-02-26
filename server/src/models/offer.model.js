import mongoose from 'mongoose'

const imageOfferModel = new mongoose.Schema({

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
},
    { _id: false } // 
)

export const offerModel = new mongoose.Schema({
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
        type: imageOfferModel,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        trim: true,
    },
    discount: {
        type:Number,
        require:true
    }
}, {
    timestamps: true
})

export default mongoose.model('Offer', offerModel);