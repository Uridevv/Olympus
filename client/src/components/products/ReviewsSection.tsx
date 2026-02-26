import { getReviewsByProduct } from "@/api/review";
import { ReviewTarget } from "@/components/products/ReviewTarget.tsx";
import { Review } from "@/Types/review";
import { useEffect, useState } from "react";

export function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await getReviewsByProduct(productId);
        setReviews(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reviews
        </h2>
        <div className="text-center">
          <h3 className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          No reviews yet
        </h3>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Be the first to review this product!
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        Customer Reviews
      </h3>
      <div className="mt-6 space-y-8">
        {reviews.map((review) => (
          <ReviewTarget key={review._id} review={review} />
        ))}

      </div>
    </div>
  );
}
