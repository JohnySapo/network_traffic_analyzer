const URL = import.meta.env.VITE_API_PROXY;

const API_ENDPOINTS = {
    CSRF_TOKEN: `${URL}/auth/csrf-token`,
    REGISTER: `${URL}/auth/register`,
    LOGIN: `${URL}/auth/login`,
    LOGOUT: `${URL}/auth/logout`,
    REFRESH_TOKEN: `${URL}/auth/refresh-token`,
    USER_ACCOUNT: `${URL}/user/account`,
    USER_UPDATE_ACCOUNT: `${URL}/user/update-account`,
    USER_UPDATE_PASSWORD: `${URL}/user/update-password`,
    ABUSEIP_BLACKLIST_IP_ADDRESSES: `${URL}/abuseIP/blacklist`,
    ABUSEIP_BLACKLIST_HEADER: `${URL}/abuseIP/header-report`,
    ABUSEIP_CHECK_IP_ADDRESS: `${URL}/abuseIP/check`,
    PACKET_CAPTURE_START: `${URL}/network-packet/start-packet`,
    PACKET_CAPTURE_LOG_REPORT: `${URL}/network-packet/packet-report`,
}

export const { 
    LOGIN, 
    LOGOUT, 
    REGISTER,
    CSRF_TOKEN,
    REFRESH_TOKEN, 
    USER_ACCOUNT, 
    USER_UPDATE_ACCOUNT,
    USER_UPDATE_PASSWORD,
    ABUSEIP_BLACKLIST_IP_ADDRESSES,
    ABUSEIP_BLACKLIST_HEADER,
    ABUSEIP_CHECK_IP_ADDRESS,
    PACKET_CAPTURE_START,
    PACKET_CAPTURE_LOG_REPORT,
} = API_ENDPOINTS;