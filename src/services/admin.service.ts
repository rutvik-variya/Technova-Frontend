import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request";
import { AdminDashboardData, AdminDashboardSales, AdminSalesPeriod } from "@/types/admin";
import { ApiResponse } from "@/types/api";

export const getAdminDashboard = async (): Promise<
    ApiResponse<AdminDashboardData>
> => {
    return getRequest<AdminDashboardData>(
        API_ENDPOINTS.ADMIN.DASHBOARD,
    );
};


export const getAdminDashboardSales = async (
    period: AdminSalesPeriod,
): Promise<ApiResponse<AdminDashboardSales>> => {
    return getRequest<AdminDashboardSales>(
        `${API_ENDPOINTS.ADMIN.DASHBOARD_SALES}?period=${period}`,
    );
};