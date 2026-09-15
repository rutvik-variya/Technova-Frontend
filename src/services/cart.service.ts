import { API_ENDPOINTS } from "@/constants/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/api-request"
import { Cart, CartItem } from "@/types/cart";

export interface AddToCartPayload {
    productId: string,
    variantId: string,
    quantity: number
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
    id: string;
    subtotal: number;
    totalItem: number;
    cartItems: CartItem[];
}

export const getCart = async (): ReturnType<typeof getRequest<Cart>> => {
    return getRequest<Cart>(API_ENDPOINTS.CART.DETAIL);
};

export const addToCart = async (
    payload: AddToCartPayload
): ReturnType<typeof postRequest<string>> => {
    return postRequest<string>(
        API_ENDPOINTS.CART.ADD_ITEM,
        payload
    )
}


export const updateCartItem = async (
    itemId: string,
    payload: UpdateCartItemPayload
): ReturnType<typeof patchRequest<UpdateCartItemResponse>> => {
    return patchRequest<UpdateCartItemResponse>(
        API_ENDPOINTS.CART.UPDATE_ITEM(itemId),
        payload
    );
};


export const removeCartItem = async (
    itemId: string
): ReturnType<typeof deleteRequest<RemoveCartItemResponse>> => {
    return deleteRequest<RemoveCartItemResponse>(
        API_ENDPOINTS.CART.REMOVE_ITEM(itemId)
    );
};


export const clearCart = async (): ReturnType<typeof deleteRequest<ClearCartResponse>> => {
    return deleteRequest<ClearCartResponse>(
        API_ENDPOINTS.CART.CLEAR
    );
};