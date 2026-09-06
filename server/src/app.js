// Requered Modules.
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {FRONT_END_URL} from './config.js'

// Routes
import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import webhookRoutes from './routes/webhook.routes.js'
import productImagesRoutes from './routes/productImage.routes.js';
import shoppingCartRoutes from './routes/shoppingCart.routes.js'
import wishListRoutes from './routes/wishList.routes.js'
import purchaseRoutes from './routes/purchase.route.js'
import offerRoutes from './routes/offer.routes.js'
import resendRoutes from './routes/resend.routes.js'
import userSettingsRoutes from './routes/userSettings.routes.js'
import pendingReviewsRoutes from './routes/pendingReviews.routes.js'
import reviewsRoutes from './routes/review.routes.js'
import newRoutes from './routes/new.routes.js'
import notificationRoutes from './routes/notification.routes.js'


// Cors Modules.
import cors from 'cors'

// Ejecutar Express.
const app = express()

// Cors Config.
app.use(cors({
    origin: `${FRONT_END_URL}`,
    credentials: true
}))

// Middlewares Config.
app.use(morgan('dev'))

app.use('/api', webhookRoutes)

app.use(express.json())
app.use(cookieParser())

// Routes Config.
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api', categoryRoutes)
app.use('/api', paymentRoutes)
app.use('/api', productImagesRoutes)
app.use('/api', shoppingCartRoutes)
app.use('/api', wishListRoutes)
app.use('/api', purchaseRoutes)
app.use('/api', offerRoutes)
app.use('/api', resendRoutes)
app.use('/api', userSettingsRoutes)
app.use('/api', pendingReviewsRoutes)
app.use('/api', reviewsRoutes)
app.use('/api', newRoutes)
app.use('/api', notificationRoutes)


app.get("/", (req, res) => res.send("Express on Vercel"));

export default app