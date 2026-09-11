export interface ReviewUser {
    id: string,
    name: string
}

export interface Review {
    id: string,
    productId: string,
    userId?: string,
    rating: number,
    comment: string,
    createdAt: string;
    updatedAt?: string;
    user: ReviewUser;
}

export interface ReviewPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ProductReviewsResponse {
    reviews: Review[];
    pagination: ReviewPagination
}

export interface CreateReviewPayload {
    rating: number;
    comment: string;
}

export interface UpdateReviewPayload {
    rating: number;
    comment: string;
}