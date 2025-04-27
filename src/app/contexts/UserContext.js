'use client';
import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const { data: user, isLoading } = useQuery({
    queryKey: ['user-data', userId],
    queryFn: async () => {
      if (!userId || !token) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/private/api/users/get-public-data/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data.userData;
    },
    enabled: !!userId,
    staleTime: Infinity,
    cacheTime: 60 * 60 * 1000,
  });

  const { data: pets = [] } = useQuery({
    queryKey: ['user-pets', userId],
    queryFn: async () => {
      if (!userId || !token) return [];

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PETS_API_URL}/private/api/pets/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return JSON.parse(response.data['user-pets']);
    },
    enabled: !!userId,
    staleTime: Infinity,
    cacheTime: 60 * 60 * 1000,
  });

  return (
    <UserContext.Provider value={{ user, pets, isLoading, queryClient }}>
      {children}
    </UserContext.Provider>
  );
};
