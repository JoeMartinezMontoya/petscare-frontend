import dayjs from 'dayjs';
import React from 'react';
require('dayjs/locale/fr');

export default function UserPetData({ userPet }) {
  dayjs.locale('fr');
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className='p-4 petscare-background rounded'>
      <div className='row'>
        <div className='col-3'>
          <img
            className='card-img-top rounded'
            src={`${
              userPet.race === 1
                ? 'https://placedog.net/'
                : 'https://placecats.com/'
            }${randomInt(400, 450)}/400`}
            alt={userPet.name}
          />
        </div>
        <div className='col'>
          <h3 className='petscare-brand'>{userPet.name}</h3>
          <p className='small'>
            {dayjs(userPet.birthDate.date).format('DD MMMM YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
}
