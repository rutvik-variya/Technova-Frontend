import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request"
import { Product } from "@/types/product"
import { ProductQueryParams } from "@/types/product-query";
import { ProductListResponse } from "@/types/product-response";

export const getFeaturedProducts = async () => {
    return getRequest<Product[]>(API_ENDPOINTS.PRODUCTS.FEATURED);
}

export const getProducts = async (
    params?: ProductQueryParams
): Promise<ProductListResponse> => {
    const response = await getRequest<ProductListResponse>(
        API_ENDPOINTS.PRODUCTS.LIST, {
        params
    }
    );

    return response.data;
}


