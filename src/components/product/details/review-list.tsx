"use client";

import { Review } from "@/types/reviews";
import ReviewItem from "./review-item";
import { MessageSquareDashed } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
  currentUserId?: string;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  isDeleting?: boolean;
}

export default function ReviewList({
  reviews,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 shadow-sm">
          <MessageSquareDashed className="h-6 w-6" />
        </div>
        <h4 className="mt-4 text-base font-bold text-slate-900">No reviews yet</h4>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Be the first to share your thoughts and feedback about this item.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}