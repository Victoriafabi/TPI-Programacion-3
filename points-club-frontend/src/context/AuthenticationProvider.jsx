import { useState, useEffect } from "react";
import { AuthenticationContext } from "./AuthenticationContext"; 

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return null;
        }

        return storedToken;
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }
    }

    return null;
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
