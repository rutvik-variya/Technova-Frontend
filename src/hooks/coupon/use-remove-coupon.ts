"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCoupon } from "@/services/coupon.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useRemoveCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoupon,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL,
            });
        },
    });
};