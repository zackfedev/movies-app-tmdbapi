import { useState, useEffect, useCallback } from "react";

export const useFetch = (urls: string[]) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    try {
      const urlsList = urls.map((url) => fetch(url).then((res) => res.json()));
      const response = await Promise.all(urlsList);
      setData(response);
    } catch (e) {
      setError(e);
    }

    setIsLoading(false);
  }, [urls]);

  useEffect(() => {
    fetchAPI();
  }, []);

  return { data, error, isLoading };
};
