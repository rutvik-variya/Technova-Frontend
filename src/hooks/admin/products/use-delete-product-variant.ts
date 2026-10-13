// ✅ CORRECT
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteProductVariantService } from "@/services/admin-product.service";

interface DeleteProductVariantInput {
    productId: string;
    productSlug: string;
    variantId: string;
}

export const useDeleteProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ variantId }: DeleteProductVariantInput) =>
            deleteProductVariantService(variantId),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productSlug, // ✅ slug, not ID
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
        },
    });
};