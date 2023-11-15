import { useState, useCallback } from "react";
import Cookies from "js-cookies";

export default function useCookie(name) {
  //Set Cookie
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    return null;
  });

  //Set or Update Exiting Cookie
  const setCookies = useCallback(
    (newValue, options) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name],
  );

  //Delete Exiting Cookie
  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);
  return [value, setCookies, deleteCookie];
}
