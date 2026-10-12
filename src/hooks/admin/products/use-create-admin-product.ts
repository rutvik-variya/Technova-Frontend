"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { createAdminProductService } from "@/services/admin-product.service";
import type { CreateProductPayload } from "@/types/admin-product";

export const useCreateAdminProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProductPayload) =>
            createAdminProductService(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
            });
        },
    });
};