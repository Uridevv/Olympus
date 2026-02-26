import { Review } from "@/Types/review";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ReviewTarget({ review }: { review: Review }) {
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<"like" | "dislike" | false>(false);
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    setLikes(review.likes || 0);
    setDislikes(review.dislikes || 0);
    setStars(review.rating || 5);
  }, [review]);

  const handleLike = () => {
    if (isLiked === "like") {
      setLikes(likes - 1);
      setIsLiked(false);
    }
    if (isLiked === "dislike") {
      setDislikes(dislikes - 1);
      setLikes(likes + 1);
      setIsLiked("like");
    }
    if (isLiked === false) {
      setLikes(likes + 1);
      setIsLiked("like");
    }
  };

  const handleDislike = () => {
    if (isLiked === "dislike") {
      setDislikes(dislikes - 1);
      setIsLiked(false);
    }
    if (isLiked === "like") {
      setLikes(likes - 1);
      setDislikes(dislikes + 1);
      setIsLiked("dislike");
    }
    if (isLiked === false) {
      setDislikes(likes + 1);
      setIsLiked("dislike");
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
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">
                <ThumbsUp
                  onClick={handleLike}
                  className={isLiked === "like" ? "text-neutral-50" : ""}
                />
              </span>
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">
                <ThumbsDown
                  onClick={handleDislike}
                  className={isLiked === "dislike" ? "text-neutral-50" : ""}
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
