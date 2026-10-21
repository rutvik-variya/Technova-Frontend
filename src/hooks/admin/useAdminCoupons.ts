
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";


import type {
    AdminCouponListParams,
    UpdateAdminCouponPayload,
} from "@/types/admin-coupon.types";
import { createAdminCouponService, deactivateAdminCouponService, getAdminCouponByIdService, getAdminCouponsService, updateAdminCouponService } from "@/services/admin-coupons.service";

export const useAdminCoupons = (params: AdminCouponListParams = {}) =>
    useQuery({
        queryKey: QUERY_KEYS.ADMIN_COUPONS.LIST(params),
        queryFn: () => getAdminCouponsService(params),
    });

export const useAdminCouponById = (couponId: string) =>
    useQuery({
        queryKey: QUERY_KEYS.ADMIN_COUPONS.DETAIL(couponId),
        queryFn: () => getAdminCouponByIdService(couponId),
        enabled: Boolean(couponId),
    });

export const useCreateAdminCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAdminCouponService,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADMIN_COUPONS.ALL,
            }),
    });
};

export const useUpdateAdminCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            couponId,
            payload,
        }: {
            couponId: string;
            payload: UpdateAdminCouponPayload;
        }) => updateAdminCouponService(couponId, payload),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_COUPONS.ALL,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_COUPONS.DETAIL(variables.couponId),
                }),
            ]);
        },
    });
};

export const useDeactivateAdminCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateAdminCouponService,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADMIN_COUPONS.ALL,
            }),
    });
};
