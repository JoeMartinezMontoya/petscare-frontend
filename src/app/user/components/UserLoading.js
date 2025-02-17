import React from 'react';

export default function UserLoading() {
  return (
    <div className='row mt-5 petscare-background'>
      <div className='row'>
        <h1 className='petscare-brand col-10 mx-auto mt-5 text-center'>
          Données en cours de chargement
        </h1>
      </div>
      <div className='row m-5'>
        <div className='spinner-grow m-auto' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
}
