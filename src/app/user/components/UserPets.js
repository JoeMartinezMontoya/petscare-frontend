'use client';
import { getCachedData, setCachedData } from '../../utils/cache';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserPetData from './UserPetData';

export default function UserPets() {
  const [userPets, setUserPets] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_PETS_API_URL;
  useEffect(() => {
    const fetchUserPets = async () => {
      const storedData = getCachedData('userPets');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserPets(parsedData);
      } else {
        const response = await axios
          .get(`${apiUrl}/api/pets/user/1`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          })
          .then((response) => {
            setUserPets(JSON.parse(response.data['user-pets']));
            setCachedData('userPets', JSON.parse(response.data['user-pets']));
          })
          .catch((error) => {
            console.error('Error fetching user pets:', error);
          });
      }
    };

    fetchUserPets();
  }, [apiUrl]);

  return (
    <div className='mt-5'>
      <div className='container'>
        <h1 className='petscare-brand'>Vos animaux</h1>
        <div className='row g-3'>
          {userPets &&
            userPets.map((pet) => {
              return <UserPetData key={pet.id} userPet={pet} />;
            })}
        </div>
      </div>
    </div>
  );
}
