"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { updateCartItem } from "@/services/cart.service";

import { useCartStore } from "@/store/cart.store";

import type { Cart } from "@/types/cart";

import { getApiError } from "@/lib/api-error";

interface UpdateCartVariables {
    itemId: string;
    variantId: string;
    quantity: number;
    isAuthenticated: boolean;
}

interface UpdateCartContext {
    previousCart?: Cart;
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    const updateGuestItem = useCartStore(
        (state) => state.updateItem,
    );

    return useMutation<
        unknown,
        unknown,
        UpdateCartVariables,
        UpdateCartContext
    >({
        mutationFn: async ({
            itemId,
            quantity,
            isAuthenticated,
        }) => {
            if (!isAuthenticated) {
                return null;
            }

            return updateCartItem(itemId, {
                quantity,
            });
        },

        onMutate: ({
            itemId,
            variantId,
            quantity,
            isAuthenticated,
        }) => {

            // guest cart
            if (!isAuthenticated) {
                updateGuestItem(variantId, quantity);

                const guestItems =
                    useCartStore.getState().items;

                const subtotal = guestItems.reduce(
                    (total, item) =>
                        total +
                        Number(item.variant.price) *
                        item.quantity,
                    0,
                );

                const totalItem = guestItems.reduce(
                    (total, item) =>
                        total + item.quantity,
                    0,
                );

                const now =
                    new Date().toISOString();

                const guestCart: Cart = {
                    id: null,
                    userId: null,
                    subtotal: String(subtotal),
                    totalItem,
                    couponId: null,
                    cartItems: guestItems.map(
                        (item, index) => ({
                            id: `guest-${item.variantId}-${index}`,
                            cartId: null,
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: item.quantity,
                            priceAtAdded:
                                item.variant.price,
                            createdAt: now,
                            updatedAt: now,
                            product: item.product,
                            variant: item.variant,
                        }),
                    ),
                };

                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    guestCart,
                );

                return {};
            }

            // auth cart
            const previousCart =
                queryClient.getQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                );

            if (!previousCart) {
                return {};
            }

            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                (oldCart) => {
                    if (!oldCart) {
                        return oldCart;
                    }

                    const currentItem =
                        oldCart.cartItems.find(
                            (item) =>
                                item.id === itemId,
                        );

                    if (!currentItem) {
                        return oldCart;
                    }

                    const quantityDifference =
                        quantity -
                        currentItem.quantity;

                    const subtotalDifference =
                        Number(
                            currentItem.priceAtAdded,
                        ) * quantityDifference;

                    return {
                        ...oldCart,

                        cartItems:
                            oldCart.cartItems.map(
                                (item) =>
                                    item.id === itemId
                                        ? {
                                            ...item,
                                            quantity,
                                        }
                                        : item,
                            ),

                        totalItem:
                            oldCart.totalItem +
                            quantityDifference,

                        subtotal: String(
                            Number(oldCart.subtotal) +
                            subtotalDifference,
                        ),
                    };
                },
            );

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
                return;
            }

            if (context?.previousCart) {
                queryClient.setQueryData<Cart>(
                    QUERY_KEYS.CART.DETAIL,
                    context.previousCart,
                );
            }

            const apiError =
                getApiError(error);

            toast.error(apiError.message);
        },
    });
};