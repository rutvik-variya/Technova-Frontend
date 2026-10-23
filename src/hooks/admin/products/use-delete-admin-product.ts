
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteAdminProductService } from "@/services/admin-product.service";
import { getApiError } from "@/lib/api-error";

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
            queryClient.removeQueries({
                queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(productId),
            });
            toast.success("Product deleted successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};
