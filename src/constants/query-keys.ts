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
} as const;