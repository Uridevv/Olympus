import { Router } from 'express'
import { getShoppingCart, disableShoppingCart, addItemToCart, removeItemFromCart, createOrUpdateShoppingCart, successShoppingCart, updateCartItem, decreaseCartItem } from '../controllers/shoppingCart.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'


const router = Router();

router.get("/getShoppingCart/:id", getShoppingCart)

router.post('/createShoppingCart/:id', createOrUpdateShoppingCart)

router.post("/disableShoppingCart/:id", disableShoppingCart)

router.post("/succesShoppingCart/:id", successShoppingCart)

router.post("/addItemShoppingCart/:id", addItemToCart)

router.post("/decreaseItemShoppingCart/:id", decreaseCartItem)

router.post("/removeItemShoppingCart/:id", removeItemFromCart)

router.post("/updateItemShoppingCart/:id", updateCartItem)


export default router