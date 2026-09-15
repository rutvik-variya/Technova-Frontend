"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { clearCart } from "@/services/cart.service";
import { getApiError } from "@/lib/api-error";

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,

        onSuccess: (response) => {
            toast.success(response.message || "Cart cleared successfully");

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