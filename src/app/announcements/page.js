'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import AnnouncementCard from './new/components/AnnouncementCard';
import AnnouncementCardSkeleton from './new/components/AnnouncementCardSkeleton';

async function fetchAnnouncements() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/public/api/announcements`
  );

  return JSON.parse(response.data.data['announcements']);
}

export default function AnnouncementsPage() {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
    staleTime: Infinity,
    gcTime: 1800000,
  });
  return (
    <>
      <div className='row my-4 p-5 petscare-background text-center'>
        <div className='d-flex flex-column'>
          <h1 className='petscare-brand'>Nos annonces</h1>
          <div className='row mt-3 justify-content-center'>
            <Link href='/announcements/new' className='btn btn-primary w-auto'>
              Publier une annonce
            </Link>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-6 justify-content-start'>
          {isLoading
            ? [...Array(12)].map((_, index) => (
                <AnnouncementCardSkeleton key={index} />
              ))
            : announcements?.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))}
        </div>
      </div>
    </>
  );
}
