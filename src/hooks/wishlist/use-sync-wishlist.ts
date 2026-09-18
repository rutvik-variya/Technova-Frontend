"use client";

import {
    useMutation,
} from "@tanstack/react-query";

import {
    syncWishlist,
} from "@/services/wishlist.service";

export const useSyncWishlist = () => {
    return useMutation({
        mutationFn: (productIds: string[]) =>
            syncWishlist(productIds),
    });
};