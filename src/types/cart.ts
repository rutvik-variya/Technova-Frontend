export interface CartProduct {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    status: string;
    basePrice: number | string;
    maxPrice: number | string;
    image: string | null;
}

export interface CartVariant {
    id: string;
    productId: string;
    sku: string;
    ram: string | null;
    storage: string | null;
    color: string | null;
    price: number | string;
    comparePrice: number | string | null;
    stock: number;
    isActive: boolean;
}

export interface CartItem {
    id: string;
    cartId: string | null;
    productId: string;
    variantId: string;
    quantity: number;
    priceAtAdded: number | string;
    createdAt: string;
    updatedAt: string;

    product: CartProduct;
    variant: CartVariant;
}

export interface Cart {
    id: string | null;
    userId: string | null;
    subtotal: number | string;
    totalItem: number;
    couponId: string | null;
    createdAt?: string;
    updatedAt?: string;
    cartItems: CartItem[];
}

export interface AddToCartPayload {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
}

export interface AddToCartResponse {
    cartId: string;
}

export interface UpdateCartItemResponse {
    cartId: string;
    itemId: string;
    quantity: number;
}

export interface RemoveCartItemResponse {
    cartId: string;
    itemId: string;
}

export interface ClearCartResponse {
    id: string | null;
    userId: string;
    subtotal: number | string;
    totalItem: number;
    couponId: string | null;
    cartItems: [];
}

export interface OptimisticCartItem {
    productId: string;
    variantId: string;
    quantity: number;

    product: CartProduct;
    variant: CartVariant;
}


export interface GuestCartItem {
    productId: string;
    variantId: string;
    quantity: number;

    product: CartProduct;
    variant: CartVariant;
}

export interface SyncCartItemPayload {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface SyncCartPayload {
    items: SyncCartItemPayload[];
}