import { useState } from "react";

// TODO: Currently supports get method only
const useFetch = (url) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Check if async callback function can be provided to useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setResult(null);
      setLoading(null);

      try {
        const response = await fetch.get(url);
        if (!response.ok) {
          throw new Error("API response failed!");
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();

    return () => {
      setLoading(false);
      setResult(null);
      setLoading(null);
    };
  }, [url]);
  return { result, loading, error };
};

export default useFetch;
