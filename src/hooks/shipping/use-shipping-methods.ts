"use client";

import { useQuery } from "@tanstack/react-query";

import { getShippingMethods } from "@/services/shipping.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useShippingMethods = (
    subtotal?: number,
    enabled = true
) => {
    return useQuery({
        queryKey:
            typeof subtotal === "number"
                ? QUERY_KEYS.SHIPPING.METHODS(subtotal)
                : ["shipping", "methods"],

        queryFn: () => getShippingMethods(subtotal!),

        enabled:
            enabled &&
            typeof subtotal === "number" &&
            Number.isFinite(subtotal) &&
            subtotal >= 0,

        staleTime: 60_000,
        refetchOnWindowFocus: false,
    });
};