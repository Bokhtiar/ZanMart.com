import { privateRequest } from '@/config/axios.config';
import { useState, useCallback, useEffect } from 'react';

const useDynamicIdFetch = (idOrSlug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1️⃣ Memoized fetch function
  const fetchData = useCallback(async () => {
    if (!idOrSlug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await privateRequest.get(`/banner-product/${idOrSlug}`); 
      setData(response?.data?.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [idOrSlug]);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useDynamicIdFetch;
