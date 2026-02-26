import { Star } from "lucide-react";

type Props = {
  value: number;
  onChange: (rating: number) => void;
};

export function ProductStars({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange(star)}
          className={`w-6 h-6 transition-colors ${
            star <= value
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}