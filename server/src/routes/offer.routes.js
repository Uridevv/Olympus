import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { createOffer, getAllOffers, getOneOffer, updateOffer, deleteOffer, uploadSingleImage,getProductsInOffer, getOffersByProduct } from '../controllers/offer.controller.js'
import { OfferSchema } from '../schemas/offer.schema.js'

const router = Router();

router.post("/createOffer", uploadSingleImage, validateSchema(OfferSchema), createOffer);

router.get("/getAllOffers", getAllOffers)

router.get("/getOneOffer/:id", getOneOffer)

router.get("/getProductsInOffer/:id", getProductsInOffer)

router.get("/getOffersByProduct/:id", getOffersByProduct)

router.put("/updateOffer/:id", uploadSingleImage, validateSchema(OfferSchema), updateOffer);

router.delete("/deleteOffer/:id", deleteOffer)


export default router