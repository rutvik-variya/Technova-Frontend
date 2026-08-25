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


