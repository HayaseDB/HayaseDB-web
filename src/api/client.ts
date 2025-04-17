import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    withCredentials?: boolean;
    getAccessToken?: () => string | null;
    onUnauthorized?: () => void;
    onError?: (error: ApiError) => void;
}

export interface ApiError {
    status?: number;
    message: string;
    data?: any;
    isNetworkError: boolean;
}

export class ApiClient {
    private instance: AxiosInstance;

    constructor(private config: ApiClientConfig) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...config.headers
        };

        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 10000,
            withCredentials: config.withCredentials || false,
            headers: defaultHeaders
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
                const token = this.config.getAccessToken?.();
                if (token) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`
                    };
                }
                return config as InternalAxiosRequestConfig;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                const apiError: ApiError = {
                    status: error.response?.status,
                    message: error.message,
                    data: error.response?.data,
                    isNetworkError: !error.response && !!error.request
                };

                if (apiError.status === 401 && this.config.onUnauthorized) {
                    this.config.onUnauthorized();
                }

                if (this.config.onError) {
                    this.config.onError(apiError);
                }

                return Promise.reject(apiError);
            }
        );
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.instance.request<T>(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async get<T>(url: string, params?: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url, params });
    }

    async post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    async put<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    async patch<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }

    async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

export const createApiClient = (config: ApiClientConfig): ApiClient => new ApiClient(config);
