import { LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN } from "@/config/API-Config";
import { UserProfileToken } from "@/model/User";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const registerAPI = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
): Promise<{ data: AxiosResponse<UserProfileToken> } | undefined> => {
    try {
        const csrf = Cookies.get("XSRF-TOKEN");
        const data: AxiosResponse<UserProfileToken> = await axios.post<UserProfileToken>(
            REGISTER,
            { username, email, password, confirmPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrf
                },
                withCredentials: true,
            }
        );

        return { data };
    } catch (error) {

    }
}

export const loginAPI = async (
    username: string,
    password: string
): Promise<{ data?: AxiosResponse<UserProfileToken> } | undefined> => {
    try {
        const csrf = Cookies.get("XSRF-TOKEN");
        const data: AxiosResponse<UserProfileToken> = await axios.post<UserProfileToken>(
            LOGIN,
            { username: username, password: password },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrf,
                },
                withCredentials: true,
            }
        );

        return { data };
    } catch (error) {

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
    } catch (error) {
        console.error("Logout API failed:", error);
        throw error;
    }
};

export const refreshTokenAPI = async (token: string) => {
    try {
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
        return false;
    }
};

export const hello = async(token: string) => {
    try {
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.get("/network/user/hello", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-XSRF-TOKEN": csrf
            },
            withCredentials: true,
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}