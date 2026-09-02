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
        DETAIL: (id: string) =>
            ["products", "detail", id] as const
    },

    CART: {
        ALL: ["cart"] as const,
        CURRENT: ["cart", "current"] as const,
    },

    WISHLIST: {
        ALL: ["wishlist"] as const,
        CURRENT: ["wishlist", "current"] as const,
    },

    ADDRESSES: {
        ALL: ["addresses"] as const,
        DETAIL: (id: string) =>
            ["addresses", "detail", id] as const,
    },

    ORDERS: {
        ALL: ["orders"] as const,
        LIST: (params?: unknown) =>
            ["orders", "list", params] as const,
        DETAIL: (id: string) =>
            ["orders", "detail", id] as const,
    },
} as const;