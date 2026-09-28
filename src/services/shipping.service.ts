import { getRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/constants/api";
import type { ShippingMethod } from "@/types/shipping";

export const getShippingMethods = async (
    subtotal: number
): Promise<ShippingMethod[]> => {
    const response = await getRequest<ShippingMethod[]>(
        API_ENDPOINTS.SHIPPING.METHODS,
        { subtotal }
    );

    return response.data;
};