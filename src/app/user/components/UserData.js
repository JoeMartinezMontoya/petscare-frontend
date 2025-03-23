import React from 'react';
import Image from 'next/image';
import { FaAddressCard, FaBirthdayCake, FaPenFancy } from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { GiPawHeart } from 'react-icons/gi';
import dayjs from 'dayjs';

export default function UserData({ userData }) {
  dayjs.locale('fr');
  return (
    <>
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
        <h1 className='petscare-brand col'>{userData.userName}</h1>
      </div>
      <table className='table table-hover'>
        <tbody>
          <tr>
            <th scope='row'>
              <BsCardChecklist className='mx-2 fs-4' />
              Pseudonyme
            </th>
            <td colSpan='2'>{userData.userName}</td>
          </tr>
          <tr>
            <th scope='row'>
              <FaAddressCard className='mx-2 fs-4' />
              Nom
            </th>
            <td colSpan='2'>
              {userData.firstName} {userData.lastName}
            </td>
          </tr>
          <tr>
            <th scope='row'>
              <MdEmail className='mx-2 fs-4' />
              Email
            </th>
            <td colSpan='2'>{userData.email}</td>
          </tr>
          <tr>
            <th scope='row'>
              <FaBirthdayCake className='mx-2 fs-4' />
              Date de naissance
            </th>
            <td colSpan='2'>
              {dayjs(userData.birthDate.date).format('DD/MM/YYYY')}
            </td>
          </tr>
          <tr>
            <th scope='row'>
              <GiPawHeart className='mx-2 fs-4' />
              Date de création du compte
            </th>
            <td colSpan='2'>
              {dayjs(userData.createdAt.date).format('DD/MM/YYYY')}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='row my-4 align-items-center'>
        <div className='col-4'>
          <button className='btn btn-info'>
            <FaPenFancy className='mx-2 fs-4' />
            Modifier mes informations
          </button>
        </div>
      </div>
    </>
  );
}
