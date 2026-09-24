"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyCoupon } from "@/services/coupon.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";
import { toast } from "sonner";

export const useApplyCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: applyCoupon,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });
        },
        onError: (error: unknown) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        },

    });
};