import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { ProductQueryParams } from "@/types/product-query";
import { ProductListResponse } from "@/types/product-response";


export interface Brands {
    brand: string;
}

export const getFeaturedProducts = async () => {
    return getRequest<Product[]>(
        API_ENDPOINTS.PRODUCTS.FEATURED
    );
};

export const getProducts = async (
    params?: ProductQueryParams
): Promise<ProductListResponse> => {
    const response = await getRequest<ProductListResponse>(
        API_ENDPOINTS.PRODUCTS.LIST,
        params ? { ...params } : undefined
    );

    return response.data;
};

export const getBrands = async (): Promise<
    ApiResponse<Brands[]>
> => {
    return getRequest<Brands[]>(API_ENDPOINTS.PRODUCTS.BRAND);
};


export const getProductBySlug = async (
    slug: string
): Promise<Product> => {
    const response = await getRequest<Product>(
        API_ENDPOINTS.PRODUCTS.DETAIL(slug)
    );
    return response.data;
};


export const getRelatedProducts = async (
    slug: string
): Promise<ProductListResponse> => {
    const response = await getRequest<ProductListResponse>(
        API_ENDPOINTS.PRODUCTS.RELATED(slug)
    );
    return response.data;
};




