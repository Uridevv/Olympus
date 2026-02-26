import { Router } from 'express'
import { createReview, getProductReviews, getUserReviews, deleteReview } from '../controllers/review.controllers.js'

const router = Router();

router.get('/product-reviews/:productId', getProductReviews);

router.get('/user-reviews/:userId', getUserReviews);

router.post('/create-review', createReview);

router.delete('/delete-review/:id', deleteReview);

export default router;