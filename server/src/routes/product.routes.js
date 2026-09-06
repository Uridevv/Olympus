import { Router } from 'express'
import { addProduct, getProduct, deleteProduct, getAllProducts, updateProduct, changeProductStatus, getProductsActive } from '../controllers/products.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { addProductSchema } from '../schemas/product.schema.js'

const router = Router();

router.get('/getAllProducts', getAllProducts);

router.get('/getAllProductsActive', getProductsActive);

router.get('/getProduct/:id', getProduct);

router.post('/addProduct', validateSchema(addProductSchema), addProduct);

router.put('/updateProduct/:id', updateProduct)

router.delete('/deleteProduct/:id', deleteProduct);

router.put('/changeProductStatus/:id', changeProductStatus);


export default router;