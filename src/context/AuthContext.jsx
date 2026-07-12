import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
      setCurrentUser(res.data);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const loginWithGoogle = async (credential) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
      credential,
    });
    setCurrentUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);