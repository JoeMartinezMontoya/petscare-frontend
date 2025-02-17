import React from 'react';
import UserCarousel from './UserCarousel';
import UserAddPetModal from './UserAddPetModal';

export default function UserData({
  userData,
  formattedCreatedAt,
  formattedBirthDate,
}) {
  return (
    <>
      <div className='col-12 col-md-6 mx-auto p-5'>
        <div className='row'>
          <div className='row my-4 align-items-center'>
            <img
              src='https://placehold.co/200x200'
              className='col-2'
              alt='profile picture'
            />
            <h1 className='petscare-brand col-10'>
              Bonjour {userData.userName}
            </h1>
          </div>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th scope='row'>
                  <i className='bi bi-card-checklist'></i> Pseudonyme
                </th>
                <td colSpan='2'>{userData.userName}</td>
              </tr>
              <tr>
                <th scope='row'>
                  <i className='bi bi-person-badge'></i> Nom
                </th>
                <td colSpan='2'>
                  {userData.firstName} {userData.lastName}
                </td>
              </tr>
              <tr>
                <th scope='row'>
                  <i className='bi bi-mailbox2'></i> Email
                </th>
                <td colSpan='2'>{userData.email}</td>
              </tr>
              <tr>
                <th scope='row'>
                  <i className='bi bi-calendar-date'></i> Date de naissance
                </th>
                <td colSpan='2'>{formattedBirthDate}</td>
              </tr>
              <tr>
                <th scope='row'>
                  <i className='bi bi-calendar2-check'></i> Membre depuis le
                </th>
                <td colSpan='2'>{formattedCreatedAt}</td>
              </tr>
            </tbody>
          </table>

          <div className='row mt-4'>
            <UserAddPetModal userId={userData.id} />
          </div>
        </div>
      </div>
      <UserCarousel />
    </>
  );
}
