import { API_ENDPOINTS } from "@/constants/api";
import { getRequest, patchRequest, postRequest } from "@/lib/api-request";
import { AuthResponse, ChangePasswordPayload, LoginInput, RegisterInput, User } from "@/types/auth";


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


export const changePassword = async (
    payload: ChangePasswordPayload
): Promise<null> => {
    const response = await patchRequest<
        null,
        ChangePasswordPayload
    >(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        payload
    );

    return response.data;
};
