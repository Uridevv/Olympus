import mongoose from 'mongoose'

export const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    }, phoneNumber: {
        type: Number,
        require: false,
        trim: true,
    }, password: {
        type: String,
        require: false,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "manager", "user"],
        default: "user"
    },
    auth0Id: {
        type: String,
        parse: true
    },
    userImage: {
        type: String,
        required:false
    }
}, {
    timestamps: true
})

// ÍNDICE PARCIAL
userModel.index(
  { auth0Id: 1 },
  {
    unique: true,
    partialFilterExpression: {
      auth0Id: { $exists: true, $ne: null },
    },
  }
);

export default mongoose.model('User', userModel)