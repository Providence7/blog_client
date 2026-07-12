// src/context/AdminAuthContext.jsx
// Separate from context/AuthContext.jsx (Google auth for commenters).
// No token is ever stored in JS — the admin_token cookie is httpOnly.
import { createContext, useContext, useState, useEffect } from "react";
import adminApi from "../lib/adminApi.js";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await adminApi.get("/me");
      setAdmin(res.data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // Call after a successful /login response — the cookie is already set by
  // the server at that point, this just re-syncs local state with it.
  const login = async () => {
    await fetchMe();
  };

  const logout = () => {
    setAdmin(null);
  };

  const isLoggedIn = !!admin;

  return (
    <AdminAuthContext.Provider value={{ admin, isLoggedIn, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);