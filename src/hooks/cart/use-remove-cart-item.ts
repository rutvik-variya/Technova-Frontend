"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { removeCartItem } from "@/services/cart.service";

import { useCartStore } from "@/store/cart.store";

import type { Cart } from "@/types/cart";

import { getApiError } from "@/lib/api-error";

interface RemoveCartVariables {
    itemId: string;
    variantId: string;
    isAuthenticated: boolean;
}

interface RemoveCartContext {
    previousCart?: Cart;
}

export const useRemoveCartItem = () => {
    const queryClient =
        useQueryClient();

    const removeGuestItem =
        useCartStore(
            (state) => state.removeItem,
        );

    return useMutation<
        unknown,
        unknown,
        RemoveCartVariables,
        RemoveCartContext
    >({
        mutationFn: async ({
            itemId,
            isAuthenticated,
        }) => {
            if (!isAuthenticated) {
                return null;
            }

            return removeCartItem(itemId);
        },

        onMutate: ({
            itemId,
            variantId,
            isAuthenticated,
        }) => {
            // guest
            if (!isAuthenticated) {
                removeGuestItem(
                    variantId,
                );

                const guestItems =
                    useCartStore.getState().items;

                const subtotal =
                    guestItems.reduce(
                        (total, item) =>
                            total +
                            Number(
                                item.variant.price,
                            ) *
                            item.quantity,
                        0,
                    );

                const totalItem =
                    guestItems.reduce(
                        (total, item) =>
                            total + item.quantity,
                        0,
                    );

                const now =
                    new Date().toISOString();

                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    {
                        id: null,
                        userId: null,
                        subtotal: String(
                            subtotal,
                        ),
                        totalItem,
                        couponId: null,
                        cartItems:
                            guestItems.map(
                                (item, index) => ({
                                    id: `guest-${item.variantId}-${index}`,
                                    cartId: null,
                                    productId:
                                        item.productId,
                                    variantId:
                                        item.variantId,
                                    quantity:
                                        item.quantity,
                                    priceAtAdded:
                                        item.variant.price,
                                    createdAt: now,
                                    updatedAt: now,
                                    product:
                                        item.product,
                                    variant:
                                        item.variant,
                                }),
                            ),
                    },
                );

                return {};
            }

            //authenticated
            const previousCart =
                queryClient.getQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                );

            if (!previousCart) {
                return {};
            }

            const removedItem =
                previousCart.cartItems.find(
                    (item) =>
                        item.id === itemId,
                );

            if (!removedItem) {
                return {};
            }

            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                {
                    ...previousCart,

                    cartItems:
                        previousCart.cartItems.filter(
                            (item) =>
                                item.id !== itemId,
                        ),

                    subtotal: String(
                        Number(
                            previousCart.subtotal,
                        ) -
                        Number(
                            removedItem.priceAtAdded,
                        ) *
                        removedItem.quantity,
                    ),

                    totalItem:
                        previousCart.totalItem -
                        removedItem.quantity,
                },
            );

            return {
                previousCart,
            };
        },

        onSuccess: () => {
            toast.success(
                "Item removed from cart",
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