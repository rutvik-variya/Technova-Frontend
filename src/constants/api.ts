export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
        CHANGE_PASSWORD: "/auth/change-password",
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
        CREATE: "/products",
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,

        UPLOAD_IMAGES: (id: string) => `/products/${id}/images`,
        SET_PRIMARY_IMAGE: (imageId: string) =>
            `/products/${imageId}/primary`,
        DELETE_IMAGE: (imageId: string) =>
            `/products/${imageId}/image`,

        CREATE_VARIANT: (productId: string) =>
            `/products/${productId}/variants`,
        UPDATE_VARIANT: (variantId: string) =>
            `/products/variants/${variantId}`,
        DELETE_VARIANT: (variantId: string) =>
            `/products/variants/${variantId}`,
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
        SYNC: "/cart/sync",
    },
    WISHLIST: {
        ALL: "/wishlist/",
        ADD: "/wishlist/",
        REMOVE: (productId: string) => `/wishlist/${productId}`,
        CLEAR: "/wishlist/",
        MOVE_TO_CART: (productId: string) =>
            `/wishlist/${productId}/move-to-cart`,
        SYNC: "/wishlist/sync",
    },
    CHECKOUT: {
        CREATE: "/checkout",
    },
    ADDRESS: {
        ALL: "/address",
        CREATE: "/address",
        DETAIL: (addressId: string) =>
            `/address/${addressId}`,
        UPDATE: (addressId: string) =>
            `/address/${addressId}`,
        DELETE: (addressId: string) =>
            `/address/${addressId}`,
        SET_DEFAULT: (addressId: string) =>
            `/address/${addressId}/default`,
    },
    COUPON: {
        APPLY: "/coupon/apply",
        REMOVE: "/coupon/remove",
    },
    SHIPPING: {
        METHODS: "/shipping/method",
    },
    ORDER: {
        CREATE: "/order",
        LIST: "/order",
        DETAIL: (orderId: string) => `/order/${orderId}`,
        CANCEL: (orderId: string) => `/order/${orderId}/cancel`,
    },
    PAYMENT: {
        CREATE: "/payment",
        CREATE_ONLINE: "/payment/online",
    },
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        DASHBOARD_SALES: "/admin/dashboard/sales",
    },
} as const;
