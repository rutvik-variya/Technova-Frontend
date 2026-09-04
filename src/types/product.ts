export type productStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface ProductImage {
    id: string;
    productId: string;
    url: string;
    isPrimary?: boolean;
    displayOrder?: number;
}
export interface ProductVariant {
    id: string;
    productId: string;
    sku?: string;
    ram?: string;
    storage?: string;
    color?: string;
    price?: number;
    stock?: number;
    isActive?: boolean;

}


export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    brand?: string | null;
    basePrice: number;
    maxPrice: number;
    status?: productStatus;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    productImages?: ProductImage[];
    productVariants?: ProductVariant[];
    category?: {
        id: string;
        name: string;
        slug: string;
    }
}

