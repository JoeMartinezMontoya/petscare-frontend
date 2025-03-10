import React from 'react';

export default function UserPetData({ userPet }) {
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
          <p className='small'>{new Date(userPet.birthDate).toString()}</p>
        </div>
      </div>
    </div>
  );
}
