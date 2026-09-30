import { postRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/constants/api";
import type {
    CreateOnlinePaymentRequest,
    CreateOnlinePaymentResponse,
    CreatePaymentPayload,
    CreatedPayment,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
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


export const createOnlinePayment = async (
    data: CreateOnlinePaymentRequest
): Promise<CreateOnlinePaymentResponse> => {
    const response = await postRequest<CreateOnlinePaymentResponse>(
        API_ENDPOINTS.PAYMENT.CREATE_ONLINE,
        data
    );

    return response.data;
};


export const verifyPayment = async (
    paymentId: string,
    data: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> => {
    const response = await postRequest<VerifyPaymentResponse>(
        `${API_ENDPOINTS.PAYMENT.CREATE}/${paymentId}/verify`,
        data
    );

    return response.data;
};