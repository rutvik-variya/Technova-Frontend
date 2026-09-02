import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request";
import type { ApiResponse } from "@/types/api";

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export const getCategories = async (): Promise<
    ApiResponse<Category[]>
> => {
    return getRequest<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
};

