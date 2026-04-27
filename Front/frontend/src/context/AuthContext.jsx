// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Check token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ name: "Admin User" }); // future me API se user fetch kar sakte ho
    }

    setLoading(false);
  }, []);

  // ✅ Login (token already save hoga Login.jsx me)
  const login = (userData) => {
    setUser(userData);
  };

  // ❌ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};