import {
    getRequest,
    patchRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    AdminOrderDetails,
    AdminOrderStatusUpdateResponse,
    AdminOrderTimelineItem,
    AdminOrdersParams,
    AdminOrdersResult,
    UpdateOrderStatusPayload,
} from "@/types/admin-order.types";

// Get All Admin Orders
export const getAdminOrdersService = async (
    params?: AdminOrdersParams
): Promise<AdminOrdersResult> => {
    const response = await getRequest<AdminOrdersResult>(
        API_ENDPOINTS.ADMIN.ORDERS.LIST,
        params ? { ...params } : undefined
    );

    return response.data;
};

// Get Admin Order Details
export const getAdminOrderByIdService = async (
    orderId: string
): Promise<AdminOrderDetails> => {
    const response = await getRequest<AdminOrderDetails>(
        API_ENDPOINTS.ADMIN.ORDERS.DETAIL(orderId)
    );

    return response.data;
};

// Update Admin Order Status
export const updateAdminOrderStatusService = async (
    orderId: string,
    payload: UpdateOrderStatusPayload,
) => {
    const response = await patchRequest<
        AdminOrderStatusUpdateResponse,
        UpdateOrderStatusPayload
    >(
        API_ENDPOINTS.ADMIN.ORDERS.UPDATE_STATUS(orderId),
        payload,
    );

    return response.data;
};

// Get Admin Order Timeline
export const getAdminOrderTimelineService = async (
    orderId: string
): Promise<AdminOrderTimelineItem[]> => {
    const response = await getRequest<AdminOrderTimelineItem[]>(
        API_ENDPOINTS.ADMIN.ORDERS.TIMELINE(orderId)
    );

    return response.data;
};