import {
    getRequest,
    patchRequest,
    postRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    CancelOrderResponse,
    CreateOrderPayload,
    CreatedOrder,
    OrderDetail,
    OrdersResponse,
} from "@/types/order";


// Create Order
export const createOrderService = async (
    payload: CreateOrderPayload
): Promise<CreatedOrder> => {
    const response = await postRequest<CreatedOrder, CreateOrderPayload>(
        API_ENDPOINTS.ORDER.CREATE,
        payload
    );

    return response.data;
};


// Get Orders
export const getOrdersService = async (
    page = 1,
    limit = 10
): Promise<OrdersResponse> => {
    const response = await getRequest<OrdersResponse>(
        API_ENDPOINTS.ORDER.LIST,
        {
            page,
            limit,
        }
    );

    return response.data;
};


// Get Order Details
export const getOrderByIdService = async (
    orderId: string
): Promise<OrderDetail> => {
    const response = await getRequest<OrderDetail>(
        API_ENDPOINTS.ORDER.DETAIL(orderId)
    );

    return response.data;
};


// Cancel Order
export const cancelOrderService = async (
    orderId: string
): Promise<CancelOrderResponse> => {
    const response = await patchRequest<CancelOrderResponse>(
        API_ENDPOINTS.ORDER.CANCEL(orderId)
    );

    return response.data;
};