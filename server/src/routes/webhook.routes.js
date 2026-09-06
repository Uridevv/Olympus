import {Router, raw} from 'express';
import { stripeWebhook } from '../controllers/webhook.controller.js';

const router = Router();

router.post('/webhook', raw({ type: 'application/json' }), stripeWebhook);

export default router;
