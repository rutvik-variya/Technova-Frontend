export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
    },
    CATEGORIES: {
        LIST: "/categories",
    },

    PRODUCTS: {
        LIST: "/products",
        FEATURED: "/products/featured",
        DETAIL: (slug: string) => `/products/${slug}`,
        BRAND: "/products/brands",
        RELATED: (slug: string) => `/products/${slug}/related`,
    },

    WISHLIST: {
        ADD: "/wishlist/",
    },
    REVIEWS: {
        LIST: (productId: string) => `/reviews/${productId}`,
        CREATE: (productId: string) => `/reviews/${productId}`,
        UPDATE: (reviewId: string) => `/reviews/${reviewId}`,
        DELETE: (reviewId: string) => `/reviews/${reviewId}`
    },
    CART: {
        DETAIL: "/cart",
        ADD_ITEM: "/cart/",
        UPDATE_ITEM: (itemId: string) => `/cart/item/${itemId}`,
        REMOVE_ITEM: (itemId: string) => `/cart/item/${itemId}`,
        CLEAR: "/cart",
    },
} as const;
