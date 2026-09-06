import { Router } from 'express'
import { getCategories,addCategory,deleteCategory, getCategory, updateCategory } from '../controllers/category.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { CategorySchema } from '../schemas/category.schema.js'

const router = Router();

router.get("/categories", getCategories)

router.get("/getCategory/:id", getCategory)

router.post("/addCategory", validateSchema(CategorySchema), addCategory)

router.post("/deleteCategory/:id", deleteCategory)

router.put("/updateCategory/:id", updateCategory)

export default router