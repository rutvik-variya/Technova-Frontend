"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    addWishlist,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";

import type {
    AddWishlistPayload,
} from "@/types/wishlist";
import { getApiError } from "@/lib/api-error";
import { toast } from "sonner";

export const useAddWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: AddWishlistPayload
        ) => addWishlist(payload),

        onSuccess: (response) => {
            toast.success(response.message || "Product added to wishlist!");
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