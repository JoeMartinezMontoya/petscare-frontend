'use client';
import React, { useState } from 'react';
import AnnouncementForm from './components/AnnouncementForm';

export default function NewAnnounce() {
  const [selectedForm, setSelectedForm] = useState(null);
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedForm(e.target.dataset.announcementType);
  };

  const formDisplay = (type) => {
    return <AnnouncementForm type={type} />;
  };

  return (
    <>
      <div className='row mt-5 p-5 petscare-background text-center'>
        <h1 className='petscare-brand'>Que voulez vous publier ?</h1>
        <div className='row mt-5 justify-content-around'>
          <button
            className='btn btn-primary col-2'
            data-announcement-type='lost'
            onClick={handleClick}>
            Avis de recherche
          </button>
          <button
            className='btn btn-primary col-2'
            data-announcement-type='found'
            onClick={handleClick}>
            Avis de trouvaille
          </button>
          <button
            className='btn btn-primary col-2'
            data-announcement-type='adoption'
            onClick={handleClick}>
            Avis d&apos;adoption
          </button>
          <button
            className='btn btn-primary col-2'
            data-announcement-type='petsitting'
            onClick={handleClick}>
            Avis de PetSitting
          </button>
        </div>
      </div>

      <div className='container mt-5'>{formDisplay(selectedForm)}</div>
    </>
  );
}
