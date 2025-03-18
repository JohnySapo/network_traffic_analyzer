import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile, UserProfileToken } from "@/model/User";
import { loginAPI, logoutAPI, registerAPI } from "@/service/AuthService";
import { CustomJwtPayload } from "@/entity/CustomJwtPayload";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (username: string, email: string, password: string, confirmPassword: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    isReady: boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            try {
                const decodedToken: CustomJwtPayload = jwtDecode(storedToken);
                setUser({
                    username: decodedToken.sub,
                    role: decodedToken.role,
                });
                setToken(storedToken);
            } catch (error) {
                localStorage.removeItem("authToken");
            }
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
    ) => {
        try {
            const response = await registerAPI(username, email, password, confirmPassword);
            if (response && response.data && response.data.status === 200 && response.data.data) {
                const userProfileToken: UserProfileToken = response.data.data;
                const decodedToken: CustomJwtPayload = jwtDecode(userProfileToken.token);
                setUser({
                    username: decodedToken.sub,
                    role: decodedToken.role,
                });
                setToken(userProfileToken.token);
                localStorage.setItem("authToken", userProfileToken.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const loginUser = async (username: string, password: string) => {
        try {
            const response = await loginAPI(username, password);
            if (response && response.data && response.data.status === 200 && response.data.data) {
                const userProfileToken: UserProfileToken = response.data.data;
                const decodedToken: CustomJwtPayload = jwtDecode(userProfileToken.token);
                setUser({
                    username: decodedToken.sub,
                    role: decodedToken.role,
                });
                setToken(userProfileToken.token);
                localStorage.setItem("authToken", userProfileToken.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const isLoggedIn = () => {
        return !!localStorage.getItem("authToken");
    };

    const logout = async () => {
        if (token) {
            try {
                await logoutAPI(token);
            } catch (error) {
                console.error("Logout API error:", error);
            }
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            navigate("/");
        }
    };

    return (
        <UserContext.Provider
            value={{ loginUser, registerUser, user, token, logout, isLoggedIn, isReady }}
        >
            {children}
        </UserContext.Provider>
    );
};


export const useAuth = () => React.useContext(UserContext);