"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrderByIdService } from "@/services/order.service";
import type { OrderDetail } from "@/types/order";

export const useOrder = (orderId?: string) => {
    return useQuery<OrderDetail>({
        queryKey: ["order", orderId],
        queryFn: () => getOrderByIdService(orderId!),
        enabled: Boolean(orderId),
        staleTime: 30 * 1000,
    });
};