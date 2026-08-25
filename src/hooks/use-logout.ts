"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { logoutUser } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,

        onSuccess: async (response) => {
            queryClient.setQueryData(
                QUERY_KEYS.AUTH.ME,
                null,
            );

            queryClient.removeQueries({
                queryKey: QUERY_KEYS.AUTH.ME,
            });

            toast.success(
                response.message || "Logged out successfully",
            );
        },

        onError: (error) => {
            const apiError = getApiError(error);
            toast.error(apiError.message);
        },
    });
};