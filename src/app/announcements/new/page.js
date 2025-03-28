'use client';
import React, { useState } from 'react';
import PetLostAnnouncementForm from './components/PetLostAnnouncementForm';
import Image from 'next/image';

export default function NewAnnounce() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [isFormSelected, setIsFormSelected] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedForm(e.target.dataset.announcementType);
    setIsFormSelected(true);
  };

  const formDisplay = (type) => {
    switch (type) {
      case 'lost':
        return <PetLostAnnouncementForm />;

      default:
        break;
    }
  };

  return (
    <>
      <div className='row my-4 p-5 petscare-background text-center'>
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

      <div className='container mt-5'>
        {isFormSelected === true ? (
          formDisplay(selectedForm)
        ) : (
          <div className='row'>
            <Image
              src='/images/pets_group.png'
              alt='Annonce placeholder'
              width={25}
              height={800}
            />
          </div>
        )}
      </div>
    </>
  );
}
