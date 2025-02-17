'use client';
import { getCachedData, setCachedData, clearCachedData } from '../utils/cache';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';
import axios from 'axios';
import UserData from './components/UserData';
import UserLoading from './components/UserLoading';
import UserNotAuthenticated from './components/UserNotAuthenticated';
import UserPlaceholder from './components/UserPlaceholder';
require('dayjs/locale/fr');

export default function UserPage() {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);
  const [formattedBirthDate, setFormattedBirthDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      /**======================
       *?   Not Authenticated
       *========================**/

      if (!isAuthenticated) {
        setUserData(null);
        clearCachedData('userData');
        setLoading(false);
        return;
      }

      /**======================
       *?   Getting User Data
       *========================**/

      const storedData = getCachedData('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        formatDates(parsedData);
        setLoading(false);
      } else {
        const token = localStorage.getItem('authToken');
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/show-user`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const data = response.data;
          setUserData(data);
          formatDates(data);
          setCachedData('userData', data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const formatDates = (data) => {
      dayjs.locale('fr');
      setFormattedCreatedAt(
        dayjs(data.createdAt).format('DD MMMM YYYY à HH:mm')
      );
      setFormattedBirthDate(dayjs(data.birthDate).format('DD MMMM YYYY'));
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (isAuthenticated === undefined) return <UserLoading />;
  if (!isAuthenticated) return <UserNotAuthenticated />;
  if (loading) return <UserLoading />;

  return (
    <div className='row mt-5 petscare-background'>
      {userData ? (
        <UserData
          userData={userData}
          formattedCreatedAt={formattedCreatedAt}
          formattedBirthDate={formattedBirthDate}
        />
      ) : (
        <UserPlaceholder />
      )}
    </div>
  );
}
