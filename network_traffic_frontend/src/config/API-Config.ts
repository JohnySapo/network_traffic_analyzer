const URL = import.meta.env.VITE_API_PROXY;

const API_ENDPOINTS = {
    REGISTER: `${URL}/auth/register`,
    LOGIN: `${URL}/auth/login`,
    LOGOUT: `${URL}/auth/logout`,
    REFRESH_TOKEN: `${URL}/auth/refresh-token`,
    USER_INFO: `${URL}/user/hello`
}

export const { LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN, USER_INFO } = API_ENDPOINTS;