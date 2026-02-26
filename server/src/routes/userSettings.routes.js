import { Router } from 'express'
import { createUserSettings, updateUserSettings, getUserSettings,updateUserData } from '../controllers/userSettings.controllers.js'

const router = Router();

router.post("/createSettings/:id", createUserSettings)

router.get("/getSettings/:id", getUserSettings)

router.put("/updateSettings/:id", updateUserSettings)

router.put("/updateData/:id",updateUserData)

export default router