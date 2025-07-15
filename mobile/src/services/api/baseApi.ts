import { API_ENDPOINTS } from '@/constants/storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StorageService } from '../storage';

class BaseApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_ENDPOINTS.BASE_URL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        })

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use(
            async (config) => {
                const token = await StorageService.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config;
            },
            (onerror) => {
                return Promise.reject(onerror);
            }
        )

        this.api.interceptors.response.use(
            (response) => {
                async (error) => {
                    const originalRequest = error.config;

                    if (error.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;

                        try {
                            const refreshToken = await StorageService.getRefreshToken();
                            if (!refreshToken) {
                                throw new Error("refreshToken Not Found!")
                            }

                            const response = axios.post(
                                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, { refreshToken }
                            )
                            const { accessToken, refreshToken: newRefreshToken } = (await response).data;

                            await StorageService.setAccessToken(accessToken);

                            if (newRefreshToken) {
                                await StorageService.setRefreshToken(newRefreshToken)
                            }
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`

                            return this.api(originalRequest)
                        } catch (error) {
                            await StorageService.clearAll();

                            return Promise.reject(error as Error)
                        }
                    }
                }
            }
        )

    }

    // HTTP Methods
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(url, config);
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.patch<T>(url, data, config);
    }
}

export const api = new BaseApiService();