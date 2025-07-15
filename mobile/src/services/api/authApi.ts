import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/user";
import { api } from "./baseApi";
import { API_ENDPOINTS } from "@/constants/storage";
import { StorageService } from "../storage";
import { User } from "@/types/auth";

export class AuthApiService {
    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );
        return response.data;
    }

    static async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = api.post<RegisterResponse>(API_ENDPOINTS.BASE_URL, data);
        return (await response).data
    }


    static async logout(): Promise<void> {
        const refreshToken = await StorageService.getRefreshToken();
        if (refreshToken) {
            await api.post(API_ENDPOINTS.BASE_URL, { refreshToken })
        }
        await StorageService.clearAll();
    }

    static async getUser(): Promise<{ data: User }> {
        const response = await api.post<{ data: User }>(API_ENDPOINTS.AUTH.ME);
        return response.data
    }

    static async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const response = await api.post<{ accessToken: string; refreshToken: string }>(
            API_ENDPOINTS.AUTH.REFRESH,
            { refreshToken }
        );
        return response.data;
    }

}