import 
React, 
{ 
    createContext, 
    useEffect, 
    useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { 
    UserRole, 
    UserLogin, 
    UserAccount, 
    UserRegister,
    UserPassword, 
    UserAuthenticationToken, 
} from "@/model/User";
import { 
    loginAPI, 
    logoutAPI, 
    registerAPI, 
    UserAccountAPI,
    UpdatePasswordAPI, 
    UpdateUserAccountAPI, 
} from "@/service/AuthService";
import { CustomJwtPayload } from "@/entity/CustomJwtPayload";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
    user: UserAccount | null;
    role: UserRole | null;
    token: string | null;
    isReady: boolean;
    logout: () => void;
    isLoggedIn: () => boolean;
    loginUser: (data: UserLogin) => Promise<void>;
    registerUser: (data: UserRegister) => Promise<void>;
    updateProfile: (data: UserAccount) => Promise<void>;
    updatePassword: (data: UserPassword) => Promise<void>;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [user, setUser] = useState<UserAccount | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                try {
                    const decodedToken: CustomJwtPayload = jwtDecode(storedToken);
                    const data = await UserAccountAPI(storedToken);
                    setUser(data.user.data);
                    setRole({ role: decodedToken.role })
                    setToken(storedToken);
                } catch (error) {
                    localStorage.removeItem("authToken");
                }
            }
            setIsReady(true);
        }
        initialize();
    }, []);

    const registerUser = async (data: UserRegister) => {
        try {
            console.log(data);
            const response = await registerAPI(data);
            console.log(response?.data);
            if (response && response.data && response.data.status === 200 && response.data.data) {
                const authentication: UserAuthenticationToken = response.data.data;
                const decodedToken: CustomJwtPayload = jwtDecode(authentication.token);
                const data = await UserAccountAPI(authentication.token);
                console.log("User data: ", data);
                setUser(data.user.data);
                setRole({ role: decodedToken.role })
                setToken(authentication.token);
                localStorage.setItem("authToken", authentication.token);
                navigate("/dashboard");
            }
        } catch (error: any) {
            throw error;
        }
    };

    const loginUser = async (data: UserLogin) => {
        try {
            const response = await loginAPI(data);
            if (response && response.data && response.data.status === 200 && response.data.data) {
                const authentication: UserAuthenticationToken = response.data.data;
                const decodedToken: CustomJwtPayload = jwtDecode(authentication.token);
                const data = await UserAccountAPI(authentication.token);
                console.log("User data: ", data);
                setUser(data.user.data);
                setRole({ role: decodedToken.role });
                setToken(authentication.token);
                localStorage.setItem("authToken", authentication.token);
                navigate("/dashboard");
            }
        } catch (error: any) {
            throw error;
        }
    };

    const updateProfile = async (data: UserAccount) => {
        try {
            const response = await UpdateUserAccountAPI(token, data);
            if (response && response.data && response.status === 200) {
                const authentication: UserAuthenticationToken = response.data;
                const decodedToken: CustomJwtPayload = jwtDecode(authentication.token);
                const data = await UserAccountAPI(authentication.token);
                setUser(data!.user.data)
                setToken(authentication.token);
                localStorage.setItem("authToken", authentication.token);
                navigate("/dashboard/settings/account");
            }
        } catch (error: any) {
            throw error;
        }
    }

    const updatePassword = async (data: UserPassword) => {
        try {
            const response = await UpdatePasswordAPI(token!, data);
            console.log(response);
            if(response && response.data && response.status === 200) {
                const authentication: UserAuthenticationToken = response.data;
                const decodedToken: CustomJwtPayload = jwtDecode(authentication.token);
                const data = await UserAccountAPI(authentication.token);
                setUser(data!.user.data)
                setToken(authentication.token);
                localStorage.setItem("authToken", authentication.token);
                navigate("/dashboard/settings/reset-password");
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

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
            value={{ loginUser, registerUser, user, role, token, logout, isLoggedIn, isReady, updateProfile, updatePassword }}
        >
            {children}
        </UserContext.Provider>
    );
};


export const useAuth = () => React.useContext(UserContext);