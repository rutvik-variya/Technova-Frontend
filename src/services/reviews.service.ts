import { API_ENDPOINTS } from "@/constants/api";
import {
    deleteRequest,
    getRequest,
    patchRequest,
    postRequest,
    putRequest,
} from "@/lib/api-request";

import {
    CreateReviewPayload,
    ProductReviewsResponse,
    Review,
    UpdateReviewPayload,
} from "@/types/reviews";

import { ApiResponse } from "@/types/api";

// Get product reviews
export const getProductReviews = async (
    productId: string,
    page: number,
    limit: number
): Promise<ApiResponse<ProductReviewsResponse>> => {
    return await getRequest<ProductReviewsResponse>(
        `${API_ENDPOINTS.REVIEWS.LIST(productId)}?page=${page}&limit=${limit}`
    );
};

// Create review
export const createReviews = async (
    productId: string,
    payload: CreateReviewPayload
): Promise<ApiResponse<Review>> => {
    return await postRequest<Review>(
        API_ENDPOINTS.REVIEWS.CREATE(productId),
        payload
    );
};

// Update review
export const updateReview = async (
    reviewId: string,
    payload: UpdateReviewPayload
): Promise<ApiResponse<Review>> => {
    return await patchRequest<Review>(
        API_ENDPOINTS.REVIEWS.UPDATE(reviewId),
        payload
    );
};

// Delete review
export const deleteReview = async (
    reviewId: string
): Promise<ApiResponse<null>> => {
    return await deleteRequest<null>(
        API_ENDPOINTS.REVIEWS.DELETE(reviewId)
    );
};
