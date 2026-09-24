"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { setDefaultAddress } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useSetDefaultAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressId: string) =>
            setDefaultAddress(addressId),

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