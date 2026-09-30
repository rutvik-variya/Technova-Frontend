export type PaymentMethodType = "ONLINE" | "COD";

export type PaymentStatusType =
    | "PENDING"
    | "PROCESSING"
    | "PAID"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED"

export interface CreatePaymentPayload {
    orderId: string;
    paymentMethod: PaymentMethodType;
}

export interface CreatedPayment {
    id: string;
    orderId: string;
    amount: number | string;
    method: PaymentMethodType;
    status: PaymentStatusType;
    createdAt: string;
}

export interface CreateOnlinePaymentRequest {
    orderId: string;
}

export interface CreateOnlinePaymentResponse {
    paymentId: string;
    orderId: string;
    gatewayOrderId: string;
    amount: number;
    currency: string;
    keyId: string;
}

export interface VerifyPaymentRequest {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
}

export interface VerifyPaymentResponse {
    id: string;
    orderId: string;
    amount: string;
    method: string;
    status: string;
    transactionId: string | null;
    paidAt: string | null;
    createdAt: string;
}
