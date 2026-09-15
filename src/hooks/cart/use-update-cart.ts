"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import {
    updateCartItem,
    type UpdateCartItemPayload,
} from "@/services/cart.service";
import { getApiError } from "@/lib/api-error";

export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            itemId,
            payload,
        }: {
            itemId: string;
            payload: UpdateCartItemPayload;
        }) => updateCartItem(itemId, payload),

        onSuccess: () => {
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