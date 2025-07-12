import { useEffect, useState } from "react";

export const useFetch = <T>(
  url: string,
  options?: RequestInit,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const result = await res.json();
        if (isMounted) setData(result);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};
