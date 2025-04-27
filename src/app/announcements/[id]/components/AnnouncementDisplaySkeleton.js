import Link from 'next/link';
import React from 'react';
import { FaBackward, FaEye } from 'react-icons/fa';

export default function AnnouncementDisplaySkeleton() {
  return (
    <div className='container-fluid d-flex flex-column'>
      <div className='row my-4 p-5 align-items-center petscare-background'>
        {
          //? Left
        }
        <div className='col-1'>
          <Link href='/announcements' className='btn btn-info'>
            <FaBackward className='text-white' />
          </Link>
        </div>
        {
          //? Center
        }
        <div className='col text-center'>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-8'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-4'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-6'></span>
          </p>
        </div>
        {
          //? Right
        }
        <div className='col-1 d-flex flex-column align-items-center'></div>
      </div>

      <div className='container text-white mt-3 d-flex flex-column petscare-announce justify-content-between'>
        <p className='my-5 card-text placeholder-glow'>
          <span className='placeholder col-5'></span>
        </p>
        <div className=' flex-fill'>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-10'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-4'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-1'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-5'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-12'></span>
          </p>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-8'></span>
          </p>
        </div>

        {
          //? Footer
        }
        <div className='row my-4 p-3 rounded petscare-background'>
          <p className='card-text placeholder-glow'>
            <span className='placeholder col-12'></span>
          </p>
        </div>
      </div>
    </div>
  );
}
