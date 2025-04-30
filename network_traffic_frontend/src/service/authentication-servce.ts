import {
    LOGIN,
    LOGOUT,
    REGISTER,
    REFRESH_TOKEN,
    USER_ACCOUNT,
    USER_UPDATE_ACCOUNT,
    USER_UPDATE_PASSWORD,
} from "@/config/api-config";
import { handleErrorResponse } from "@/handler/error-handler";
import {
    UserLogin,
    UserAccount,
    UserRegister,
    UserPassword,
    UserAuthenticationToken,
} from "@/model/user";
import axios, { AxiosResponse } from "axios";
import { fetchCsrfToken } from "@/service/csrf-token-service";
import Cookies from "js-cookie";


export const registerAPI = async (
    register: UserRegister
): Promise<{ data: AxiosResponse<UserAuthenticationToken> } | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const data: AxiosResponse<UserAuthenticationToken> = await axios.post<UserAuthenticationToken>(
            REGISTER,
            register,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrf
                },
                withCredentials: true,
            }
        );

        return { data };
    } catch (error: any) {
        handleErrorResponse(error);
    }
}

export const loginAPI = async (
    login: UserLogin
): Promise<{ data?: AxiosResponse<UserAuthenticationToken> } | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const data: AxiosResponse<UserAuthenticationToken> = await axios.post<UserAuthenticationToken>(
            LOGIN,
            login,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrf,
                },
                withCredentials: true,
            }
        );

        return { data };
    }catch (error: any) {
        handleErrorResponse(error);
    }
};

export const logoutAPI = async (token: string) => {
    try {
        await axios.post(
            LOGOUT,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

export const UserAccountAPI = async (
    token: string
): Promise<{ user: AxiosResponse<UserAccount> } | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const user: AxiosResponse<UserAccount> = await axios.get<UserAccount>(
            USER_ACCOUNT, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-XSRF-TOKEN": csrf
            },
            withCredentials: true,
        });

        return { user };
    } catch (error: any) {
        handleErrorResponse(error);
    }
}

export const UpdateUserAccountAPI = async (
    token: string,
    account: UserAccount,
): Promise<AxiosResponse<UserAuthenticationToken> | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.put<UserAuthenticationToken>(
            USER_UPDATE_ACCOUNT,
            account,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-XSRF-TOKEN": csrf,
                },
                withCredentials: true,
            });

        return response;
    } catch (error: any) {
        handleErrorResponse(error);
    }
};

export const UpdatePasswordAPI = async (
    token: string,
    password: UserPassword,
): Promise<AxiosResponse<UserAuthenticationToken> | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.put<UserAuthenticationToken>(
            USER_UPDATE_PASSWORD,
            password,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-XSRF-TOKEN": csrf,
                },
                withCredentials: true,
            });

        return response;
    } catch (error: any) {
        handleErrorResponse(error);
    }
}

export const refreshTokenAPI = async (token: string) => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.get(REFRESH_TOKEN, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-XSRF-TOKEN": csrf
            },
            withCredentials: true,
        });

        return response;
    } catch (error) {
        handleErrorResponse(error);
    }
};