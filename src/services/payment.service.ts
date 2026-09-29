import { postRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/constants/api";
import type {
    CreatePaymentPayload,
    CreatedPayment,
} from "@/types/payment";

export const createPaymentService = async (
    payload: CreatePaymentPayload
): Promise<CreatedPayment> => {
    const response = await postRequest<
        CreatedPayment,
        CreatePaymentPayload
    >(API_ENDPOINTS.PAYMENT.CREATE, payload);

    return response.data;
};