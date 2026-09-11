"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: QUERY_KEYS.AUTH.ME,
        queryFn: getCurrentUser,
        retry: false,
    });
};