import {
    deleteRequest,
    getRequest,
    postRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    AddWishlistPayload,
    WishlistResponse,
} from "@/types/wishlist";

export const getWishlist = async (): Promise<WishlistResponse> => {
    const response = await getRequest<WishlistResponse>(
        API_ENDPOINTS.WISHLIST.ALL
    );

    return response.data;
};

export const addWishlist = async (
    payload: AddWishlistPayload
) => {
    return postRequest(
        API_ENDPOINTS.WISHLIST.ADD,
        payload
    );
};

export const removeWishlist = async (
    productId: string
) => {
    return deleteRequest(
        API_ENDPOINTS.WISHLIST.REMOVE(productId)
    );
};

export const clearWishlist = async () => {
    return deleteRequest(
        API_ENDPOINTS.WISHLIST.CLEAR
    );
};

export const moveWishlistToCart = async (
    productId: string
) => {
    return postRequest(
        API_ENDPOINTS.WISHLIST.MOVE_TO_CART(productId)
    );
};


export const syncWishlist = async (
    productIds: string[]
) => {
    return postRequest(
        API_ENDPOINTS.WISHLIST.SYNC,
        {
            productIds,
        }
    );
};