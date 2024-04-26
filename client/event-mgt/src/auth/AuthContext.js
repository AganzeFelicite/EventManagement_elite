import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (newToken, user) => {
    setToken(newToken);
  };
  const loginUser = (user) => {
    setUserInfo(user);
  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
