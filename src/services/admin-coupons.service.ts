
import { API_ENDPOINTS } from "@/constants/api";
import { getRequest, postRequest, patchRequest, deleteRequest } from "@/lib/api-request";


import type {
    AdminCoupon,
    AdminCouponListParams,
    AdminCouponsResult,
    CreateAdminCouponPayload,
    UpdateAdminCouponPayload,
} from "@/types/admin-coupon.types";

export const getAdminCouponsService = async (
    params: AdminCouponListParams = {},
): Promise<AdminCouponsResult> => {
    const response = await getRequest<AdminCouponsResult>(
        API_ENDPOINTS.ADMIN.COUPON.ADMIN_LIST,
        { page: params.page ?? 1, limit: params.limit ?? 10 },
    );

    return response.data;
};

export const getAdminCouponByIdService = async (
    couponId: string,
): Promise<AdminCoupon> => {
    const response = await getRequest<AdminCoupon>(
        API_ENDPOINTS.ADMIN.COUPON.ADMIN_DETAIL(couponId),
    );

    return response.data;
};

export const createAdminCouponService = async (
    payload: CreateAdminCouponPayload,
): Promise<AdminCoupon> => {
    const response = await postRequest<AdminCoupon, CreateAdminCouponPayload>(
        API_ENDPOINTS.ADMIN.COUPON.CREATE,
        payload,
    );

    return response.data;
};

export const updateAdminCouponService = async (
    couponId: string,
    payload: UpdateAdminCouponPayload,
): Promise<AdminCoupon> => {
    const response = await patchRequest<AdminCoupon, UpdateAdminCouponPayload>(
        API_ENDPOINTS.ADMIN.COUPON.UPDATE(couponId),
        payload,
    );

    return response.data;
};

export const deactivateAdminCouponService = async (
    couponId: string,
): Promise<void> => {
    await deleteRequest(API_ENDPOINTS.ADMIN.COUPON.DELETE(couponId));
};
