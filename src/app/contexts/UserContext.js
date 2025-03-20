import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('authToken');

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
  });

  const { data: pets = [] } = useQuery({
    queryKey: ['user-pets', userId],
    queryFn: async () => {
      if (!userId || !token) return [];

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PETS_API_URL}/private/api/pets/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return JSON.parse(response.data['user-pets']).map((pet) => ({
        id: pet.id,
        name: pet.name,
      }));
    },
    enabled: !!userId,
  });

  return (
    <UserContext.Provider value={{ user, pets, isLoading, queryClient }}>
      {children}
    </UserContext.Provider>
  );
};
