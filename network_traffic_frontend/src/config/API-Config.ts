const URL = import.meta.env.VITE_API_PROXY;

const API_ENDPOINTS = {
    REGISTER: `${URL}/auth/register`,
    LOGIN: `${URL}/auth/login`,
    LOGOUT: `${URL}/auth/logout`,
    REFRESH_TOKEN: `${URL}/auth/refresh-token`,
}

export const { LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN } = API_ENDPOINTS;