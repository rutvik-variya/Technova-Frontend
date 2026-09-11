"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReviewRating from "./review-rating";
import { Review } from "@/types/reviews";
import { ReviewFormValues, reviewSchema } from "@/validations/review.schema";
import { AlertCircle, Edit3, Send, X } from "lucide-react";

interface ReviewFormProps {
  editingReview: Review | null;
  isSubmitting: boolean;
  onSubmit: (values: ReviewFormValues) => Promise<void>;
  onCancelEdit: () => void;
}

export default function ReviewForm({
  editingReview,
  isSubmitting,
  onSubmit,
  onCancelEdit,
}: ReviewFormProps) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  useEffect(() => {
    if (editingReview) {
      form.reset({
        rating: editingReview.rating,
        comment: editingReview.comment,
      });
      return;
    }

    form.reset({
      rating: 0,
      comment: "",
    });
  }, [editingReview, form]);

  const rating = useWatch({
    control: form.control,
    name: "rating",
  });

  const handleFormSubmit = async (values: ReviewFormValues) => {
    await onSubmit(values);
    form.reset({
      rating: 0,
      comment: "",
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Edit3 className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {editingReview ? "Edit Your Review" : "Write a Review"}
          </h3>
        </div>

        {editingReview && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mt-6 space-y-6"
      >
        {/* Rating Select */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Rating
          </label>
          <div className="mt-2.5">
            <ReviewRating
              rating={rating}
              interactive
              onChange={(value) =>
                form.setValue("rating", value, {
                  shouldValidate: true,
                })
              }
            />
          </div>
          {form.formState.errors.rating && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {form.formState.errors.rating.message}
            </p>
          )}
        </div>

        {/* Comment Input */}
        <div>
          <label
            htmlFor="review-comment"
            className="text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Your Feedback
          </label>
          <textarea
            id="review-comment"
            rows={4}
            placeholder="What did you like or dislike? How was the performance?"
            {...form.register("comment")}
            className="mt-2.5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
          />
          {form.formState.errors.comment && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {form.formState.errors.comment.message}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <Send className="h-4 w-4" />
            {isSubmitting
              ? "Submitting..."
              : editingReview
                ? "Update Review"
                : "Submit Review"}
          </button>

          {editingReview && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
