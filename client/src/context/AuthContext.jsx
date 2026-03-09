import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('bakeryUser'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const registerUser = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('bakeryUser', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      localStorage.setItem('bakeryUser', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('bakeryUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
