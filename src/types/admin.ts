export interface AdminDashboardSummary {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
}

export interface AdminDashboardOrders {
    pending: number;
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    returned: number;
}

export interface AdminDashboardCustomer {
    id: string;
    name: string;
    email: string;
}

export interface AdminRecentOrder {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    grandTotal: number;
    createdAt: string;
    customer: AdminDashboardCustomer;
}

export interface AdminDashboardData {
    summary: AdminDashboardSummary;
    orders: AdminDashboardOrders;
    recentOrders: AdminRecentOrder[];
}

export type AdminSalesPeriod = "7d" | "30d" | "90d" | "1y";

export interface AdminSalesDataPoint {
    date: string;
    orders: number;
    revenue: number;
}

export interface AdminDashboardSales {
    period: AdminSalesPeriod;
    startDate: string;
    endDate: string;
    totalOrders: number;
    totalRevenue: number;
    data: AdminSalesDataPoint[];
}