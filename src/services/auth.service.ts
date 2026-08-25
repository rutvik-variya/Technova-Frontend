import { API_ENDPOINTS } from "@/constants/api";
import { getRequest, postRequest } from "@/lib/api-request";
import { AuthResponse, LoginInput, RegisterInput, User } from "@/types/auth";


export const registerUser = async (
    data: RegisterInput
) => {
    return postRequest<AuthResponse, RegisterInput>(API_ENDPOINTS.AUTH.REGISTER, data)
}

export const loginUser = async (
    data: LoginInput
) => {
    return postRequest<AuthResponse, LoginInput>(API_ENDPOINTS.AUTH.LOGIN, data)
}

export const logoutUser = async () => {
    return postRequest<null>(
        API_ENDPOINTS.AUTH.LOGOUT,
    );
};

export const getCurrentUser = async () => {
    return getRequest<User>(
        API_ENDPOINTS.AUTH.ME,
    );
};

