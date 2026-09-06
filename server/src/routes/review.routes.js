import { Router } from 'express'
import { createReview, getProductReviews, getUserReviews, deleteReview, likeReview, dislikeReview } from '../controllers/review.controller.js'

const router = Router();

router.get('/product-reviews/:productId', getProductReviews);

router.get('/user-reviews/:userId', getUserReviews);

router.post('/create-review', createReview);

router.post('/like-review/:id', likeReview);

router.post('/dislike-review/:id', dislikeReview);

router.delete('/delete-review/:id', deleteReview);

export default router;