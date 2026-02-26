import axios from "./axios.js";
import { PendingReview } from "@/Types/pendingReview.js";

export const getPendingReviews = (userId: string) =>
  axios.get<PendingReview[]>(`/pending-reviews/${userId}`);

export const getOnePendingReview = (pendingReviewId: string) =>
  axios.get<PendingReview>(`/get-pending-review/${pendingReviewId}`);

export const deletePendingReview = (pendingReviewId: string) =>
  axios.delete(`/delete-pending-review/${pendingReviewId}`);
