import { CSRF_TOKEN } from "@/config/api-config";
import { handleErrorResponse } from "@/handler/error-handler";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchCsrfToken = async () => {
    try {
        await axios.get(
            CSRF_TOKEN, 
            { 
                withCredentials: true
            });
        return Cookies.get("XSRF-TOKEN");
    } catch (error) {
        handleErrorResponse(error);
    }
};