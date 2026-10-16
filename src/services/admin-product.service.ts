import {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type { ApiResponse as RequestApiResponse } from "@/types/api";

import type {
    AdminProduct,
    ApiResponse,
    CreateProductPayload,
    CreateVariantPayload,
    ProductImage,
    ProductListData,
    ProductVariant,
    UpdateProductPayload,
    UpdateVariantPayload,
} from "@/types/admin-product";

// Get products
// services/admin-product.service.ts
export const getAdminProductsService = async (
    page = 1,
    limit = 10,
): Promise<RequestApiResponse<ProductListData>> => {
    const response = await getRequest<ProductListData>(
        API_ENDPOINTS.PRODUCTS.LIST,
        { page, limit },
    );
    return response;
};

// Get product by ID
export const getAdminProductBySlugService = async (
    slug: string,
): Promise<RequestApiResponse<AdminProduct>> => {
    const response = await getRequest<AdminProduct>(
        API_ENDPOINTS.PRODUCTS.DETAIL(slug),
    );
    return response;
};


// Create product
export const createAdminProductService = async (
    payload: CreateProductPayload,
): Promise<AdminProduct> => {
    const response = await postRequest<AdminProduct, CreateProductPayload>(
        API_ENDPOINTS.PRODUCTS.CREATE,
        payload,
    );

    return response.data;
};

// Update product
export const updateAdminProductService = async (
    id: string,
    payload: UpdateProductPayload,
): Promise<ApiResponse<AdminProduct>> => {
    const response = await patchRequest<
        ApiResponse<AdminProduct>,
        UpdateProductPayload
    >(API_ENDPOINTS.PRODUCTS.UPDATE(id), payload);

    return response.data;
};

// Delete product
export const deleteAdminProductService = async (
    id: string,
): Promise<ApiResponse<null>> => {
    const response = await deleteRequest<ApiResponse<null>>(
        API_ENDPOINTS.PRODUCTS.DELETE(id),
    );

    return response.data;
};

// Upload multiple product images
// services/admin-product.service.ts
export const uploadProductImagesService = async (
    productId: string,
    files: File[],
): Promise<ApiResponse<ProductImage[]>> => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    const response = await postRequest<
        ApiResponse<ProductImage[]>,
        FormData
    >(
        API_ENDPOINTS.PRODUCTS.UPLOAD_IMAGES(productId),
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// Set primary image
export const setPrimaryProductImageService = async (
    imageId: string,
): Promise<ApiResponse<ProductImage>> => {
    const response = await patchRequest<ApiResponse<ProductImage>>(
        API_ENDPOINTS.PRODUCTS.SET_PRIMARY_IMAGE(imageId),
    );

    return response.data;
};

// Delete image
export const deleteProductImageService = async (
    imageId: string,
): Promise<ApiResponse<null>> => {
    const response = await deleteRequest<ApiResponse<null>>(
        API_ENDPOINTS.PRODUCTS.DELETE_IMAGE(imageId),
    );

    return response.data;
};

// Create variant
export const createProductVariantService = async (
    productId: string,
    payload: CreateVariantPayload,
): Promise<ApiResponse<ProductVariant>> => {
    // REMOVE FormData - just pass the payload directly as JSON
    const response = await postRequest<
        ApiResponse<ProductVariant>,
        CreateVariantPayload
    >(API_ENDPOINTS.PRODUCTS.CREATE_VARIANT(productId), payload);

    return response.data;
};

// Update variant
export const updateProductVariantService = async (
    variantId: string,
    payload: UpdateVariantPayload,
): Promise<ApiResponse<ProductVariant>> => {
    const response = await patchRequest<
        ApiResponse<ProductVariant>,
        UpdateVariantPayload
    >(API_ENDPOINTS.PRODUCTS.UPDATE_VARIANT(variantId), payload);

    return response.data;
};

// Delete variant
export const deleteProductVariantService = async (
    variantId: string,
): Promise<ApiResponse<null>> => {
    const response = await deleteRequest<ApiResponse<null>>(
        API_ENDPOINTS.PRODUCTS.DELETE_VARIANT(variantId),
    );

    return response.data;
};