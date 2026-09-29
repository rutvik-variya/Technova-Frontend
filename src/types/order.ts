export type OrderPaymentMethod = "ONLINE" | "COD";

export type OrderShippingMethod = "STANDARD" | "EXPRESS";

export interface CreateOrderPayload {
    addressId: string;
    paymentMethod: OrderPaymentMethod;
    shippingMethod: OrderShippingMethod;
}

export interface CreatedOrder {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: OrderPaymentMethod;
    shippingMethod: OrderShippingMethod;
    shippingStatus: string;
    subtotal: number;
    discount: number;
    shippingCharge: number;
    tax: number;
    grandTotal: number;
    couponId: string | null;
    couponCode: string | null;
    createdAt: string;
}