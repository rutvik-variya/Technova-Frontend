"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminDashboardSales } from "@/services/admin.service";
import type { AdminSalesPeriod } from "@/types/admin";

export const useAdminDashboardSales = (
    period: AdminSalesPeriod = "7d",
) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.ADMIN.DASHBOARD_SALES, period],
        queryFn: () => getAdminDashboardSales(period),
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};