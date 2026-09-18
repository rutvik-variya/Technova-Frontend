"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
    removeWishlist,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";

import type {
    WishlistItem,
} from "@/types/wishlist";

export const useRemoveWishlist = () => {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            removeWishlist(productId),

        onSuccess: (_, productId) => {
            queryClient.setQueryData<WishlistItem[]>(
                QUERY_KEYS.WISHLIST.ALL,
                (oldWishlist = []) =>
                    oldWishlist.filter(
                        (item) =>
                            item.product.id !== productId
                    )
            );

            toast.success(
                "Removed from wishlist"
            );
        },
    });
};