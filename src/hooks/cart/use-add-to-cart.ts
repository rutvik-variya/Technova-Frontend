"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { addToCart } from "@/services/cart.service";

import {
    useCartStore,
} from "@/store/cart.store";

import type {
    Cart,
    OptimisticCartItem,
} from "@/types/cart";

import { getApiError } from "@/lib/api-error";

interface AddToCartVariables {
    payload: Parameters<typeof addToCart>[0];
    optimisticItem: OptimisticCartItem;
    isAuthenticated: boolean;
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    const addGuestItem = useCartStore(
        (state) => state.addItem,
    );

    return useMutation({
        mutationFn: async ({
            payload,
            isAuthenticated,
        }: AddToCartVariables) => {
            if (!isAuthenticated) {
                return null;
            }

            return addToCart(payload);
        },

        onMutate: async ({
            payload,
            optimisticItem,
            isAuthenticated,
        }) => {
            if (!isAuthenticated) {
                addGuestItem(optimisticItem);

                const guestCart =
                    useCartStore.getState().items;

                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    {
                        id: null,
                        userId: null,
                        subtotal: String(
                            guestCart.reduce(
                                (total, item) =>
                                    total +
                                    Number(item.variant.price) *
                                    item.quantity,
                                0,
                            ),
                        ),
                        totalItem: guestCart.reduce(
                            (total, item) =>
                                total + item.quantity,
                            0,
                        ),
                        couponId: null,
                        cartItems: guestCart.map(
                            (item, index) => ({
                                id: `guest-${item.variantId}-${index}`,
                                cartId: null,
                                productId: item.productId,
                                variantId: item.variantId,
                                quantity: item.quantity,
                                priceAtAdded:
                                    item.variant.price,
                                createdAt:
                                    new Date().toISOString(),
                                updatedAt:
                                    new Date().toISOString(),
                                product: item.product,
                                variant: item.variant,
                            }),
                        ),
                    },
                );

                return;
            }

            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });

            const previousCart =
                queryClient.getQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
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
                                    payload.variantId,
                            );

                        if (existingItem) {
                            return {
                                ...oldCart,
                                cartItems:
                                    oldCart.cartItems.map(
                                        (item) =>
                                            item.id === existingItem.id
                                                ? {
                                                    ...item,
                                                    quantity:
                                                        item.quantity +
                                                        payload.quantity,
                                                }
                                                : item,
                                    ),
                                totalItem:
                                    oldCart.totalItem +
                                    payload.quantity,
                                subtotal: String(
                                    Number(oldCart.subtotal) +
                                    Number(
                                        optimisticItem.variant.price,
                                    ) *
                                    payload.quantity,
                                ),
                            };
                        }

                        const now = new Date().toISOString();

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
                            createdAt: now,
                            updatedAt: now,
                            product:
                                optimisticItem.product,
                            variant:
                                optimisticItem.variant,
                        };

                        return {
                            ...oldCart,
                            cartItems: [
                                ...oldCart.cartItems,
                                newItem,
                            ],
                            totalItem:
                                oldCart.totalItem +
                                payload.quantity,
                            subtotal: String(
                                Number(oldCart.subtotal) +
                                Number(
                                    optimisticItem.variant.price,
                                ) *
                                payload.quantity,
                            ),
                        };
                    },
                );
            }

            return {
                previousCart,
            };
        },

        onError: (
            error,
            variables,
            context,
        ) => {
            if (!variables.isAuthenticated) {
                // Guest mutation is local only.
                return;
            }

            if (context?.previousCart) {
                queryClient.setQueryData(
                    QUERY_KEYS.CART.DETAIL,
                    context.previousCart,
                );
            }

            const apiError =
                getApiError(error);

            toast.error(apiError.message);
        },

        onSuccess: (
            _response,
            variables,
        ) => {
            if (!variables.isAuthenticated) {
                toast.success("Product added to cart");
                return;
            }

            toast.success("Product added to cart",);
        },
    });
};