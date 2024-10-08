import { useRef } from "react";

const useCache = (key, expiration) => {
  const cache = useRef(JSON.parse(localStorage.getItem("key")) || null);

  const getCache = (query) => {
    const cachedData = cache.current[query];

    if (cachedData) {
      const { timestamp, data } = cachedData;

      if (Date.now().getTime() - timestamp < expiration) {
        return data;
      } else {
        delete cache.current[query];
        localStorage.setItem(key, JSON.stringify(cache.current));
      }
    }
    return null;
  };

  const setCache = (query, data) => {
    const timestamp = new Date().getTime();
    cache.current[query] = { timestamp, data };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  return { getCache, setCache };
};

export default useCache;
