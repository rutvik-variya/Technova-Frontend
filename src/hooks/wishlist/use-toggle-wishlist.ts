"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    addToWishlist,
    type AddToWishlistPayload,
} from "@/services/wishlist.service";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";

export const useToggleWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddToWishlistPayload) =>
            addToWishlist(payload),

        onSuccess: (response) => {
            toast.success(response.message || "Product added to wishlist");

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WISHLIST.ALL,
            });
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};