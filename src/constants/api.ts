
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
        CURRENT: "/cart",
        ADD: "/cart/items",
    },

    WISHLIST: {
        CURRENT: "/wishlist",
    },

    ORDERS: {
        LIST: "/orders",
    },
} as const;
