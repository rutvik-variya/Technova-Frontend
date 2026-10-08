"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminDashboard } from "@/services/admin.service";

export const useAdminDashboard = () => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN.DASHBOARD,
        queryFn: getAdminDashboard,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};