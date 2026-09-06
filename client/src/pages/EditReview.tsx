import { useEffect, useState } from "react";
import { ProductStars } from "@/components/products/ProductStars";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { createReview } from "@/api/review";
import { useNavigate, useParams } from "react-router-dom";
import { PendingReview } from "@/Types/pendingReview";
import { deletePendingReview, getOnePendingReview } from "@/api/pendingReviews";
import { toast } from "sonner";

interface ReviewFormData {
  opinion: string;
}

export function EditReview() {
  const [rating, setRating] = useState<number>(0);
  const { id } = useParams();
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<ReviewFormData>();
  const navigate = useNavigate();
  const [pendingReview, setPendingReview] = useState<PendingReview>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPendingReview = async () => {
      try {
        const res = await getOnePendingReview(id || "");
        setPendingReview(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load the pending review");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPendingReview();
  }, [id]);

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }
    if (!pendingReview) return;

    try {
      await createReview({
        user: pendingReview.user?._id || "",
        product: pendingReview.product?._id || "",
        rating,
        opinion: data.opinion,
      });

      await deletePendingReview(id || "");

      toast.success("Review submitted, thank you!");
      navigate(`/profile/reviews`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit the review");
    }
  };

  if (isLoading) {
    return (
      <div className="p-20 max-w-6xl sm:px-6 lg:px-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-20 max-w-6xl sm:px-6 lg:px-8 flex flex-col">
      <h1 className="mb-5 text-3xl font-bold self-start">Write a Review</h1>

      {pendingReview?.product && (
        <div className="flex items-center gap-4 mb-5">
          {pendingReview.product.previewImage && (
            <img
              src={pendingReview.product.previewImage}
              alt={pendingReview.product.name}
              className="h-16 w-16 rounded-md object-cover"
            />
          )}
          <p className="text-xl font-semibold">{pendingReview.product.name}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-10 rounded-lg w-full h-full"
      >
        <ProductStars value={rating} onChange={setRating} />

        <div className="flex flex-col gap-4">
          <Label htmlFor="review" className="text-2xl">
            Your Review
          </Label>
          <Textarea
            id="review"
            {...register("opinion", { required: true })}
            className="w-full min-h-50 p-2 rounded-md border border-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Write your review here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-secondary-background text-foreground p-2 rounded-md hover:bg-background-hover hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Review
        </button>
      </form>
    </div>
  );
}
