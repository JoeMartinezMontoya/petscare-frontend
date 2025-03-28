'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import axios from 'axios';
import { FaBackward, FaPrint, FaShare } from 'react-icons/fa';
import MapComponent from '../new/components/MapComponent';
import dayjs from 'dayjs';

async function fetchAnnouncementData(id) {
  if (!id) throw new Error('ID manquant');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/public/api/announcements/${id}`
  );
  return JSON.parse(response.data['announcementData']);
}

async function fetchPetData(petId) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_PETS_API_URL}/public/api/lost-pet/${petId}`
  );
  const lostPet = JSON.parse(response.data['lostPetData']);
  return lostPet[0];
}

export default function AnnouncementDisplay() {
  const { id } = useParams();

  const {
    data: announcement,
    isLoading: isAnnouncementLoading,
    error: announcementError,
  } = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => fetchAnnouncementData(id),
    enabled: !!id,
    staleTime: 600000,
    gcTime: 600000,
  });

  const {
    data: lostPet,
    isLoading: isPetLoading,
    error: petError,
  } = useQuery({
    queryKey: ['lostPet', announcement?.pet_ids?.[0]],
    queryFn: () => fetchPetData(announcement.pet_ids[0]),
    enabled: !!announcement?.pet_ids,
    staleTime: 600000,
    gcTime: 600000,
  });

  if (lostPet && announcement) {
    console.log(lostPet, announcement);
  }

  if (isAnnouncementLoading) return <p>Chargement de l&apos;annonce...</p>;
  if (announcementError) return <p>Erreur: {announcementError.message}</p>;

  if (isPetLoading) return <p>Chargement des infos du pet...</p>;
  if (petError) return <p>Erreur: {petError.message}</p>;

  return (
    <div className='container-fluid d-flex flex-column'>
      <div className='col-12'>
        <div className='row mt-5 pt-3 align-items-center petscare-background'>
          <div className='col-1'>
            <Link href='/announcements' className='btn btn-warning'>
              <FaBackward />
            </Link>
          </div>
          <div className='col text-center'>
            <h1 className='petscare-brand'>{announcement.title}</h1>
          </div>
          <div className='col-1'></div>
          <div className='row mt-3 pb-3 justify-content-between text-center'>
            <div className='col-2'>{announcement.type}</div>
            <div className='col-2'>{announcement.status}</div>
            <div className='col-2'>
              <h6 className='petscare-brand pt-2'>
                {dayjs(announcement.createdAt).format('DD/MM/YYYY')}
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-3 d-flex flex-column petscare-announce justify-content-between'>
        <h3 className='petscare-brand'>
          Informations à propos de {lostPet?.name}
        </h3>
        <div className=' flex-fill'>
          <p className='text-white'>{announcement.content}</p>
          {/* #TODO : Insert pet images here  */}
        </div>

        <div>
          <p className='text-white'>
            Informations de contact : {announcement.contactInfo}
          </p>
        </div>

        <div>
          <h3 className='petscare-brand'>Localisation</h3>
          <MapComponent
            latitude={announcement.latitude}
            longitude={announcement.longitude}
            petName={lostPet?.name}
          />
        </div>

        <div className='row mt-3 py-3 rounded align-items-center petscare-background'>
          <div className='col-3'>
            Nombre de vues : {announcement.viewsCount ?? 0}
          </div>
          <div className='col-3'></div>
          <div className='col-3'>
            <button className='btn btn-info'>
              <FaShare />
            </button>
          </div>
          <div className='col-3'>
            <button className='btn btn-warning'>
              <FaPrint />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
