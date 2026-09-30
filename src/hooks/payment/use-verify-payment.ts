"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyPayment } from "@/services/payment.service";

import {
    VerifyPaymentRequest,
    VerifyPaymentResponse,
} from "@/types/payment";

interface VerifyPaymentVariables {
    paymentId: string;
    data: VerifyPaymentRequest;
}

export const useVerifyPayment = () => {
    return useMutation<
        VerifyPaymentResponse,
        Error,
        VerifyPaymentVariables
    >({
        mutationFn: ({ paymentId, data }) =>
            verifyPayment(paymentId, data),
    });
};