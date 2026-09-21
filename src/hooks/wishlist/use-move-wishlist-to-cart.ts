"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
    moveWishlistToCart,
} from "@/services/wishlist.service";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";

export const useMoveWishlistToCart = () => {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            moveWishlistToCart(productId),

        onSuccess: (response, productId) => {
            queryClient.setQueryData(
                QUERY_KEYS.WISHLIST.ALL,
                (oldData: unknown) => {
                    type WishlistItem = {
                        product?: {
                            id?: string;
                        };
                    };

                    if (!Array.isArray(oldData)) {
                        return [];
                    }

                    return (oldData as WishlistItem[]).filter(
                        (item) => item.product?.id !== productId
                    );
                }
            );

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });

            toast.success(response.message ||
                "Wishlist item moved to cart"
            );
        },
        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};