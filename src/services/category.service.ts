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
    return getRequest<Category[]>("/categories");
};

