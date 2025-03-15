'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';
import axios from 'axios';
import UserData from './components/UserData';
import UserLoading from './components/UserLoading';
import UserNotAuthenticated from './components/UserNotAuthenticated';
import UserPlaceholder from './components/UserPlaceholder';
import UserPets from './components/UserPets';
require('dayjs/locale/fr');

async function fetchUserData() {
  const token = sessionStorage.getItem('authToken');
  if (!token) throw new Error('No token available');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/show-user`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return JSON.parse(response.data.user);
}

export default function UserPage() {
  const { isAuthenticated } = useAuth();
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    enabled: !!isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  if (isAuthenticated === undefined) return <UserLoading />;
  if (!isAuthenticated) return <UserNotAuthenticated />;
  if (isLoading)
    return (
      <div className='row mt-5 petscare-background'>
        <UserPlaceholder />
      </div>
    );
  if (error) return <p className='text-danger'>Une erreur est survenue</p>;

  return (
    <>
      {userData ? (
        <>
          <div className='row mt-5 petscare-background'>
            <UserData
              userData={userData}
              formattedCreatedAt={dayjs(userData.createdAt).format(
                'DD MMMM YYYY à HH:mm'
              )}
              formattedBirthDate={dayjs(userData.birthDate).format(
                'DD MMMM YYYY'
              )}
            />
          </div>
          <UserPets />
        </>
      ) : (
        <div className='row mt-5 petscare-background'>
          <UserPlaceholder />
        </div>
      )}
    </>
  );
}
