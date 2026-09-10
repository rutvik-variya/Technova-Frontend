import { postRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/constants/api";

export interface AddToWishlistPayload {
    productId: string;
}

export interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

export const addToWishlist = async (
    payload: AddToWishlistPayload
) => {
    return postRequest<WishlistItem>(
        API_ENDPOINTS.WISHLIST.ADD,
        payload
    );
};