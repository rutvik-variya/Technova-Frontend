"use client";

import { useState } from "react";
import ReviewForm from "./review-form";
import ReviewList from "./review-list";
import ReviewPagination from "./review-pagination";
import { Review } from "@/types/reviews";
import { useProductReviews } from "@/hooks/reviews/use-product-reviews";
import { useCreateReview } from "@/hooks/reviews/use-create-review";
import { useUpdateReview } from "@/hooks/reviews/use-update-review";
import { useDeleteReview } from "@/hooks/reviews/use-delete-review";
import { ReviewFormValues } from "@/validations/review.schema";
import { MessageSquare, AlertCircle } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
  currentUserId?: string;
}

export default function ProductReviews({
  productId,
  currentUserId,
}: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const limit = 10;

  const { data, isLoading, isError } = useProductReviews(
    productId,
    page,
    limit
  );

  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();

  const handleSubmit = async (values: ReviewFormValues) => {
    if (editingReview) {
      await updateReviewMutation.mutateAsync({
        reviewId: editingReview.id,
        productId,
        payload: values,
      });
      setEditingReview(null);
      return;
    }

    await createReviewMutation.mutateAsync({
      productId,
      payload: values,
    });
    setPage(1);
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  const handleDelete = (reviewId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    deleteReviewMutation.mutate({
      reviewId,
      productId,
    });
  };

  if (isLoading) {
    return (
      <section className="mt-16 border-t border-slate-200 pt-12">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-4 h-4 w-full rounded bg-slate-200" />
              <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-16 border-t border-slate-200 pt-12">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-semibold text-rose-900">
            Failed to load product reviews.
          </p>
        </div>
      </section>
    );
  }

  const totalReviews = data?.data.pagination.total ?? 0;

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Review List & Header */}
        <div className="lg:col-span-7">
          <div className="mb-8 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Customer Reviews
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Based on {totalReviews} verified {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          <ReviewList
            reviews={data?.data.reviews ?? []}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deleteReviewMutation.isPending}
          />

          {data?.data.pagination && (
            <ReviewPagination
              pagination={data.data.pagination}
              onPageChange={setPage}
            />
          )}
        </div>

        {/* Right Column: Review Submission Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            {currentUserId ? (
              <ReviewForm
                editingReview={editingReview}
                isSubmitting={
                  createReviewMutation.isPending || updateReviewMutation.isPending
                }
                onSubmit={handleSubmit}
                onCancelEdit={handleCancelEdit}
              />
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Write a Review
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Have you purchased or used this product? Share your experience with other shoppers.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-xs font-semibold text-slate-500">
                  Please log in to your account to post a review.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}