import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (id, token) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userId', id);
    setIsAuthenticated(true);

    await queryClient.invalidateQueries(['user-data']);
    await queryClient.invalidateQueries(['user-pets']);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);

    queryClient.removeQueries(['user-data']);
    queryClient.removeQueries(['user-pets']);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
