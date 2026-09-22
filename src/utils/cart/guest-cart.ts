import type {
    Cart,
    GuestCartItem,
} from "@/types/cart";

export const guestCartToCart = (
    items: GuestCartItem[],
): Cart => {
    const cartItems = items.map((item, index) => {
        const now = new Date().toISOString();

        return {
            id: `guest-${item.variantId}-${index}`,
            cartId: null,

            productId: item.productId,
            variantId: item.variantId,

            quantity: item.quantity,

            priceAtAdded: item.variant.price,

            createdAt: now,
            updatedAt: now,

            product: item.product,

            variant: item.variant,
        };
    });

    const subtotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.priceAtAdded) * item.quantity,
        0,
    );

    const totalItem = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    return {
        id: null,
        userId: null,

        subtotal: String(subtotal),
        totalItem,

        couponId: null,

        cartItems,
    };
};