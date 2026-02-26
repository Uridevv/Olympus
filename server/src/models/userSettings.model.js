import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        twoFactorAuth: {
            type: Boolean,
            default: false,
            require: false
        },
        recoveryEmail: {
            type: String,
            default: "",
            require: false
        },
        securityQuestions: {
            type: [String],
            default: [],
            require: false
        },
        country: {
            type: String,
            default: "",
            require: false
        },
        notificationPreferences: {
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: false
            },
            push: {
                type: Boolean,
                default: false
            }
        },
    },
    { timestamps: true }
);

export default mongoose.model("UserSettings", userSettingsSchema);
