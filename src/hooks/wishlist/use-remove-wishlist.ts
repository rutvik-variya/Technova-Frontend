"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    removeWishlist,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";
import { toast } from "sonner";
import { getApiError } from "@/lib/api-error";

export const useRemoveWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            removeWishlist(productId),

        onSuccess: (response) => {
            toast.success(response.message || "Product remove from wishlist!");
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