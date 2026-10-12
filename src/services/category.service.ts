import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request";
import type { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";


export const getCategories = async (): Promise<
    ApiResponse<Category[]>
> => {
    const response = await getRequest<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
    return response;
};

