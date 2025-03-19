'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import LocationAutocomplete from './LocationAutocomplete';

async function fetchUserPets() {
  const response = await axios.get(
    `${
      process.env.NEXT_PUBLIC_PETS_API_URL
    }/api/pets/user/${sessionStorage.getItem('userId')}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }
  );
  return JSON.parse(response.data['user-pets']);
}

async function sendAnnouncementForm(formData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/api/announcements/create-announcement`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }
  );

  console.log(response);

  return response;
}

export default function PetLostAnnouncementForm({ type }) {
  const [formData, setFormData] = useState({
    title: 'Avis de disparition',
    content: 'Alerte',
    type: type,
    starting_date: '',
    contact_info: '',
    pet_ids: [],
    location: '',
    latitude: null,
    longitude: null,
    user_id: sessionStorage.getItem('userId'),
  });

  const {
    data: userPets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userPets'],
    queryFn: fetchUserPets,
    staleTime: 1000 * 60 * 20,
  });

  const petOptions = userPets
    ? userPets.map((pet) => ({
        value: pet.id,
        label: pet.name,
      }))
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (place) => {
    console.log('Données de localisation reçues:', place);

    setFormData((prev) => ({
      ...prev,
      location: place.formatted,
      latitude: place.geometry.lat,
      longitude: place.geometry.lng,
    }));
  };
  const handleChangeDate = (e) => {
    const newDate = new Date(e.target.value).toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, starting_date: newDate }));
    console.log(newDate);
  };

  const handlePetSelectChange = (selectedOptions) => {
    const selectedPetIds = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, pet_ids: selectedPetIds }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    sendAnnouncementForm(formData);
  };

  return (
    <>
      <h2 className='petscare-brand'>Avis de {type}</h2>

      <form onSubmit={handleSubmit} className='d-flex flex-column'>
        <div className='row'>
          <div className='form-group'>
            <div className='alert alert-danger'>
              <strong>Chaque seconde compte !</strong>
              <br /> Nous allons fournir toutes les informations supplémentaires
              concernant les caractéristiques physique sur l&apos;annonce qui
              sera générée, un bouton de partage sur les réseaux sociaux sera
              présent dans celle-ci, ainsi qu&apos;une affiche à imprimer et
              poster dans votre voisinnage
            </div>
          </div>
          <div className='form-group col'>
            <label className='form-label petscare-brand'>Qui a disparu ?</label>
            <Select
              options={petOptions}
              isMulti
              placeholder={
                isLoading ? 'Chargement...' : 'Choisissez vos animaux'
              }
              onChange={handlePetSelectChange}
              closeMenuOnSelect={false}
              closeMenuOnScroll
              isClearable
              required
            />
            {error && <p className='text-danger'>Erreur de chargement</p>}
          </div>

          <div className='form-group col'>
            <label className='form-label petscare-brand'>Et quand ?</label>
            <input
              type='date'
              className='form-control custom-date-picker'
              onChange={handleChangeDate}
              value={formData.starting_date}
              required
            />
          </div>
        </div>

        <div className='row mt-3'>
          <div className='form-group col'>
            <label className=' form-label petscare-brand'>
              Des informations concernant le moyen de contact ?
            </label>
            <textarea
              className='form-control'
              onChange={handleChange}
              name='contact_info'
              required
            />
          </div>
        </div>

        <div className='row mt-3'>
          <div className='form-group col'>
            <label className='form-label petscare-brand'>Localisation</label>
            <LocationAutocomplete onSelect={handleLocationSelect} />
          </div>

          <input
            type='hidden'
            name='latitude'
            value={formData.latitude || ''}
          />
          <input
            type='hidden'
            name='longitude'
            value={formData.longitude || ''}
          />
        </div>

        <div className='row mt-5'>
          <div className='form-group col'>
            <button type='submit' className='btn btn-primary col-3'>
              Publier l&apos;annonce
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
