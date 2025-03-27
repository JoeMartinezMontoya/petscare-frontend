import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CgMoreO } from 'react-icons/cg';

export default function AnnouncementCard({ announcement }) {
  return (
    <div className='col-6 col-md-4 mb-4'>
      <div className='card'>
        <Image
          className='card-img-top'
          src='https://placehold.co/150x150'
          alt='Card image cap'
          width={150}
          height={150}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            {announcement.title} - {announcement.type}
          </h5>
          <p className='card-text'>{announcement.content}</p>
        </div>
        <div className='card-footer'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-7'>
              <small className='text-muted'>
                Crée le {dayjs(announcement.createdAt).format('DD/MM/YYYY')}
              </small>
            </div>
            <div className='col d-flex justify-content-end'>
              <Link
                href={`/announcements/${announcement.id}`}
                className='btn btn-sm btn-info petscare-brand d-flex align-items-center'
                target='_blank'>
                <CgMoreO className='mx-2 fs-6' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
