'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

async function fetchAnnouncements() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/public/api/announcements`
  );
  return JSON.parse(response.data['announcements']);
}

export default function AnnouncementsPage() {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
    staleTime: 600000,
    gcTime: 600000,
  });

  return (
    <>
      <div className='row mt-5 p-5 petscare-background text-center'>
        <h1 className='petscare-brand'>Nos annonces</h1>
        <div className='row mt-3 justify-content-center'>
          <Link href='/announcements/new' className='btn btn-primary col-3'>
            Publier une annonce
          </Link>
        </div>
      </div>
      <div className='row mt-3 justify-content-between'>
        {announcements?.map((announcement) => (
          <div key={announcement.id} className='col-4 my-3'>
            <div className='card petscare-background petscare-announce-card'>
              <div className='card-header text-center'>
                {announcement.title}
              </div>
              <div className='card-body'>
                <p className='card-text'>{announcement.content}</p>
                <p className='card-text'>{announcement?.location}</p>
              </div>
              <div className='card-footer'>
                <div className='row justify-content-between align-items-center'>
                  <div className='col-4'>
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                  <div className='col-2'>
                    <Link
                      href={`/announcements/${announcement.id}`}
                      className='btn btn-info'>
                      Voir
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        );
      </div>
    </>
  );
}
