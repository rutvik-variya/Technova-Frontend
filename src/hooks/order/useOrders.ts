"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrdersService } from "@/services/order.service";
import type { OrdersResponse } from "@/types/order";

interface UseOrdersParams {
    page?: number;
    limit?: number;
}

export const useOrders = ({
    page = 1,
    limit = 10,
}: UseOrdersParams = {}) => {
    return useQuery<OrdersResponse>({
        queryKey: ["orders", page, limit],
        queryFn: () => getOrdersService(page, limit),
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
    });
};