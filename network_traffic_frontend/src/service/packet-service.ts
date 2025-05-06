import {
    PACKET_CAPTURE_START,
    PACKET_CAPTURE_LOG_REPORT,
} from "@/config/api-config";
import { handleErrorResponse } from "@/handler/error-handler";
import { PacketCaptureModel } from "@/model/packet";
import axios, { AxiosResponse } from "axios";
import { fetchCsrfToken } from "./csrf-token-service";
import Cookies from "js-cookie";

export const PacketCaptureStartAPI = async (
    token: string
): Promise<AxiosResponse<string> | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.get<string>(
            PACKET_CAPTURE_START,
            {
                headers: {
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

export const PacketCaptureLoggerReportAPI = async (
    token: string
): Promise<AxiosResponse<PacketCaptureModel[]> | undefined> => {
    try {
        await fetchCsrfToken();
        const csrf = Cookies.get("XSRF-TOKEN");
        const response = await axios.get<PacketCaptureModel[]>(
            PACKET_CAPTURE_LOG_REPORT,
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