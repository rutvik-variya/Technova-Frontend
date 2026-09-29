"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderService } from "@/services/order.service";
import type { CreateOrderPayload } from "@/types/order";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOrderPayload) =>
            createOrderService(payload),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["cart"] }),
                queryClient.invalidateQueries({ queryKey: ["checkout"] }),
            ]);
        },
    });
};