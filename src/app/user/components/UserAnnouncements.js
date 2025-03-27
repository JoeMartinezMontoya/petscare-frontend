'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import AnnouncementCard from '@/app/announcements/new/components/AnnouncementCard';
import Pagination from '@/app/components/Pagination';
import AnnouncementCardSkeleton from '@/app/announcements/new/components/AnnouncementCardSkeleton';

async function fetchUserAnnouncements(userId) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/private/api/announcements/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }
  );

  return JSON.parse(response.data.announcementsData.announcements);
}

export default function UserAnnouncements({ user }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-announcements', user?.id],
    queryFn: () => fetchUserAnnouncements(user.id),
    enabled: !!user?.id,
    staleTime: Infinity,
    cacheTime: 60 * 60 * 1000,
  });

  const totalItems = announcements?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedAnnouncements = announcements
    ? announcements.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return (
    <div className='h-100 d-flex flex-column'>
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

      <div className='row card-deck'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <AnnouncementCardSkeleton key={index} />
            ))
          : displayedAnnouncements.map((announcement) => (
              <AnnouncementCard
                announcement={announcement}
                key={announcement.id}
              />
            ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
