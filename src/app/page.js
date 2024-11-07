import React from 'react';

export default function Home() {
  return (
    <div className='container-fluid mt-5'>
      <div className='bg-primary text-white p-4 rounded'>
        <h1 className='display-4 petscare-brand'>Welcome to PetsCare!</h1>
        <p className='lead'>
          Votre service pour le bien-être de vos animaux de compagnie.
        </p>
        <hr className='my-4' />
        <p>
          Inscrivez-vous pour découvrir nos services et gérer les informations
          de vos animaux facilement.
        </p>
        <a className='btn btn-secondary btn-lg' href='#' role='button'>
          Commencer
        </a>
      </div>
    </div>
  );
}
