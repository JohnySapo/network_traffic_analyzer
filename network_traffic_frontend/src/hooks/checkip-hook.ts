import { useAuth } from "@/context/user-authentication";
import { CheckIPResponse } from "@/model/check";
import { CheckIPAddressAPI } from "@/service/abuseip-service";
import { useEffect, useState } from "react";

export const CheckIPAddress = (
    ipAddress: string,
    page: number = 0,
    size: number = 8,
) => {
    const { token } = useAuth();
    const [ data, setData ] = useState<CheckIPResponse | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!ipAddress || ipAddress.trim() === "") return;
    
            setLoading(true);
            setError(null);
    
            try {
                const response = await CheckIPAddressAPI(token!, ipAddress, page, size);
                if (response?.data) {
                    setData(response.data);
                }
            } catch (error: any) {
                setError(error.message || "Unknown Error");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [ipAddress, token, page, size]);

    return { data, loading, error }
}