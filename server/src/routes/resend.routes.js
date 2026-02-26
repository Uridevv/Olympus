import {Router} from 'express';
import {sendOtp, validateOTP} from '../controllers/resend.controllers.js'


const router = Router();

router.post('/send-otp',sendOtp);

router.post('/validateOTP', validateOTP)

export default router;