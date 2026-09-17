"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    clearWishlist,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";

export const useClearWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearWishlist,

        onSuccess: () => {
            queryClient.setQueryData(
                QUERY_KEYS.WISHLIST.ALL,
                []
            );
        },
    });
};