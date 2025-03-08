import React from 'react';

export default function UserPetData({ userPet }) {
  return (
    <div className='row m-2 petscare-background'>
      <h3 className='petscare-brand'>{userPet.name}</h3>
    </div>
  );
}
