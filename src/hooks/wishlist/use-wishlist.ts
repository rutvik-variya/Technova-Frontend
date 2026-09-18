"use client";

import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "@/services/wishlist.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useCurrentUser } from "../auth/use-current-user";

export const useWishlist = () => {
    const { data: currentUser } = useCurrentUser();

    const user = currentUser?.data;

    return useQuery({
        queryKey: QUERY_KEYS.WISHLIST.ALL,

        queryFn: getWishlist,

        enabled: Boolean(user),

        staleTime: 2 * 60 * 1000,

        refetchOnWindowFocus: false,
    });
};