'use client';
import React from 'react';
import LastPets from './components/lastPets';
import Stats from './components/Stats';

export default function Home() {
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
      <LastPets />
      <Stats />
    </>
  );
}
