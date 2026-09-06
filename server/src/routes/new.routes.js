import { Router } from 'express'
import { getNews, getNew, createNew, updatenew, deleteNew, uploadSingleImage } from '../controllers/new.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { NewSchema } from '../schemas/new.schema.js'

const router = Router();

router.get('/getNews', getNews)

router.get('/getNew/:id', getNew)

router.post('/createNew', uploadSingleImage, validateSchema(NewSchema), createNew)

router.put('/updateNew/:id', uploadSingleImage, validateSchema(NewSchema), updatenew)

router.delete('/deleteNew/:id', deleteNew)


export default router
