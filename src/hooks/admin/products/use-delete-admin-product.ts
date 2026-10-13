
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteAdminProductService } from "@/services/admin-product.service";

export const useDeleteAdminProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            deleteAdminProductService(productId),

        onSuccess: async (_data, productId) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(productId),
                }),
            ]);
        },
    });
};
