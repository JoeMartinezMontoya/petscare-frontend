'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

async function fetchUserAnnouncements(userId, page = 1) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/private/api/announcements/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
      params: { page, limit: 10 },
    }
  );
  return JSON.parse(response.data.announcements.announcements);
}

export default function UserAnnouncements({ user }) {
  const [page, setPage] = useState(1);

  const {
    data: announcements = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['user-announcements', user?.id, page],
    queryFn: () => fetchUserAnnouncements(user.id, page),
    enabled: !!user?.id,
    keepPreviousData: true,
    onSuccess: (data) => console.log('Données reçues :', data),
    onError: (err) => console.error('Erreur de requête :', err),
  });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className='row my-4 align-items-center'>
        <div className='col-2'>
          <Image
            src='https://placehold.co/100x100'
            className='rounded'
            alt='Placeholder Profile Picture'
            width={100}
            height={100}
          />
        </div>
        <h1 className='petscare-brand col'>Mes annonces</h1>
      </div>

      <div className='row g-3'>
        {isLoading ? (
          <p>Chargement des annonces...</p>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id}>
              <h3 className='petscare-brand'>{announcement.title}</h3>
            </div>
          ))
        )}
      </div>

      <div className='d-flex justify-content-between mt-3'>
        <button
          className='btn btn-secondary'
          onClick={handlePrevPage}
          disabled={page === 1}>
          Précédent
        </button>
        {isFetching && <span>Chargement...</span>}
        <button
          className='btn btn-secondary'
          onClick={handleNextPage}
          disabled={announcements.length < 10}>
          Suivant
        </button>
      </div>
    </>
  );
}
