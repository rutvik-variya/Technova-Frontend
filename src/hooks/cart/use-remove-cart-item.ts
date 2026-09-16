"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { removeCartItem } from "@/services/cart.service";

import type { Cart } from "@/types/cart";
import { getApiError } from "@/lib/api-error";

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) =>
            removeCartItem(itemId),

        onSuccess: (response) => {
            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                (oldCart) => {
                    if (!oldCart) {
                        return oldCart;
                    }

                    const removedItem = oldCart.cartItems.find(
                        (item) => item.id === response.itemId
                    );

                    if (!removedItem) {
                        return oldCart;
                    }

                    const updatedItems =
                        oldCart.cartItems.filter(
                            (item) => item.id !== response.itemId
                        );

                    const subtotal = updatedItems.reduce(
                        (total, item) => {
                            return (
                                total +
                                Number(item.priceAtAdded) *
                                item.quantity
                            );
                        },
                        0
                    );

                    const totalItem = updatedItems.reduce(
                        (total, item) => {
                            return total + item.quantity;
                        },
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

            toast.success("Item removed from cart");
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};