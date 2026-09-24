"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateAddress } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";

import type { UpdateAddressPayload } from "@/types/address";

interface UpdateAddressVariables {
    addressId: string;
    payload: UpdateAddressPayload;
}

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            addressId,
            payload,
        }: UpdateAddressVariables) =>
            updateAddress(addressId, payload),

        onSuccess: (address) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADDRESSES.ALL,
            });

            queryClient.setQueryData(
                QUERY_KEYS.ADDRESSES.DETAIL(address.id),
                address
            );
        },
    });
};