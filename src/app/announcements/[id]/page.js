'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import axios from 'axios'; // Manquait dans ton code !
import { FaBackward } from 'react-icons/fa';

async function fetchAnnouncementData(id) {
  if (!id) throw new Error('ID manquant');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/api/announcements/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }
  );
  return JSON.parse(response.data['announcementData']);
}

export default function AnnouncementDisplay() {
  const { id } = useParams();

  const {
    data: announcement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => fetchAnnouncementData(id),
    enabled: !!id,
    staleTime: 600000,
    gcTime: 600000,
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div className='container-fluid d-flex flex-column'>
      <div className='row mt-5 align-items-center'>
        <div className='col-1'>
          <Link href='/announcements' className='btn btn-secondary'>
            <FaBackward />
          </Link>
        </div>
        <div className='col text-center'>
          <h1 className='petscare-brand'>{announcement.title}</h1>
        </div>
        <div className='col-1 justify-content-center'>
          <p className='petscare-brand'>
            {new Date(announcement.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className='row py-3 mt-3 petscare-background justify-content-between text-center'>
        <div className='col-2'>{announcement.type}</div>
        <div className='col-2'>{announcement.status}</div>
      </div>
    </div>
  );
}
