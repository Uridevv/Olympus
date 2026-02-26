import { Router } from 'express'
import { getOnePurchase,getPurchases } from '../controllers/purchase.controllers.js'

const router = Router();

router.get("/getPurchases/:id", getPurchases)

router.post("/getOnePurchase/:id", getOnePurchase)


export default router