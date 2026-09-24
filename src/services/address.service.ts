import {
    deleteRequest,
    getRequest,
    patchRequest,
    postRequest,
} from "@/lib/api-request";

import { API_ENDPOINTS } from "@/constants/api";

import type {
    Address,
    CreateAddressPayload,
    UpdateAddressPayload,
} from "@/types/address";

export const getAddresses = async (): Promise<Address[]> => {
    const response = await getRequest<Address[]>(
        API_ENDPOINTS.ADDRESS.ALL
    );

    return response.data;
};

export const getAddress = async (
    addressId: string
): Promise<Address> => {
    const response = await getRequest<Address>(
        API_ENDPOINTS.ADDRESS.DETAIL(addressId)
    );

    return response.data;
};

export const createAddress = async (
    payload: CreateAddressPayload
): Promise<Address> => {
    const response = await postRequest<
        Address,
        CreateAddressPayload
    >(
        API_ENDPOINTS.ADDRESS.CREATE,
        payload
    );

    return response.data;
};

export const updateAddress = async (
    addressId: string,
    payload: UpdateAddressPayload
): Promise<Address> => {
    const response = await patchRequest<
        Address,
        UpdateAddressPayload
    >(
        API_ENDPOINTS.ADDRESS.UPDATE(addressId),
        payload
    );

    return response.data;
};

export const deleteAddress = async (
    addressId: string
): Promise<void> => {
    await deleteRequest(
        API_ENDPOINTS.ADDRESS.DELETE(addressId)
    );
};

export const setDefaultAddress = async (
    addressId: string
): Promise<Address> => {
    const response = await patchRequest<Address>(
        API_ENDPOINTS.ADDRESS.SET_DEFAULT(addressId)
    );

    return response.data;
};