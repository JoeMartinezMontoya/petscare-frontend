import Link from 'next/link';
import React from 'react';
import { FaBackward, FaEye, FaPrint, FaShare } from 'react-icons/fa';
import MapComponent from '../../new/components/MapComponent';
import AnnouncementViewCounter from './AnnouncementViewCounter';
import { useUser } from '@/app/contexts/UserContext';

export default function AnnouncementDisplay({ announcement }) {
  const { user } = useUser();
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
          <h1 className='petscare-brand'>{announcement.type}</h1>
          <h6 className='petscare-brand text-muted'>{announcement.status}</h6>
          <h5 className='text-muted'>Posté par : {announcement.userId}</h5>
        </div>
        {
          //? Right
        }
        <div className='col-1 d-flex flex-column align-items-center'>
          <FaEye />
          <span>{announcement.viewsCount}</span>
        </div>
      </div>

      <div className='container mt-3 d-flex flex-column petscare-announce justify-content-between'>
        <h3 className='petscare-brand'>
          Informations à propos de {announcement.petId}
        </h3>
        <div className=' flex-fill'>
          <p className='text-white'>{announcement.content}</p>
          {/* #TODO : Insert pet images here  */}
        </div>

        <div>
          <h3 className='petscare-brand'>Localisation</h3>
          <MapComponent
            latitude={announcement.latitude}
            longitude={announcement.longitude}
            petName={announcement.petId}
          />
        </div>

        {
          //? Footer
        }
        <div className='row my-4 p-3 rounded align-items-center petscare-background'>
          <div className='col-3'></div>
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
      {/* <AnnouncementViewCounter announcementId={announcement.id} userId={us} /> */}
    </div>
  );
}
