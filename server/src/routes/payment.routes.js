import { Router } from 'express'
import { createCheckoutSession } from '../controllers/payment.controllers.js'

const router = Router();

router.post('/create-checkout-session', createCheckoutSession)

export default router;