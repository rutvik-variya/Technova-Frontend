
export type ProductStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
}

export interface ProductImage {
    id: string;
    url: string;
    isPrimary: boolean;
    displayOrder: number;
}

export interface ProductVariant {
    id: string;              // ← must exist (variant's own id)
    productId: string;       // ← parent product id
    sku: string;
    ram: string | null;
    storage: string | null;
    color: string | null;
    price: string | number;
    comparePrice: string | number | null;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface AdminProduct {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    brand: string;
    status: ProductStatus;
    isFeatured: boolean;
    basePrice: string | number;
    maxPrice: string | number;
    categoryId: ProductCategory;
    category: ProductCategory;
    productImages: ProductImage[];
    productVariants: ProductVariant[];
    createdAt: string;
    updatedAt: string;
}

export interface ProductPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ProductListData {
    id: string;
    name: string;
    products: AdminProduct[];
    pagination: ProductPagination;
}

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface CreateProductPayload {
    name: string;
    description: string;
    shortDescription: string;
    brand: string;
    status: ProductStatus;
    categoryId: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface CreateVariantPayload {
    sku: string;
    ram?: string;
    storage?: string;
    color?: string;
    price: number; // Must be a number, not a string
    comparePrice?: number;
    stock: number;
}

export type UpdateVariantPayload = Partial<CreateVariantPayload>;