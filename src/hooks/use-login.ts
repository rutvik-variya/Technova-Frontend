"use client"

import { QUERY_KEYS } from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";
import { loginUser } from "@/services/auth.service";
import { LoginInput } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginInput) => {
            return loginUser(data)
        },
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.AUTH.ME
            })

            await queryClient.refetchQueries({
                queryKey: QUERY_KEYS.AUTH.ME,
            });

            toast.success(response.message || "Login done");
        },
        onError: (error) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        }
    })
} 