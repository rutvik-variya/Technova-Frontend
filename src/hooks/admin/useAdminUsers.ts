
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import type {
    UpdateAdminUserRolePayload,
} from "@/types/admin-user.types";
import { getAdminUserByIdService, getAdminUsersService, updateAdminUserRoleService } from "@/services/admin-users.service";

// Get All Admin Users
export const useAdminUsers = (
    params?: { page?: number; limit?: number }
) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_USERS.LIST(params),
        queryFn: () => getAdminUsersService(params),
    });
};

// Get Admin User Details
export const useAdminUserById = (userId: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_USERS.DETAIL(userId),
        queryFn: () => getAdminUserByIdService(userId),
        enabled: Boolean(userId),
    });
};

// Update Admin User Role
export const useUpdateAdminUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            payload,
        }: {
            userId: string;
            payload: UpdateAdminUserRolePayload;
        }) => updateAdminUserRoleService(userId, payload),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_USERS.ALL,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_USERS.DETAIL(
                        variables.userId
                    ),
                }),
            ]);
        },
    });
};
