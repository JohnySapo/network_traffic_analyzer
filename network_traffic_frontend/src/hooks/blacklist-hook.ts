import { useAuth } from "@/context/user-authentication";
import { BlacklistHeaderModel, BlacklistModel } from "@/model/blacklist";
import { BlacklistHeaderAPI, BlacklistTableAPI } from "@/service/abuseip-service";
import {useEffect, useState } from "react";

export const BlacklistHeader = () => {
  const { token } = useAuth();
  const [ data, setData ] = useState<BlacklistHeaderModel | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await BlacklistHeaderAPI(token!);
        if(response?.data) {
          setData(response.data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  return { data, loading, error };
}


export const BlacklistData = (
  page: number,
  size: number = 12,
  sort: string = "lastReportedAt,desc",
  filters?: {
    countryCode?: string;
    abuseScore?: number;
    lastReportedDate?: string;
  }
) => {
  const { token } = useAuth();
  const [data, setData] = useState<BlacklistModel[]>([]);
  const [items, setItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await BlacklistTableAPI(token!, page, size, sort, filters);
        if (response) {
          setData(response.data.content);
          setItems(response.data.totalElements);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, sort, JSON.stringify(filters)]);

  return { data, items, loading, error };
};