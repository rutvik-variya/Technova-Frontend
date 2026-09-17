"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    moveWishlistToCart,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";

export const useMoveWishlistToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            moveWishlistToCart(productId),

        onSuccess: (_, productId) => {
            queryClient.setQueryData<unknown[]>(
                QUERY_KEYS.WISHLIST.ALL,
                (oldWishlist) => {
                    if (!oldWishlist) {
                        return [];
                    }

                    return oldWishlist.filter((item: unknown) => {
                        if (typeof item !== "object" || item === null) {
                            return true;
                        }

                        const product = (item as { product?: { id?: string } }).product;
                        return product?.id !== productId;
                    });
                }
            );

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });
        },
    });
};