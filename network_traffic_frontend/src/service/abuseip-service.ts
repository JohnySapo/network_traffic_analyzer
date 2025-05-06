import {
  ABUSEIP_BLACKLIST_HEADER,
  ABUSEIP_CHECK_IP_ADDRESS,
  ABUSEIP_BLACKLIST_IP_ADDRESSES,
}from "@/config/api-config";
import {
  BlacklistHeaderModel,
  BlacklistPagingModel
} from "@/model/blacklist";
import { handleErrorResponse } from "@/handler/error-handler";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { fetchCsrfToken } from "@/service/csrf-token-service";
import { CheckIPResponse } from "@/model/check";

export const BlacklistHeaderAPI = async (
  token: string
): Promise<AxiosResponse<BlacklistHeaderModel> | undefined> => {
  try {
    await fetchCsrfToken();
    const csrf = Cookies.get("XSRF-TOKEN");
    const response = await axios.get<BlacklistHeaderModel>(
      ABUSEIP_BLACKLIST_HEADER,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-XSRF-TOKEN": csrf
        },
        withCredentials: true,
      });

    return response;
  } catch (error: any) {
    handleErrorResponse(error);
  }
}

export const BlacklistTableAPI = async (
  token: string,
  page: number,
  size: number,
  sort: string,
  filters?: {
    countryCode?: string;
    abuseScore?: number;
    lastReportedDate?: string;
  }
): Promise<AxiosResponse<BlacklistPagingModel> | undefined> => {
  try {
    await fetchCsrfToken();
    const csrf = Cookies.get("XSRF-TOKEN");

    const response = await axios.get<BlacklistPagingModel>(
      ABUSEIP_BLACKLIST_IP_ADDRESSES,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrf,
        },
        withCredentials: true,
        params: {
          page: page - 1,
          size,
          sort,
          ...filters,
        },
      }
    );

    return response;
  } catch (error: any) {
    handleErrorResponse(error);
  }
}

export const CheckIPAddressAPI = async (
  token: string,
  ipAddress: string,
  page: number = 0,
  size: number = 8,
): Promise<AxiosResponse<CheckIPResponse> | undefined> => {
  try {
    await fetchCsrfToken();
    const csrf = Cookies.get("XSRF-TOKEN");

    const response = await axios.get<CheckIPResponse>(
      ABUSEIP_CHECK_IP_ADDRESS,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrf,
        },
        withCredentials: true,
        params: {
          page: page - 1,
          size,
          ipAddress
        },
      }
    );

    return response;
  } catch (error: any) {
    handleErrorResponse(error);
  }
}