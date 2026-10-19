import type { OrderStatus } from "@/types/admin-order.types";

export const ORDER_STATUS_TRANSITIONS: Record<
    OrderStatus,
    OrderStatus[]
> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
    RETURNED: [],
};