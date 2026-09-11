"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteReview } from "@/services/reviews.service";
import { getApiError } from "@/lib/api-error";

interface DeleteReviewVariables {
    reviewId: string;
    productId: string;
}

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            reviewId,
        }: DeleteReviewVariables) =>
            deleteReview(reviewId),

        onSuccess: (response, variables) => {
            toast.success(response.message || "Review deleted successfully");

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REVIEWS.PRODUCT(
                    variables.productId
                ),
            });
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};