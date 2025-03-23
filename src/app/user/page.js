'use client';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserLoading from './components/UserLoading';
import UserNotAuthenticated from './components/UserNotAuthenticated';
import { useUser } from '../contexts/UserContext';
import { FaPaw, FaUserCircle } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';
import { MdAnnouncement } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import UserData from './components/UserData';
import UserPets from './components/UserPets';
import UserAnnouncements from './components/UserAnnouncements';

export default function UserPage() {
  const { isAuthenticated, logout } = useAuth();
  const { user, pets, isLoading } = useUser();
  const [selectedSection, setSelectedSection] = useState('');

  const handleClick = (e) => {
    e.preventDefault;
    setSelectedSection(e.target.dataset.buttonType);
  };

  const displaySelectedData = () => {
    switch (selectedSection) {
      case 'user-data':
        return <UserData userData={user} />;
      case 'user-pets':
        return <UserPets pets={pets} isLoading={isLoading} />;
      case 'user-announcements':
        return <UserAnnouncements user={user} />;
      case 'user-preferences':
        return <h6 className='petscare-brand'>Mes préférences</h6>;

      default:
        return <h6 className='petscare-brand'>Test</h6>;
    }
  };

  if (isAuthenticated === undefined) return <UserLoading />;
  if (!isAuthenticated) return <UserNotAuthenticated />;
  if (user)
    return (
      <div className='row'>
        {
          //? Left side
        }
        <div className='col-3 d-flex flex-column justify-content-between petscare-background petscare-profile-sidebar'>
          {
            //? Top section
          }
          <div className='row'>
            <div className='row'>
              <h4 className='petscare-brand text-center my-3'>Mon profil</h4>
            </div>

            <div className='d-flex flex-column align-items-start'>
              <div className='row mt-2 mx-2'>
                <button
                  className='btn btn-transparent py-2'
                  data-button-type='user-data'
                  onClick={handleClick}>
                  <FaUserCircle className='mx-2 fs-4' /> Mes informations
                </button>
              </div>

              <div className='row mt-2 mx-2'>
                <button
                  className='btn btn-transparent py-2'
                  data-button-type='user-pets'
                  onClick={handleClick}>
                  <FaPaw className='mx-2 fs-4' /> Mes animaux
                </button>
              </div>

              <div className='row mt-2 mx-2'>
                <button
                  className='btn btn-transparent py-2'
                  data-button-type='user-announcements'
                  onClick={handleClick}>
                  <MdAnnouncement className='mx-2 fs-4' /> Mes annonces
                </button>
              </div>

              <div className='row mt-2 mx-2'>
                <button
                  className='btn btn-transparent py-2'
                  data-button-type='user-preferences'
                  onClick={handleClick}>
                  <FaGears className='mx-2 fs-4' /> Mes préférences
                </button>
              </div>
            </div>
          </div>
          {
            //? Bottom section
          }
          <div className='row'>
            <button className='btn btn-danger py-2' onClick={logout}>
              <CiLogout className='mx-2 fs-4' /> Se déconnecter
            </button>
          </div>
        </div>
        {
          //? Right side
        }
        <div className='col-9 px-5'>{displaySelectedData()}</div>
      </div>
    );
}
