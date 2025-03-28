import Image from 'next/image';
import React from 'react';
import { CgMoreO } from 'react-icons/cg';

export default function AnnouncementCardSkeleton() {
  return (
    <div className='col mx-auto my-2'>
      <div className='card petscare-background'>
        <Image
          className='card-img-top'
          src='https://placehold.co/400x200'
          alt='Card image cap'
          width={400}
          height={200}
        />
        <div className='card-header'>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-12'></span>
          </p>
        </div>
        <div className='card-body'>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-5'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-12'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-7'></span>
          </p>
        </div>
        <div className='card-footer'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-4'>
              <p className='card-text placeholder-glow'>
                <span className='placeholder col-12'></span>
              </p>
            </div>
            <div className='col-2'></div>
            <div className='col-4'>
              <p className='card-text placeholder-glow'>
                <span className='placeholder col-12'></span>
              </p>
            </div>
            <div className='col-2 d-flex justify-content-end'>
              <button
                className='btn btn-sm btn-info petscare-brand d-flex align-items-center'
                disabled>
                <CgMoreO className='mx-2 fs-6' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
