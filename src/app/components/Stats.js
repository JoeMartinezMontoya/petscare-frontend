import { HiUserGroup } from 'react-icons/hi2';
import { FaPaw } from 'react-icons/fa';
import React from 'react';

export default function Stats() {
  return (
    <div className='row mt-3 justify-content-around'>
      <div className='col-6 text-center'>
        <h4 className='petscare-brand'>100</h4>
        <HiUserGroup className='fs-1 mb-3' />
        <h4 className='petscare-brand'>PetsCarer</h4>
      </div>
      <div className='col-6 text-center'>
        <h4 className='petscare-brand'>100</h4>
        <FaPaw className='fs-1 mb-3' />
        <h4 className='petscare-brand'>Compagnons</h4>
      </div>
    </div>
  );
}
