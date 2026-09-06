import { likeReview, dislikeReview } from "@/api/review";
import { useAuth } from "@/store/authStore";
import { Review } from "@/Types/review";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ReviewTarget({ review }: { review: Review }) {
  const userId = useAuth((state) => state.user?._id);

  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [reaction, setReaction] = useState<"like" | "dislike" | false>(false);
  const [stars, setStars] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLikes(review.likes || 0);
    setDislikes(review.dislikes || 0);
    setStars(review.rating || 5);

    if (userId && review.likedBy?.includes(userId)) {
      setReaction("like");
    } else if (userId && review.dislikedBy?.includes(userId)) {
      setReaction("dislike");
    } else {
      setReaction(false);
    }
  }, [review, userId]);

  const handleLike = async () => {
    if (!userId) {
      toast.error("Necesitas iniciar sesión para calificar una reseña");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await likeReview(review._id, userId);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setReaction(res.data.likedBy?.includes(userId) ? "like" : false);
    } catch (error) {
      console.error("Error al dar like a la reseña:", error);
      toast.error("No se pudo registrar el like, intenta de nuevo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDislike = async () => {
    if (!userId) {
      toast.error("Necesitas iniciar sesión para calificar una reseña");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await dislikeReview(review._id, userId);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setReaction(res.data.dislikedBy?.includes(userId) ? "dislike" : false);
    } catch (error) {
      console.error("Error al dar dislike a la reseña:", error);
      toast.error("No se pudo registrar el dislike, intenta de nuevo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark p-6">
      <p className="font-semibold text-gray-900 dark:text-white">
        {review.user?.name || "Anonymous User"}
      </p>
      <div className="flex items-start gap-4 pl-3">
        <div className="flex-1">
          <div className="flex items-baseline justify-between ">
            <div className="">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* ⭐ Sección de estrellas */}
            <div className="flex items-center text-primary">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={
                    i < stars
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {review.opinion}
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleLike}
              className="flex items-center gap-1.5 hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">
                <ThumbsUp
                  className={
                    reaction === "like" ? "text-primary fill-primary" : ""
                  }
                />
              </span>
              <span>{likes}</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleDislike}
              className="flex items-center gap-1.5 hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">
                <ThumbsDown
                  className={
                    reaction === "dislike" ? "text-primary fill-primary" : ""
                  }
                />
              </span>
              <span>{dislikes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
