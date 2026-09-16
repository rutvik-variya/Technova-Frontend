"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { updateCartItem, } from "@/services/cart.service";

import type { Cart, UpdateCartItemPayload } from "@/types/cart";
import { getApiError } from "@/lib/api-error";

interface UpdateCartVariables {
    itemId: string;
    payload: UpdateCartItemPayload;
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            itemId,
            payload,
        }: UpdateCartVariables) =>
            updateCartItem(itemId, payload),

        onSuccess: (response) => {
            queryClient.setQueryData<Cart>(
                QUERY_KEYS.CART.DETAIL,
                (oldCart) => {
                    if (!oldCart) {
                        return oldCart;
                    }

                    const updatedItems = oldCart.cartItems.map(
                        (item) => {
                            if (item.id !== response.itemId) {
                                return item;
                            }

                            return {
                                ...item,
                                quantity: response.quantity,
                            };
                        }
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
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};