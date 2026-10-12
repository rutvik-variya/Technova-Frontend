
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { createProductVariantService } from "@/services/admin-product.service";
import type { CreateVariantPayload } from "@/types/admin-product";

interface CreateProductVariantInput {
    productId: string;
    payload: CreateVariantPayload;
}

export const useCreateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, payload }: CreateProductVariantInput) =>
            createProductVariantService(productId, payload),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
        },
    });
};
