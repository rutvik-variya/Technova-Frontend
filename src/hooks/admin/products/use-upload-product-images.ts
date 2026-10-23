
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { uploadProductImagesService } from "@/services/admin-product.service";
import { getApiError } from "@/lib/api-error";

interface UploadProductImagesInput {
    productId: string;
    files: File[];
    showToasts?: boolean;
    productQueryKey?: string;
}

export const useUploadProductImages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, files }: UploadProductImagesInput) =>
            uploadProductImagesService(productId, files),

        onSuccess: async (_data, variables) => {
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
                toast.success("Product images uploaded successfully.");
            }
        },

        onError: (error: unknown, variables) => {
            if (variables.showToasts !== false) {
                toast.error(getApiError(error).message);
            }
        },
    });
};
