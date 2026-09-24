"use client";

import { useQuery } from "@tanstack/react-query";

import { getAddresses } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useCurrentUser } from "../auth/use-current-user";

export const useAddresses = () => {
    const { data: currentUser } = useCurrentUser();

    const user = currentUser?.data;

    return useQuery({
        queryKey: QUERY_KEYS.ADDRESSES.ALL,
        queryFn: getAddresses,
        enabled: Boolean(user),
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};
