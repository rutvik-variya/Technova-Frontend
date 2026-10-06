"use client";

import { useMutation } from "@tanstack/react-query";

import { changePassword } from "@/services/auth.service";
import { ChangePasswordPayload } from "@/types/auth";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (
            payload: ChangePasswordPayload
        ) => changePassword(payload),
    });
};

