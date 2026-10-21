
export type AdminCouponType = "PERCENTAGE" | "FIXED";
export type AdminCouponStatus = "ACTIVE" | "INACTIVE";

export interface AdminCoupon {
    id: string;
    code: string;
    description?: string | null;
    type: AdminCouponType;
    value: string | number;
    minOrderAmount: string | number;
    maxOrderAmount?: string | number | null;
    usageLimit?: number | null;
    usedCount: number;
    startDate: string;
    endDate: string;
    status: AdminCouponStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AdminCouponPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface AdminCouponListParams {
    page?: number;
    limit?: number;
}

export interface AdminCouponsResult {
    coupons: AdminCoupon[];
    pagination: AdminCouponPagination;
}

export interface CreateAdminCouponPayload {
    code: string;
    description?: string;
    type: AdminCouponType;
    value: number;
    minOrderAmount: number;
    maxOrderAmount?: number;
    usageLimit?: number;
    startDate: string;
    endDate: string;
    status?: AdminCouponStatus;
}

export type UpdateAdminCouponPayload = Partial<CreateAdminCouponPayload>;
