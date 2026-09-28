export type ShippingMethodType = "STANDARD" | "EXPRESS";

export interface ShippingMethod {
    id: string;
    method: ShippingMethodType;
    name: string;
    charge: number;
    estimatedDays: number;
}