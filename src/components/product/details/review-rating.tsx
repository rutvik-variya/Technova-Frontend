"use client";

import { Star } from "lucide-react";

interface ReviewRatingProps {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function ReviewRating({
  rating,
  interactive = false,
  onChange,
}: ReviewRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating;

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange?.(star)}
              className="p-0.5"
              aria-label={`${star} star`}
            >
              <Star
                className={`h-5 w-5 transition ${
                  active ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            className={`h-4 w-4 ${
              active ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
            }`}
          />
        );
      })}
    </div>
  );
}
