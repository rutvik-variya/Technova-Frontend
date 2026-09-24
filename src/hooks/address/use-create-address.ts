"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { createAddress } from "@/services/address.service";
import { QUERY_KEYS } from "@/constants/query-keys";

import type { CreateAddressPayload } from "@/types/address";

export const useCreateAddress = () => {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            payload: CreateAddressPayload
        ) => createAddress(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:
                    QUERY_KEYS.ADDRESSES.ALL,
            });
        },
    });
};