'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import axios from 'axios';
import AnnouncementDisplay from './components/AnnouncementDisplay';
import AnnouncementDisplaySkeleton from './components/AnnouncementDisplaySkeleton';

async function fetchAnnouncementData(id) {
  if (!id) throw new Error('ID manquant');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/public/api/announcements/${id}`
  );
  return JSON.parse(response.data['announcementData']);
}

export default function Announcement() {
  const { id } = useParams();

  const {
    data: announcement,
    isLoading: isAnnouncementLoading,
    error: announcementError,
  } = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => fetchAnnouncementData(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: 1800000,
  });

  console.log(announcement);

  if (isAnnouncementLoading) return <AnnouncementDisplaySkeleton />;

  return <AnnouncementDisplay announcement={announcement} />;
}
