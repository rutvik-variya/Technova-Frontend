"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { cancelOrderService } from "@/services/order.service";

import type { CancelOrderResponse } from "@/types/order";

interface CancelOrderVariables {
    orderId: string;
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CancelOrderResponse,
        Error,
        CancelOrderVariables
    >({
        mutationFn: ({ orderId }) =>
            cancelOrderService(orderId),

        onSuccess: async (data) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["orders"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["order", data.id],
                }),
            ]);
        },
    });
};