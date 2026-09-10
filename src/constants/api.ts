
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
        BRAND: "/products/brands"
    },

    CART: {
        ADD_ITEM: "/cart/",
    },

    WISHLIST: {
        ADD: "/wishlist/",
    },

    ORDERS: {
        LIST: "/orders",
    },
} as const;
