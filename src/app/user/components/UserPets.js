'use client';
import Image from 'next/image';
import UserPetData from './UserPetData';
import LastPetsLoading from '@/app/components/LastPetsLoading';

export default function UserPets({ pets, isLoading }) {
  if (isLoading) return <LastPetsLoading />;
  return (
    <>
      <div className='row my-4 align-items-center'>
        <div className='col-2'>
          <Image
            src='https://placehold.co/100x100'
            className='rounded'
            alt='Placeholder Animal Picture'
            width={100}
            height={100}
          />
        </div>
        <h1 className='petscare-brand col'>Mes animaux</h1>
      </div>
      <div className='row g-3'>
        {pets &&
          pets.map((pet) => {
            return <UserPetData key={pet.id} userPet={pet} />;
          })}
      </div>
    </>
  );
}
