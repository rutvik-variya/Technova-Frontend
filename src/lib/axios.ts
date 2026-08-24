import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000,
})


api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);