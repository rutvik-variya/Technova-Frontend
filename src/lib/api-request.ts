import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export const getRequest = async <T>(
    url: string,
    params?: Record<string, unknown>,
): Promise<ApiResponse<T>> => {
    const response = await api.get<ApiResponse<T>>(url, {
        params,
    });

    return response.data;
};


export const postRequest = async <T, B = unknown>(
    url: string,
    body?: B,
): Promise<ApiResponse<T>> => {
    const response = await api.post<ApiResponse<T>>(
        url,
        body,
    );

    return response.data;
};


export const putRequest = async <T, B = unknown>(
    url: string,
    body?: B,
): Promise<ApiResponse<T>> => {
    const response = await api.put<ApiResponse<T>>(
        url,
        body,
    );

    return response.data;
};


export const patchRequest = async <T, B = unknown>(
    url: string,
    body?: B,
): Promise<ApiResponse<T>> => {
    const response = await api.patch<ApiResponse<T>>(
        url,
        body,
    );

    return response.data;
};

export const deleteRequest = async <T>(
    url: string,
): Promise<ApiResponse<T>> => {
    const response = await api.delete<ApiResponse<T>>(
        url,
    );

    return response.data;
};


