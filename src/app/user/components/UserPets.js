'use client';
import UserPetData from './UserPetData';
import LastPetsLoading from '@/app/components/LastPetsLoading';

export default function UserPets({ pets, isLoading }) {
  if (isLoading) return <LastPetsLoading />;
  return (
    <div className='mt-5'>
      <div className='container'>
        <h1 className='petscare-brand'>Vos animaux</h1>
        <div className='row g-3'>
          {pets &&
            pets.map((pet) => {
              return <UserPetData key={pet.id} userPet={pet} />;
            })}
        </div>
      </div>
    </div>
  );
}
