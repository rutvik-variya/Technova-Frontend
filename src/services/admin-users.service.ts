import {
    getRequest,
    patchRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    AdminUserDetails,
    AdminUserRoleUpdateResponse,
    AdminUsersResult,
    UpdateAdminUserRolePayload,
} from "@/types/admin-user.types";

// Get All Admin Users
export const getAdminUsersService = async (
    params?: { page?: number; limit?: number }
): Promise<AdminUsersResult> => {
    const response = await getRequest<AdminUsersResult>(
        API_ENDPOINTS.ADMIN.USERS.LIST,
        params ? { ...params } : undefined
    );

    return response.data;
};

// Get Admin User Details
export const getAdminUserByIdService = async (
    userId: string
): Promise<AdminUserDetails> => {
    const response = await getRequest<AdminUserDetails>(
        API_ENDPOINTS.ADMIN.USERS.DETAIL(userId)
    );

    return response.data;
};

// Update Admin User Role
export const updateAdminUserRoleService = async (
    userId: string,
    payload: UpdateAdminUserRolePayload
): Promise<AdminUserRoleUpdateResponse> => {
    const response = await patchRequest<
        AdminUserRoleUpdateResponse,
        UpdateAdminUserRolePayload
    >(
        API_ENDPOINTS.ADMIN.USERS.UPDATE_ROLE(userId),
        payload
    );

    return response.data;
};