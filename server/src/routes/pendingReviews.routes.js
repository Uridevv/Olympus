import { Router } from 'express'
import { getPendingReviews, deletePendingReview, getOnePendingReview } from '../controllers/pendingReview.controllers.js'

const router = Router();

router.get('/pending-reviews/:userId', getPendingReviews);

router.get('/get-pending-review/:id', getOnePendingReview);

router.delete('/delete-pending-review/:id', deletePendingReview);

export default router;