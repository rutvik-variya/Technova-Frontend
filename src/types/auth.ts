export type UserRole = "USER" | "ADMIN";

export interface User {
    id: string,
    name: string,
    email: string,
    role: UserRole,
}


export interface LoginInput {
    email: string,
    password: string
}

export interface RegisterInput {
    name: string,
    email: string,
    password: string
}

export interface AuthResponse {
    user: User
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    data: null;
}


