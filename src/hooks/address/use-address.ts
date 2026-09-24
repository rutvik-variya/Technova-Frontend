"use client";

import { useQuery } from "@tanstack/react-query";

import { getAddress } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useAddress = (
    addressId?: string
) => {
    return useQuery({
        queryKey: addressId
            ? QUERY_KEYS.ADDRESSES.DETAIL(addressId)
            : ["addresses", "detail"],
        queryFn: () => getAddress(addressId!),
        enabled: Boolean(addressId),
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};
