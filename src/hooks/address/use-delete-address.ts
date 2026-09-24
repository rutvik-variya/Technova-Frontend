"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { deleteAddress } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressId: string) =>
            deleteAddress(addressId),

        onSuccess: (_, addressId) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ADDRESSES.ALL,
            });

            queryClient.removeQueries({
                queryKey:
                    QUERY_KEYS.ADDRESSES.DETAIL(addressId),
            });
        },
    });
};