import Image from 'next/image';
import React from 'react';

export default function AnnouncementCardSkeleton() {
  return (
    <div className='col-4 mb-4'>
      <div className='card skeleton-card'>
        <Image
          className='card-img-top'
          src='https://placehold.co/150x150'
          alt='Card image cap'
          width={150}
          height={150}
        />
        <div className='card-body'>
          <h5 className='placeholder-glow mt-3'>
            <span className='placeholder col-6'></span>
          </h5>
          <p className='placeholder-glow'>
            <span className='placeholder col-7'></span>
            <span className='placeholder col-4'></span>
            <span className='placeholder col-6'></span>
          </p>
        </div>
        <div className='card-footer'>
          <p className='placeholder-glow'>
            <span className='placeholder col-7'></span>
          </p>
        </div>
      </div>
    </div>
  );
}
