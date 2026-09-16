"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import {
    addToCart,
} from "@/services/cart.service";

import type {
    Cart,
    OptimisticCartItem,
} from "@/types/cart";
import { getApiError } from "@/lib/api-error";

interface AddToCartVariables {
    payload: Parameters<typeof addToCart>[0];
    optimisticItem?: OptimisticCartItem;
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            payload,
        }: AddToCartVariables) => {
            return addToCart(payload);
        },

        onMutate: async ({
            payload,
            optimisticItem,
        }) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });

            const previousCart =
                queryClient.getQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL
                );

            if (optimisticItem) {
                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    (oldCart) => {
                        if (!oldCart) {
                            return oldCart;
                        }

                        const existingItem =
                            oldCart.cartItems.find(
                                (item) =>
                                    item.productId ===
                                    payload.productId &&
                                    item.variantId ===
                                    payload.variantId
                            );

                        if (existingItem) {
                            const updatedItems =
                                oldCart.cartItems.map(
                                    (item) => {
                                        if (
                                            item.id !==
                                            existingItem.id
                                        ) {
                                            return item;
                                        }

                                        return {
                                            ...item,
                                            quantity:
                                                item.quantity +
                                                payload.quantity,
                                        };
                                    }
                                );

                            const subtotal =
                                updatedItems.reduce(
                                    (total, item) =>
                                        total +
                                        Number(item.priceAtAdded) *
                                        item.quantity,
                                    0
                                );

                            const totalItem =
                                updatedItems.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                );

                            return {
                                ...oldCart,
                                cartItems: updatedItems,
                                subtotal: String(subtotal),
                                totalItem,
                            };
                        }

                        const newItem = {
                            id: `optimistic-${Date.now()}`,
                            cartId: oldCart.id,
                            productId:
                                optimisticItem.productId,
                            variantId:
                                optimisticItem.variantId,
                            quantity:
                                optimisticItem.quantity,
                            priceAtAdded:
                                optimisticItem.variant.price,
                            createdAt:
                                new Date().toISOString(),
                            updatedAt:
                                new Date().toISOString(),
                            product:
                                optimisticItem.product,
                            variant:
                                optimisticItem.variant,
                        };

                        const updatedItems = [
                            ...oldCart.cartItems,
                            newItem,
                        ];

                        const subtotal =
                            updatedItems.reduce(
                                (total, item) =>
                                    total +
                                    Number(item.priceAtAdded) *
                                    item.quantity,
                                0
                            );

                        const totalItem =
                            updatedItems.reduce(
                                (total, item) =>
                                    total + item.quantity,
                                0
                            );

                        return {
                            ...oldCart,
                            cartItems: updatedItems,
                            subtotal: String(subtotal),
                            totalItem,
                        };
                    }
                );
            }

            return {
                previousCart,
            };
        },

        onError: (
            error: unknown,
            _variables,
            context
        ) => {
            if (context?.previousCart) {
                queryClient.setQueryData(
                    QUERY_KEYS.CART.DETAIL,
                    context.previousCart
                );
            }

            const apiError = getApiError(error);
            toast.error(apiError.message)
        },

        onSuccess: () => {
            toast.success("Product added to cart");
        },
    });
};