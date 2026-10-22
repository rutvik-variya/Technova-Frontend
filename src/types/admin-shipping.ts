
export type ShippingMethodType = "STANDARD" | "EXPRESS";

export interface AdminShippingMethod {
    id: string;
    method: ShippingMethodType;
    name: string;
    baseCharge: number;
    freeShippingAbove: number;
    estimatedDays: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AdminShippingUpdatePayload {
    name?: string;
    baseCharge?: number;
    freeShippingAbove?: number;
    estimatedDays?: number;
    isActive?: boolean;
}
