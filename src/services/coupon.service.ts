import { API_ENDPOINTS } from "@/constants/api";
import { deleteRequest, postRequest } from "@/lib/api-request";
import { ApplyCouponRequest, ApplyCouponResponse } from "@/types/coupon";


export const applyCoupon = async (
    data: ApplyCouponRequest
) => {
    return postRequest<
        ApplyCouponResponse,
        ApplyCouponRequest
    >(
        API_ENDPOINTS.COUPON.APPLY,
        data
    );
};

export const removeCoupon = async () => {
    return deleteRequest(
        API_ENDPOINTS.COUPON.REMOVE
    );
};