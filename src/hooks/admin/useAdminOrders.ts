
"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";



import {
    getAdminOrdersService,
    getAdminOrderByIdService,
    getAdminOrderTimelineService,
    updateAdminOrderStatusService,
} from "@/services/admin-order.service";

import type {
    AdminOrdersParams,
    UpdateOrderStatusPayload,
} from "@/types/admin-order.types";
import { QUERY_KEYS } from "@/constants/query-keys";

// 1. Get All Admin Orders
export const useAdminOrders = (
    params?: AdminOrdersParams
) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_ORDERS.LIST(params),
        queryFn: () => getAdminOrdersService(params),
    });
};

// 2. Get Admin Order Details
export const useAdminOrderDetails = (
    orderId: string
) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_ORDERS.DETAIL(orderId),
        queryFn: () => getAdminOrderByIdService(orderId),
        enabled: Boolean(orderId),
    });
};

// 3. Get Admin Order Timeline
export const useAdminOrderTimeline = (
    orderId: string
) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_ORDERS.TIMELINE(orderId),
        queryFn: () => getAdminOrderTimelineService(orderId),
        enabled: Boolean(orderId),
    });
};

// 4. Update Admin Order Status
export function useUpdateAdminOrderStatus(orderId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateOrderStatusPayload) =>
            updateAdminOrderStatusService(orderId, payload),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_ORDERS.ALL,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_ORDERS.DETAIL(orderId),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_ORDERS.TIMELINE(orderId),
                }),
            ]);
        },
    });
}
