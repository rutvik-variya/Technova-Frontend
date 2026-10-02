import { postRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/constants/api";
import type {
    CreateOrderPayload,
    CreatedOrder,
} from "@/types/order";



export const createOrderService = async (
    payload: CreateOrderPayload
): Promise<CreatedOrder> => {
    const response = await postRequest<CreatedOrder, CreateOrderPayload>(
        API_ENDPOINTS.ORDER.CREATE,
        payload
    );

    return response.data;
};

