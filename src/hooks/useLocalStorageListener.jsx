import { useEffect } from "react";

export default function useLocalStorageListener(key, callback) {
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function (k, v) {
      const result = originalSetItem.apply(this, arguments);
      if (k === key) callback(v);
      return result;
    };

    localStorage.removeItem = function (k) {
      const result = originalRemoveItem.apply(this, arguments);
      if (k === key) callback(null);
      return result;
    };

    const onStorageChange = (e) => {
      if (e.key === key) {
        callback(e.newValue);
      }
    };
    window.addEventListener("storage", onStorageChange);

    return () => {
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
      window.removeEventListener("storage", onStorageChange);
    };
  }, [key, callback]);
}
