import { privateRequest } from "@/config/axios.config";
import { useState, useCallback, useEffect } from "react";

const useLocationFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await privateRequest(url);
      setData(response?.data?.data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]); // dependency on url 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}; 
export default useLocationFetch;
