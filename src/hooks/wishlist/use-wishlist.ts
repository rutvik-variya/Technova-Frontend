"use client";

import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "@/services/wishlist.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useWishlist = () => {
    return useQuery({
        queryKey: QUERY_KEYS.WISHLIST.ALL,

        queryFn: getWishlist,

        staleTime: 2 * 60 * 1000,
    });
};