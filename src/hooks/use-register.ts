"use client"

import { getApiError } from "@/lib/api-error"
import { registerUser } from "@/services/auth.service"
import { RegisterInput } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterInput) =>
            registerUser(data),
        onSuccess: (Response) => {
            toast.success(Response.message || "Registration successful")
        },
        onError: (error) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        }
    })
}

