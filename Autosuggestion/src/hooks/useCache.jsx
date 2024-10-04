import { useRef } from "react";

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

const useCache = (key, expiration) => {
  const cache = useRef(JSON.parse(localStorage.getItem(key)) || {});

  const setCache = (query, data) => {
    const timestamp = getCurrentTimestamp();
    cache.current[query] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query) => {
    const cachedData = cache.current[query];
    if (cachedData) {
      const { data, timestamp } = cachedData;
      if (getCurrentTimestamp() - timestamp < expiration) {
        return data;
      } else {
        delete cache.current[query];
        localStorage.setItem(key, JSON.stringify(cache.current));
      }
    }
    return null;
  };

  return { setCache, getCache };
};

export default useCache;
