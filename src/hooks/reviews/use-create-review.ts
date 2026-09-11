"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


import { QUERY_KEYS } from "@/constants/query-keys";
import { CreateReviewPayload } from "@/types/reviews";
import { createReviews } from "@/services/reviews.service";
import { getApiError } from "@/lib/api-error";

interface CreateReviewVariables {
    productId: string;
    payload: CreateReviewPayload;
}

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            payload,
        }: CreateReviewVariables) =>
            createReviews(productId, payload),

        onSuccess: (response, variables) => {
            toast.success(
                (response as { message?: string })?.message ||
                "Review added successfully"
            );

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