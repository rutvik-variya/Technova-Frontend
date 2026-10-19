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
    | "PAID"
    | "FAILED"
    | "REFUNDED";

export type PaymentMethod = "COD" | "ONLINE";

export interface AdminOrderUser {
    id: string;
    name: string;
    email: string;
}

export interface AdminOrder {
    id: string;
    orderNumber: string;
    user: AdminOrderUser;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    subtotal: string | number;
    discount: string | number;
    shippingCharge: string | number;
    tax: string | number;
    grandTotal: string | number;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminOrdersMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface AdminOrdersResult {
    data: AdminOrder[];
    meta: AdminOrdersMeta;
}

export interface AdminOrderAddress {
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

export interface AdminOrderItem {
    id: string;
    productId: string;
    variantId: string | null;
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

export interface AdminOrderDetails {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    shippingCharge: number;
    tax: number;
    grandTotal: number;
    address: AdminOrderAddress;
    items: AdminOrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface AdminOrderTimelineItem {
    id: string;
    fromStatus: OrderStatus | null;
    toStatus: OrderStatus;
    note: string | null;
    changedBy: {
        id: string;
        name: string;
    } | null;
    createdAt: string;
}

export interface UpdateOrderStatusPayload {
    status: OrderStatus;
    note?: string;
}

export interface AdminOrdersParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    userId?: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    startDate?: string;
    endDate?: string;
}



export interface UpdateAdminOrderStatusResponse {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    grandTotal: string | number;
    updatedAt: string;
}

export interface AdminOrderStatusUpdateResponse {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    grandTotal: string | number;
    updatedAt: string;
}