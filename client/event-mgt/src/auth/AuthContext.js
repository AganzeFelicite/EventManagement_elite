import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (newToken, user) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUserInfo(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserInfo(null);
    setIsAuthenticated(false);
  };
  const loginUser = (user) => {
    setUserInfo(user);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userInfo, isAuthenticated, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
