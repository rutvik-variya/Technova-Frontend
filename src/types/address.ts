export type AddressType = "HOME" | "OFFICE" | "OTHER";

export interface Address {
    id: string;
    fullName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string | null;
    landmark: string | null;
    addressType: AddressType;
    isDefault: boolean;
    createdAt: string;
}

export interface CreateAddressPayload {
    fullName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    addressType?: AddressType;
    isDefault?: boolean;
}

export type UpdateAddressPayload =
    Partial<CreateAddressPayload>;

export interface AddressListResponse {
    addresses: Address[];
}