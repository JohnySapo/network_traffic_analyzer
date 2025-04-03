const URL = import.meta.env.VITE_API_PROXY;

const API_ENDPOINTS = {
    REGISTER: `${URL}/auth/register`,
    LOGIN: `${URL}/auth/login`,
    LOGOUT: `${URL}/auth/logout`,
    REFRESH_TOKEN: `${URL}/auth/refresh-token`,
    USER_ACCOUNT: `${URL}/user/account`,
    USER_UPDATE_ACCOUNT: `${URL}/user/update-account`,
    USER_UPDATE_PASSWORD: `${URL}/user/update-password`,
}

export const { 
    LOGIN, 
    LOGOUT, 
    REGISTER, 
    REFRESH_TOKEN, 
    USER_ACCOUNT, 
    USER_UPDATE_ACCOUNT,
    USER_UPDATE_PASSWORD
} = API_ENDPOINTS;