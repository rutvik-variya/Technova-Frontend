
import { API_ENDPOINTS } from "@/constants/api";
import {
    deleteRequest,
    getRequest,
    patchRequest,
    postRequest,
} from "@/lib/api-request";
import type { ApiResponse } from "@/types/api";
import type {
    Category,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from "@/types/category";

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    return getRequest<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
};

export const getCategoryById = async (
    id: string,
): Promise<ApiResponse<Category>> => {
    return getRequest<Category>(
        `${API_ENDPOINTS.CATEGORIES.LIST}/${id}`,
    );
};

export const createCategoryService = async (
    payload: CreateCategoryPayload,
): Promise<ApiResponse<Category>> => {
    return postRequest<Category, CreateCategoryPayload>(
        API_ENDPOINTS.CATEGORIES.LIST,
        payload,
    );
};

export const updateCategoryService = async (
    id: string,
    payload: UpdateCategoryPayload,
): Promise<ApiResponse<Category>> => {
    return patchRequest<Category, UpdateCategoryPayload>(
        `${API_ENDPOINTS.CATEGORIES.LIST}/${id}`,
        payload,
    );
};

export const deleteCategoryService = async (
    id: string,
): Promise<ApiResponse<null>> => {
    return deleteRequest<null>(
        `${API_ENDPOINTS.CATEGORIES.LIST}/${id}`,
    );
};
