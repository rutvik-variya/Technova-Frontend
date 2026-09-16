export interface CartProduct {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    status: string;
    basePrice: string;
    maxPrice: string;
    image: string | null;
}

export interface CartVariant {
    id: string;
    productId: string;
    sku: string;
    ram: string | null;
    storage: string | null;
    color: string | null;
    price: string;
    comparePrice: string | null;
    stock: number;
    isActive: boolean;
}

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    variantId: string;
    quantity: number;
    priceAtAdded: string;
    createdAt: string;
    updatedAt: string;
    product: CartProduct;
    variant: CartVariant;
}

export interface Cart {
    id: string;
    userId: string;
    subtotal: string;
    totalItem: number;
    couponId: string | null;
    createdAt: string;
    updatedAt: string;
    cartItems: CartItem[];
}

export interface AddToCartPayload {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface AddToCartResponse {
    cartId: string;
}

export interface UpdateCartItemPayload {
    quantity: number;
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
    id: string;
    subtotal: number;
    totalItem: number;
    cartItems: CartItem[];
}

export interface OptimisticCartItem {
    productId: string;
    variantId: string;
    quantity: number;
    product: CartProduct;
    variant: CartVariant;
}