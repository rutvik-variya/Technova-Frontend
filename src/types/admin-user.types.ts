export type AdminUserRole = "USER" | "ADMIN";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    createdAt: string;
    updatedAt: string;
    orderCount: number;
}

export interface AdminUsersMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface AdminUsersResult {
    users: AdminUser[];
    meta: AdminUsersMeta;
}

export interface AdminUserStatistics {
    orderCount: number;
    reviewCount: number;
    addressCount: number;
    couponUsageCount: number;
}

export interface AdminUserDetails {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    createdAt: string;
    updatedAt: string;
    statistics: AdminUserStatistics;
}

export interface UpdateAdminUserRolePayload {
    role: AdminUserRole;
}

export interface AdminUserRoleUpdateResponse {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    createdAt: string;
    updatedAt: string;
}