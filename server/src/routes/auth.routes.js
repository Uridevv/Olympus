import { Router } from 'express'
import { register, login, logout, profile, verifyToken, registerNewAdmin, loginWithAuth0, loginAdminAuth0, getUser, verifyOtpLogin } from '../controllers/auth.controllers.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import { authRequired } from '../middlewares/authReuqired.js'

const router = Router();

router.post('/getUser', getUser)

router.post('/register', validateSchema(registerSchema), register)

router.post('/auth/auth0-login', loginWithAuth0)

router.post('/auth/auth0-admin-login', loginAdminAuth0)

router.post('/registerNewAdmin', validateSchema(registerSchema), registerNewAdmin)

router.post('/login', login)

router.post('/verify-otp-login', verifyOtpLogin)

router.post('/logout', logout)

router.post('/verify', verifyToken)

router.get('/profile', authRequired, profile)



export default router;