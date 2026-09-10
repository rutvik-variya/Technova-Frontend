import { API_ENDPOINTS } from "@/constants/api"
import { postRequest } from "@/lib/api-request"

export interface AddToCartPayload {
    productId: string,
    variantId: string,
    quantity: number
}

export const addToCart = async (
    payload: AddToCartPayload
): ReturnType<typeof postRequest<string>> => {
    return postRequest<string>(
        API_ENDPOINTS.CART.ADD_ITEM,
        payload
    )
}