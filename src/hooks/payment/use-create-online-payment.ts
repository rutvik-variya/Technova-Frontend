"use client";

import { useMutation } from "@tanstack/react-query";

import {
    createOnlinePayment,
} from "@/services/payment.service";

import {
    CreateOnlinePaymentRequest,
    CreateOnlinePaymentResponse,
} from "@/types/payment";

export const useCreateOnlinePayment = () => {
    return useMutation<
        CreateOnlinePaymentResponse,
        Error,
        CreateOnlinePaymentRequest
    >({
        mutationFn: createOnlinePayment,
    });
};