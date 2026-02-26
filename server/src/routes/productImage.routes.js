import { Router } from 'express'
import { getProductImages, createProductImage, deleteProductImage, getProductImage, getAllProductImages, updateProductImage, deleteProductImageCloudinary, deleteImage } from '../controllers/productImages.controllers.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { ProductImageSchema } from '../schemas/productImage.schema.js'


const router = Router();

router.get('/getProductImage/:id', getProductImage)

router.post('/getProductImages', getProductImages)

router.post('/getAllProductImages', getAllProductImages)

router.post('/addProductImage', validateSchema(ProductImageSchema), createProductImage)

router.put('/updateImage/:id', updateProductImage)

router.delete('/deleteimage/:id', deleteImage)

router.post('/deleteImageCloudinary', deleteProductImageCloudinary)

router.post('/deleteImages', deleteProductImage)

export default router