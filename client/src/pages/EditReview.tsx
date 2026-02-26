import { useEffect, useState } from "react";
import { ProductStars } from "@/components/products/ProductStars";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { createReview } from "@/api/review";
import { useNavigate, useParams } from "react-router-dom";
import { PendingReview } from "@/Types/pendingReview";
import { deletePendingReview, getOnePendingReview } from "@/api/pendingReviews";

interface ReviewFormData {
  rating: number;
  opinion: string;
}

export function EditReview() {
  const [rating, setRating] = useState<number>(0);
  const { id } = useParams();
  const { handleSubmit, register } = useForm<ReviewFormData>();
  const navigate = useNavigate();
  const [pendingReview, setPendingReview] = useState<PendingReview>();

  useEffect(() => {
    const fetchPendingReview = async () => {
      try {
        const res = await getOnePendingReview(id || "");
        console.log(res.data);
        setPendingReview(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPendingReview();
  }, []);

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      const res = await createReview({
        user: pendingReview?.user?._id || "",
        product: pendingReview?.product?._id || "",
        rating,
        opinion: data.opinion,
      });
      console.log(res.data)

      const resDeletedReview = await deletePendingReview(id || "");
      console.log(resDeletedReview.data)

      navigate(`/profile/reviews`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-20 max-w-6xl sm:px-6 lg:px-8 flex flex-col">
      <h1 className="mb-5 text-3xl font-bold self-start">Edit Review</h1>

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
          className="bg-secondary-background text-foreground p-2 rounded-md hover:bg-background-hover hover:cursor-pointer"
        >
          Save Review
        </button>
      </form>
    </div>
  );
}
