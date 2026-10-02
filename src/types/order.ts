export type OrderPaymentMethod = "ONLINE" | "COD";

export type OrderShippingMethod = "STANDARD" | "EXPRESS";

export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";


export type PaymentStatus =
    | "PENDING"
    | "PROCESSING"
    | "PAID"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";

export interface OrderListItem {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: OrderPaymentMethod;
    subtotal: number;
    discount: number;
    shippingCharge: number;
    tax: number;
    grandTotal: number;
    itemCount: number;
    createdAt: string;
}

export interface OrderPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface OrdersResponse {
    data: OrderListItem[];
    meta: OrderPagination;
}

export interface OrderAddress {
    fullName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string | null;
    landmark: string | null;
}

export interface OrderItem {
    id: string;
    productId: string;
    variantId: string;
    productName: string;
    productSlug: string;
    brand: string;
    image: string | null;
    sku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: string;
}

export interface OrderDetail {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: OrderPaymentMethod;
    subtotal: number;
    discount: number;
    shippingCharge: number;
    tax: number;
    grandTotal: number;
    address: OrderAddress;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface CancelOrderResponse {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    grandTotal: string;
    updatedAt: string;
}


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


