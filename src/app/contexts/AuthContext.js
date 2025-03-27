import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (id, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);

    await queryClient.invalidateQueries(['user-data']);
    await queryClient.invalidateQueries(['user-pets']);

    queryClient.refetchQueries(['user-data']);
    queryClient.refetchQueries(['user-pets']);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
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
