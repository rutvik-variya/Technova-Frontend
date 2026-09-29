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