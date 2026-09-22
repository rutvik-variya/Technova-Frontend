import {
    deleteRequest,
    getRequest,
    patchRequest,
    postRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    AddToCartPayload,
    AddToCartResponse,
    Cart,
    ClearCartResponse,
    RemoveCartItemResponse,
    SyncCartPayload,
    UpdateCartItemPayload,
    UpdateCartItemResponse,
} from "@/types/cart";

export const getCart = async (): Promise<Cart> => {
    const response = await getRequest<Cart>(
        API_ENDPOINTS.CART.DETAIL
    );

    return response.data;
};

export const addToCart = async (
    payload: AddToCartPayload
): Promise<AddToCartResponse> => {
    const response = await postRequest<AddToCartResponse>(
        API_ENDPOINTS.CART.ADD_ITEM,
        payload
    );

    return response.data;
};

export const updateCartItem = async (
    itemId: string,
    payload: UpdateCartItemPayload
): Promise<UpdateCartItemResponse> => {
    const response = await patchRequest<UpdateCartItemResponse>(
        API_ENDPOINTS.CART.UPDATE_ITEM(itemId),
        payload
    );

    return response.data;
};

export const removeCartItem = async (
    itemId: string
): Promise<RemoveCartItemResponse> => {
    const response = await deleteRequest<RemoveCartItemResponse>(
        API_ENDPOINTS.CART.REMOVE_ITEM(itemId)
    );

    return response.data;
};

export const clearCart = async (): Promise<ClearCartResponse> => {
    const response = await deleteRequest<ClearCartResponse>(
        API_ENDPOINTS.CART.CLEAR
    );

    return response.data;
};

export const syncCart = async (
    payload: SyncCartPayload,
): Promise<Cart> => {
    const response = await postRequest<Cart>(
        API_ENDPOINTS.CART.SYNC,
        payload,
    );

    return response.data;
};