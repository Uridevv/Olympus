import { Resend } from 'resend';
import { RESEND_API_KEY } from '../config.js'
import { generateOTP } from '../libs/otp.js';
const resend = new Resend(RESEND_API_KEY);
import OTP from '../models/otp.model.js'

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        await OTP.deleteMany({ email: email });

        const otpGenerated = generateOTP();

        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "OTP Verification Code",
            html: `<strong>${otpGenerated}</strong>`,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        const newOtp = new OTP({
            email,
            code: otpGenerated,
        })

        const OTPSaved = await newOtp.save();

        return res.status(200).json({ message: "Email sent", otp: OTPSaved });
    } catch (error) {
        res.status(500).json({ error: "Error enviando OTP" })
    }
};

export const validateOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(req.body)
        const OTPFound = await OTP.findOne({ email: email })
        if (!OTPFound) return res.status(404).json({ message: "OTP not found" })

        if (OTPFound.code == otp) {
            return res.status(200).json({ message: "Validated" })
        } else {
            return res.status(400).json({ message: "No match" })

        }
    } catch (error) {
        return res.status(500).json({ error: "Server internal error" })
    }
}