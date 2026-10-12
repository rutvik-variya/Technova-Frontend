
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateProductVariantService } from "@/services/admin-product.service";
import type { UpdateVariantPayload } from "@/types/admin-product";

interface UpdateProductVariantInput {
    productId: string;
    variantId: string;
    payload: UpdateVariantPayload;
}

export const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ variantId, payload }: UpdateProductVariantInput) =>
            updateProductVariantService(variantId, payload),

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
