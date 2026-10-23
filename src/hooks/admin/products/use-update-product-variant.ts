import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateProductVariantService } from "@/services/admin-product.service";
import type { UpdateVariantPayload } from "@/types/admin-product";
import { getApiError } from "@/lib/api-error";

interface UpdateProductVariantInput {
    productId: string;
    variantId: string;
    payload: UpdateVariantPayload;
    productQueryKey?: string;
}

export const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // Pass productId to the service if needed, otherwise just use variantId
        mutationFn: ({ variantId, payload }: UpdateProductVariantInput) =>
            updateProductVariantService(variantId, payload),

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
            toast.success(response.message || "Product variant updated successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};