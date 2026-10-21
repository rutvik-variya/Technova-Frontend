export const QUERY_KEYS = {
    AUTH: {
        ALL: ["auth"] as const,
        ME: ["auth", "me"] as const,
    },

    CATEGORIES: {
        ALL: ["categories"] as const,
        DETAIL: (id: string) =>
            ["categories", "detail", id] as const,
    },

    PRODUCTS: {
        ALL: ["products"] as const,
        LIST: (params?: unknown) =>
            ["products", "list", params] as const,
        FEATURED: ["products", "featured"] as const,
        DETAIL: (slug: string) =>
            ["products", "detail", slug] as const,
        BRANDS: ["brands"] as const,
        RELATED: (slug: string) =>
            ["products", "related", slug] as const,
    },

    CART: {
        DETAIL: ["cart"] as const,
    },
    ORDERS: {
        ALL: ["orders"] as const,
        LIST: (params?: unknown) =>
            ["orders", "list", params] as const,
        DETAIL: (id: string) =>
            ["orders", "detail", id] as const,
    },
    WISHLIST: {
        ALL: ["wishlist"] as const,
    },
    REVIEWS: {
        PRODUCT: (productId: string) =>
            ["reviews", "product", productId] as const,
    },

    ADDRESSES: {
        ALL: ["addresses"] as const,

        DETAIL: (id: string) =>
            ["addresses", "detail", id] as const,
    },

    CHECKOUT: {
        DETAIL: (addressId: string) =>
            [
                "checkout",
                "detail",
                addressId,
            ] as const,
    },
    SHIPPING: {
        METHODS: (subtotal: number) =>
            ["shipping", "methods", subtotal] as const,
    },
    ADMIN: {
        DASHBOARD: ["admin", "dashboard"] as const,
        DASHBOARD_SALES: ["admin", "dashboard", "sales"] as const,
    },
    ADMIN_PRODUCTS: {
        ALL: ["admin", "products"] as const,
        LIST: ["admin", "products", "list"] as const,
        DETAIL: (slug: string) => ["admin", "products", "detail", slug] as const,
    },
    ADMIN_ORDERS: {
        ALL: ["admin", "orders"] as const,

        LIST: (params?: unknown) =>
            ["admin", "orders", "list", params] as const,

        DETAIL: (orderId: string) =>
            ["admin", "orders", "detail", orderId] as const,

        TIMELINE: (orderId: string) =>
            ["admin", "orders", "timeline", orderId] as const,
    },
    ADMIN_USERS: {
        ALL: ["admin", "users"] as const,

        LIST: (params?: unknown) =>
            ["admin", "users", "list", params] as const,

        DETAIL: (userId: string) =>
            ["admin", "users", "detail", userId] as const,
    },


    ADMIN_COUPONS: {
        ALL: ["admin", "coupons"] as const,
        LIST: (params?: { page?: number; limit?: number }) =>
            ["admin", "coupons", "list", params] as const,
        DETAIL: (couponId: string) =>
            ["admin", "coupons", "detail", couponId] as const,
    },

} as const;