"use client";

import { useQuery } from "@tanstack/react-query";

import { getCheckout } from "@/services/checkout.service";
import { QUERY_KEYS } from "@/constants/query-keys";

import { useCurrentUser } from "../auth/use-current-user";

export const useCheckout = (
    addressId?: string
) => {
    const {
        data: currentUser,
    } = useCurrentUser();

    const user = currentUser?.data;

    return useQuery({
        queryKey: addressId
            ? QUERY_KEYS.CHECKOUT.DETAIL(addressId)
            : ["checkout"],

        queryFn: () =>
            getCheckout({
                addressId: addressId!,
            }),

        enabled: Boolean(
            user && addressId
        ),

        staleTime: 0,
        refetchOnWindowFocus: false,
    });
};