"use client";

import { Pencil, Trash2 } from "lucide-react";

import ReviewRating from "./review-rating";
import { Review } from "@/types/reviews";

interface ReviewItemProps {
  review: Review;
  currentUserId?: string;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  isDeleting?: boolean;
}

export default function ReviewItem({
  review,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting = false,
}: ReviewItemProps) {
  const isOwner = Boolean(currentUserId) && currentUserId === review.user.id;

  return (
    <article className="rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">{review.user.name}</h3>

          <div className="mt-1">
            <ReviewRating rating={review.rating} />
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(review)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Edit review"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(review.id)}
              disabled={isDeleting}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              aria-label="Delete review"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{review.comment}</p>

      <p className="mt-3 text-xs text-slate-400">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </article>
  );
}
