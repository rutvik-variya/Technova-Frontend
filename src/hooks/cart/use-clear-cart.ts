"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { clearCart } from "@/services/cart.service";

import { useCartStore } from "@/store/cart.store";

import type { Cart } from "@/types/cart";

import { getApiError } from "@/lib/api-error";

interface ClearCartVariables {
    isAuthenticated: boolean;
}

export const useClearCart = () => {
    const queryClient =
        useQueryClient();

    const clearGuestCart =
        useCartStore(
            (state) => state.clearCart,
        );

    return useMutation({
        mutationFn: async ({
            isAuthenticated,
        }: ClearCartVariables) => {
            if (!isAuthenticated) {
                return null;
            }

            return clearCart();
        },

        onMutate: ({
            isAuthenticated,
        }) => {
            const previousCart =
                queryClient.getQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                );

            if (!isAuthenticated) {
                clearGuestCart();

                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    {
                        id: null,
                        userId: null,
                        subtotal: "0",
                        totalItem: 0,
                        couponId: null,
                        cartItems: [],
                    },
                );

                return {
                    previousCart,
                };
            }

            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                (oldCart) => {
                    if (!oldCart) {
                        return oldCart;
                    }

                    return {
                        ...oldCart,
                        subtotal: "0",
                        totalItem: 0,
                        cartItems: [],
                    };
                },
            );

            return {
                previousCart,
            };
        },

        onSuccess: () => {
            toast.success(
                "Cart cleared successfully",
            );
        },

        onError: (
            error,
            variables,
            context,
        ) => {

            if (
                variables.isAuthenticated &&
                context?.previousCart
            ) {
                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    context.previousCart,
                );
            }

            const apiError =
                getApiError(error);

            toast.error(
                apiError.message,
            );
        },
    });
};