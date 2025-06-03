import api from './apiService';
import type { IUserResponse, IUserAuthData } from '@codebinx/shared'; // O la ruta local si no usas shared aún para esto
 // O la ruta local si no usas shared aún para esto

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials extends LoginCredentials {
    username: string;
}

interface AuthControllerResponse {
    message: string;
    user: IUserResponse;
    token: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<IUserAuthData> => {
    const response = await api.post<AuthControllerResponse>('/auth/login', credentials);
    return { user: response.data.user, token: response.data.token };
};

export const registerUser = async (credentials: RegisterCredentials): Promise<IUserAuthData> => {
    const response = await api.post<AuthControllerResponse>('/auth/register', credentials);
    return { user: response.data.user, token: response.data.token };
};

export const getProfile = async (): Promise<IUserResponse> => {
    const response = await api.get<{ user: IUserResponse }>('/auth/profile');
    return response.data.user;
};