'use client';
import axios from 'axios';
import UserPetData from './UserPetData';
import LastPetsLoading from '@/app/components/LastPetsLoading';
import { useQuery } from '@tanstack/react-query';

async function fetchUserPets() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_PETS_API_URL}/private/api/pets/user/1`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }
  );
  return JSON.parse(response.data['user-pets']);
}

export default function UserPets() {
  const {
    data: userPets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userPets'],
    queryFn: fetchUserPets,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LastPetsLoading />;
  if (error) return <p className='text-danger'>Une erreur est survenue</p>;

  return (
    <div className='mt-5'>
      <div className='container'>
        <h1 className='petscare-brand'>Vos animaux</h1>
        <div className='row g-3'>
          {userPets &&
            userPets.map((pet) => {
              return <UserPetData key={pet.id} userPet={pet} />;
            })}
        </div>
      </div>
    </div>
  );
}
