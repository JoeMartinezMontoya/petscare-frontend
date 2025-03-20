'use client';
import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import LocationAutocomplete from './LocationAutocomplete';
import { useUser } from '@/app/contexts/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PetLostAnnouncementForm({ type }) {
  const { user, pets, loading } = useUser();
  const queryClient = useQueryClient(); // 🔥 React Query pour gérer le cache

  const [formData, setFormData] = useState({
    title: 'Avis de disparition',
    type: type,
    starting_date: '',
    contact_info: '',
    pet_ids: [],
    location: '',
    latitude: null,
    longitude: null,
  });

  const [announcementIds, setAnnouncementIds] = useState(null);

  const petOptions = pets.map((pet) => ({
    value: pet.id,
    label: pet.name,
  }));

  const createAnnouncement = async (data) => {
    console.log(user);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/private/api/announcements/create-announcement`,
      { ...data, user_id: user.id },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      }
    );
    return response.data.announcementCreated;
  };

  const { mutate, isLoading: submitting } = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: (announcementCreated) => {
      console.log('Annonces créées avec les IDs:', announcementCreated);
      setAnnouncementIds(announcementCreated);
      queryClient.invalidateQueries(['user-announcements']);
    },
    onError: (error) => {
      console.error("Erreur lors de la création de l'annonce:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (place) => {
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
  };

  const handlePetSelectChange = (selectedOptions) => {
    const selectedPetIds = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, pet_ids: selectedPetIds }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnnouncementIds(null);
    mutate(formData);
  };

  const handleOpenAnnouncements = () => {
    sessionStorage.setItem(
      'lastAnnouncementIds',
      JSON.stringify(announcementIds)
    );
    window.location.href = '/redirect-announcements';
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
              concernant les caractéristiques physiques sur l&apos;annonce qui
              sera générée. Un bouton de partage sur les réseaux sociaux sera
              présent ainsi qu&apos;une affiche à imprimer.
            </div>
          </div>

          <div className='form-group col'>
            <label className='form-label petscare-brand'>Qui a disparu ?</label>
            <Select
              options={petOptions}
              isMulti
              placeholder={loading ? 'Chargement...' : 'Choisissez vos animaux'}
              onChange={handlePetSelectChange}
              closeMenuOnSelect={false}
              closeMenuOnScroll
              isClearable
              required
            />
            {pets.length === 0 && (
              <p className='text-danger'>Aucun animal enregistré.</p>
            )}
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
            <label className='form-label petscare-brand'>
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
        </div>

        <div className='row mt-5'>
          <div className='form-group col'>
            {announcementIds ? (
              <button
                type='button'
                className='btn btn-success col-3'
                onClick={handleOpenAnnouncements}>
                Voir{' '}
                {announcementIds.length > 1
                  ? `vos annonces (${announcementIds.length})`
                  : 'votre annonce'}
              </button>
            ) : (
              <button
                type='submit'
                className='btn btn-primary col-3'
                disabled={submitting}>
                {submitting ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-2'></span>
                    Envoi en cours...
                  </>
                ) : (
                  "Publier l'annonce"
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
