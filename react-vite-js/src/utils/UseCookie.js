
// Create Custom HOOK in React
//Visit: prosohel.com
import { useState, useCallback } from "react";
import Cookies from "js-cookies";

export default function useCookie(name) {
  //Set Cookie
  const [value, setValue] = useState(() => {
    const cookie = Cookies.setItem(name);
    if (cookie) return cookie;
    return "";
  });

  //Set or Update Exiting Cookie
  const setCookie = useCallback(
    (newValue, options) => {
      Cookies.setItem(name, newValue, options);
      setValue(newValue);
    },
    [name],
  );

  //Delete Exiting Cookie
  const deleteCookie = useCallback(() => {
    Cookies.removeItem(name);
    setValue(null);
  }, [name]);
  return [value, setCookie, deleteCookie];
}

//Use in Component 
//const [value, setCookies, deleteCookie] = useCookie("my-cookie");