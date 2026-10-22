"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminShippingMethods, updateAdminShippingMethod } from "@/services/admin-shipping.service";
import { ShippingMethodType } from "@/types/shipping";
import { AdminShippingUpdatePayload } from "@/types/admin-shipping";

export const useAdminShippingMethods = () => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_SHIPPING.LIST,
        queryFn: getAdminShippingMethods,
    });
};


export const useUpdateAdminShippingMethod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            method,
            payload,
        }: {
            method: ShippingMethodType,
            payload: AdminShippingUpdatePayload
        }) =>
            updateAdminShippingMethod(method, payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADMIN_SHIPPING.ALL,
            });
        },
    });
};
