
import { API_ENDPOINTS } from "@/constants/api";
import { getRequest, patchRequest } from "@/lib/api-request";

import type {
    AdminShippingMethod,
    AdminShippingUpdatePayload,
    ShippingMethodType,
} from "@/types/admin-shipping";


export const getAdminShippingMethods = async (): Promise<
    AdminShippingMethod[]
> => {
    const response = await getRequest<AdminShippingMethod[]>(
        API_ENDPOINTS.ADMIN.ADMIN_SHIPPING.LIST
    );

    return response.data;
};

export const updateAdminShippingMethod = async (
    method: ShippingMethodType,
    payload: AdminShippingUpdatePayload
): Promise<AdminShippingMethod> => {
    const response = await patchRequest<
        AdminShippingMethod,
        AdminShippingUpdatePayload
    >(
        API_ENDPOINTS.ADMIN.ADMIN_SHIPPING.UPDATE(method),
        payload
    );

    return response.data;
};
