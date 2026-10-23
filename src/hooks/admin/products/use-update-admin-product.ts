"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateAdminProductService } from "@/services/admin-product.service";
import type { UpdateProductPayload } from "@/types/admin-product";
import { getApiError } from "@/lib/api-error";

interface UpdateProductVariables {
    id: string;
    payload: UpdateProductPayload;
    productQueryKey?: string;
}

export const useUpdateAdminProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateProductVariables) =>
            updateAdminProductService(id, payload),

        onSuccess: async (response, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productQueryKey ?? variables.id,
                    ),
                }),
            ]);
            toast.success(response.message || "Product updated successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};