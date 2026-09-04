import type { Product } from "@/types/product";

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean
}

export interface ProductListResponse {
    products: Product[];
    meta: PaginationMeta;
}

