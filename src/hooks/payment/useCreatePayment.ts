"use client";

import { useMutation } from "@tanstack/react-query";
import { createPaymentService } from "@/services/payment.service";

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: createPaymentService,
    });
};