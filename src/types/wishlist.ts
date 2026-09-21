export interface WishlistCategory {
    id: string;
    name: string;
}

export interface WishlistProduct {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    basePrice: number | string;
    maxPrice: number | string;
    status: string;
    category: WishlistCategory | null;
    productUrl: string | null
}

export interface WishlistItem {
    id: string;
    createdAt: string;
    product: WishlistProduct;
}

export type WishlistResponse = WishlistItem[];

export interface AddWishlistPayload {
    productId: string;
}

export interface GuestWishlistItem {
    productId: string;
    slug: string;
    name: string;
    brand: string | null;
    image: string | null;
    basePrice: number | string;
    maxPrice: number | string;
    categoryName: string | null;
}