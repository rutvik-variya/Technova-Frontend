export interface CheckoutProduct {
    id: string;
    name: string;
    slug: string;
}

export interface CheckoutVariant {
    sku: string;
}

export interface CheckoutItem {
    id: string;
    product: CheckoutProduct;
    variant: CheckoutVariant;
    quantity: number;
    price: string;
    total: string;
}

export interface CheckoutAddress {
    id: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface CheckoutTotals {
    subtotal: number;
    totalItem: number;
}

export interface CheckoutResponse {
    items: CheckoutItem[];
    address: CheckoutAddress;
    totals: CheckoutTotals;
}

export interface CheckoutPayload {
    addressId: string;
}

