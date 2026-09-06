import { Router } from 'express'
import { getWishList, addWishItem, deleteWishItem, productInWishList } from '../controllers/wishList.controller.js'

const router = Router();

router.get("/getWishList/:id", getWishList)

router.post("/addWishItem/:id", addWishItem)

router.post("/deleteWishItem/:id", deleteWishItem)

router.post("/itemInWishList/:id", productInWishList)


export default router