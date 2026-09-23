import { postRequest } from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    CheckoutPayload,
    CheckoutResponse,
} from "@/types/checkout";

export const getCheckout = async (
    payload: CheckoutPayload
): Promise<CheckoutResponse> => {
    const response = await postRequest<
        CheckoutResponse,
        CheckoutPayload
    >(
        API_ENDPOINTS.CHECKOUT.CREATE,
        payload
    );

    return response.data;
};