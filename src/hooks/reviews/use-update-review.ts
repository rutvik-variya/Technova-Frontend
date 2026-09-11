"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



import { QUERY_KEYS } from "@/constants/query-keys";
import { UpdateReviewPayload } from "@/types/reviews";
import { updateReview } from "@/services/reviews.service";
import { getApiError } from "@/lib/api-error";

interface UpdateReviewVariables {
    reviewId: string;
    productId: string;
    payload: UpdateReviewPayload;
}

export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            reviewId,
            payload,
        }: UpdateReviewVariables) =>
            updateReview(reviewId, payload),

        onSuccess: (response, variables) => {
            toast.success(response.message || "Review updated successfully");

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