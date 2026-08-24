import axios from "axios";

export class ApiError extends Error {
    statusCode?: number;
    errors?: Record<string, string[]>;

    constructor(
        message: string,
        statusCode?: number,
        errors?: Record<string, string[]>,
    ) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export const getApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        const response = error.response;

        return new ApiError(
            response?.data?.message ||
            error.message ||
            "Something went wrong",
            response?.status,
            response?.data?.errors,
        );
    }

    if (error instanceof ApiError) {
        return error;
    }

    if (error instanceof Error) {
        return new ApiError(error.message);
    }

    return new ApiError("Something went wrong");
};