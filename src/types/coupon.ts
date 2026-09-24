export type CouponType = "PERCENTAGE" | "FIXED";

export interface ApplyCouponRequest {
    code: string;
}

export interface AppliedCoupon {
    id: string;
    code: string;
    type: CouponType;
}

export interface ApplyCouponResponse {
    coupon: AppliedCoupon;
    subtotal: number;
    discount: number;
    total: number;
}