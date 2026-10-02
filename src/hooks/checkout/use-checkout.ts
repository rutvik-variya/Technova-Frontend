"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { getCheckout } from "@/services/checkout.service";
import type { CheckoutResponse } from "@/types/checkout";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useCheckout = (
    addressId?: string,
    enabled = true,
) => {
    const { data: currentUser } = useCurrentUser();

    const user = currentUser?.data;

    return useQuery<CheckoutResponse>({
        queryKey: addressId
            ? QUERY_KEYS.CHECKOUT.DETAIL(addressId)
            : ["checkout"],

        queryFn: () => getCheckout({ addressId: addressId! }),

        enabled: Boolean(user && addressId && enabled),

        staleTime: 0,

        refetchOnWindowFocus: false,
    });
};