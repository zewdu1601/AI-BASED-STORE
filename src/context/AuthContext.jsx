import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
      if (userInfo?.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login', { username, password });
    
    // Look up persistent data using username or email as key
    const userKey = data.username || data.email;
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '{}');
    const enrichedData = { ...data, ...(usersDB[userKey] || {}) };
    
    setUser(enrichedData);
    localStorage.setItem('userInfo', JSON.stringify(enrichedData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return enrichedData;
  };

  const register = async (name, username, email, password, role) => {
    const { data } = await axios.post('/api/auth/register', { name, username, email, password, role });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const updateUser = (updatedData) => {
    if (!user) return;
    
    const newUserInfo = { ...user, ...updatedData };
    setUser(newUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    
    // Use username or email as unique key for persistence
    const userKey = user.username || user.email;
    if (userKey) {
      const usersDB = JSON.parse(localStorage.getItem('usersDB') || '{}');
      usersDB[userKey] = { ...usersDB[userKey], ...updatedData };
      localStorage.setItem('usersDB', JSON.stringify(usersDB));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
