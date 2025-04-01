import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CgMoreO } from 'react-icons/cg';
import { FaEye } from 'react-icons/fa';

export default function AnnouncementCard({ announcement, fullView = true }) {
  return (
    <div className='col my-2'>
      <div
        className={`card petscare-background ${
          !fullView
            ? 'petscare-user-announcement-card'
            : 'petscare-announcement-card'
        }`}>
        <Image
          className='card-img-top'
          src='https://placehold.co/400x200'
          alt='Card image cap'
          width={400}
          height={200}
        />
        <div className='card-header d-flex align-items-center justify-content-between'>
          <h5 className='card-title my-0 col-8 petscare-brand'>
            {announcement.type_label}
          </h5>
          {fullView && (
            <div className='col-4 d-flex flex-column text-center'>
              <small className='text-body-secondary petscare-brand'>
                {announcement.city}
              </small>

              <small className='text-body-secondary petscare-brand'>
                {announcement.postcode}
              </small>
            </div>
          )}
        </div>
        <div className='card-body'>
          <h4 className='petscare-brand'>{announcement.title}</h4>
          <p className='card-text fs-6'>{announcement.content_excerpt}</p>
        </div>
        <div className='card-footer'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-4 d-flex flex-column'>
              <small className='text-muted'>Crée le</small>
              <small className='text-muted'>
                {dayjs(announcement.createdAt).format('DD/MM/YYYY')}
              </small>
            </div>
            <div className='col d-flex flex-column align-items-center'>
              <FaEye />
              <small> {announcement.views_count}</small>
            </div>
            <div className='col-2 d-flex justify-content-end'>
              <Link
                href={`/announcements/${announcement.id}`}
                className='btn btn-sm btn-info petscare-brand d-flex align-items-center'>
                <CgMoreO className='mx-2 fs-6' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
