import { API_ENDPOINTS } from "@/constants/api";
import { getRequest } from "@/lib/api-request"
import { Product } from "@/types/product"

export const getFeaturedProducts = async () => {
    return getRequest<Product[]>(API_ENDPOINTS.PRODUCTS.FEATURED);
}


