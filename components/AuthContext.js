import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(Cookies.get("token-giti") || "null");
  const [expirationDate, setExpirationDate] = useState(
    Cookies.get("expiration-giti") || "null"
  );

  const handleSetting = (t, e) => {
    setExpirationDate(e);
    Cookies.set("token-giti", t);
    setToken(t);
    Cookies.set("expiration-giti", e);
  };
  return (
    <AuthContext.Provider value={{ token, expirationDate, handleSetting }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
