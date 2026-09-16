"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { clearCart } from "@/services/cart.service";

import type { Cart } from "@/types/cart";
import { getApiError } from "@/lib/api-error";

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,

        onSuccess: (response) => {
            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                (oldCart) => {
                    if (!oldCart) {
                        return oldCart;
                    }

                    return {
                        ...oldCart,
                        subtotal: String(response.subtotal),
                        totalItem: response.totalItem,
                        cartItems: [],
                    };
                }
            );

            toast.success("Cart cleared successfully");
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};