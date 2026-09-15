"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { removeCartItem } from "@/services/cart.service";
import { getApiError } from "@/lib/api-error";

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) =>
            removeCartItem(itemId),

        onSuccess: () => {
            toast.success("Item removed from cart");

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });
        },

        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },
    });
};