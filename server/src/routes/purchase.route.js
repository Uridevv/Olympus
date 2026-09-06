import { Router } from 'express'
import { getOnePurchase,getPurchases,getAllPurchases } from '../controllers/purchase.controller.js'

const router = Router();

router.get("/getAllPurchases", getAllPurchases)

router.get("/getPurchases/:id", getPurchases)

router.post("/getOnePurchase/:id", getOnePurchase)


export default router