
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { createProductVariantService } from "@/services/admin-product.service";
import type { CreateVariantPayload } from "@/types/admin-product";
import { getApiError } from "@/lib/api-error";

interface CreateProductVariantInput {
    productId: string;
    payload: CreateVariantPayload;
    showToasts?: boolean;
    productQueryKey?: string;
}

export const useCreateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, payload }: CreateProductVariantInput) =>
            createProductVariantService(productId, payload),

        onSuccess: async (response, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productQueryKey ?? variables.productId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
            if (variables.showToasts !== false) {
                toast.success(response.message || "Product variant added successfully.");
            }
        },

        onError: (error: unknown, variables) => {
            if (variables.showToasts !== false) {
                toast.error(getApiError(error).message);
            }
        },
    });
};
