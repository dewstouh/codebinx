import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const getAuthToken = (): string | null => {
    try {
        const token = localStorage.getItem('authToken');
        return token;
    } catch (error) {
        console.warn('Error reading authToken from localStorage:', error);
        return null;
    }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAuthToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;