'use client';
import { getCachedData, setCachedData } from './utils/cache';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LastPets from './components/lastPets';
import Stats from './components/Stats';

export default function Home() {
  const [pets, setPets] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_PETS_API_URL;

  useEffect(() => {
    const fetchLastPets = async () => {
      const storedData = getCachedData('lastPets');
      if (storedData) {
        setPets(JSON.parse(storedData));
      } else {
        try {
          const response = await axios.get(`${apiUrl}/api/pets/last-pets`);
          if (response.data['last-pets']) {
            const parsedPets = JSON.parse(response.data['last-pets']);
            setPets(parsedPets);
            setCachedData('lastPets', parsedPets);
          } else {
            console.error("Missing 'last-pets' key in response data");
          }
        } catch (error) {
          console.error('Error fetching pets:', error);
        }
      }
    };

    fetchLastPets();
  }, [apiUrl]);

  return (
    <>
      <div className='row mt-5'>
        <div className='col-12 p-5 petscare-background'>
          <h1 className='petscare-brand'>Bienvenue sur PetsCare!</h1>
          <p>Votre service pour le bien-être de vos animaux de compagnie.</p>
          <hr className='my-4' />
          <p>
            Inscrivez-vous pour découvrir nos services et gérer les informations
            de vos animaux facilement.
          </p>
        </div>
      </div>
      <LastPets pets={pets} />
      <Stats />
    </>
  );
}
