import axios from "./axios.js";
import { Review } from "@/Types/review";


interface ReviewAdd {
  user: string;
  product: string;
  rating: number;
  opinion: string;
}

export const createReview = (review: ReviewAdd) =>
  axios.post<Review>("/create-review", review);

export const getReviewsByProduct = (productId: string) =>
  axios.get<Review[]>(`/product-reviews/${productId}`);

export const getReviewsByUser = (userId: string) =>
  axios.get<Review[]>(`/user-reviews/${userId}`);

export const deleteReview = (reviewId: string) =>
  axios.delete(`/delete-review/${reviewId}`);

export const likeReview = (reviewId: string, userId: string) =>
  axios.post<Review>(`/like-review/${reviewId}`, { userId });

export const dislikeReview = (reviewId: string, userId: string) =>
  axios.post<Review>(`/dislike-review/${reviewId}`, { userId });
