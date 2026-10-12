"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateAdminProductService } from "@/services/admin-product.service";
import type { UpdateProductPayload } from "@/types/admin-product";

interface UpdateProductVariables {
    id: string;
    payload: UpdateProductPayload;
}

export const useUpdateAdminProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateProductVariables) =>
            updateAdminProductService(id, payload),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(variables.id),
                }),
            ]);
        },
    });
};