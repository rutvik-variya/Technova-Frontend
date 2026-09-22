"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getCart } from "@/services/cart.service";
import { useCurrentUser } from "../auth/use-current-user";

export const useCart = () => {
    const { data: currentUser } = useCurrentUser();
    const user = currentUser?.data;

    return useQuery({
        queryKey: QUERY_KEYS.CART.DETAIL,
        queryFn: getCart,
        enabled: Boolean(user),
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};