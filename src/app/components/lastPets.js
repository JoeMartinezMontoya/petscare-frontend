import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LastPetsLoading from './LastPetsLoading';

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function fetchLastPets() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_PETS_API_URL}/api/pets/last-pets`
  );
  return JSON.parse(response.data['last-pets']);
}

export default function LastPets() {
  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['lastPets'],
    queryFn: fetchLastPets,
    staleTime: 600000,
    gcTime: 600000,
  });

  if (isLoading) return <LastPetsLoading />;
  if (error) return <p className='text-danger'>Une erreur est survenue</p>;

  return (
    <div className='row'>
      <div className='col-12 p-5'>
        <h2 className='petscare-brand'>
          Ces animaux viennent de nous rejoindre
        </h2>
        <div className='row mt-3 justify-content-between'>
          {pets.map((pet) => (
            <div key={pet.id} className='col-2'>
              <div className='card petscare-background'>
                <img
                  className='card-img-top'
                  src={`${
                    pet.race === 1
                      ? 'https://placedog.net/'
                      : 'https://placecats.com/'
                  }${randomInt(600, 650)}/600`}
                  alt={pet.name}
                />
                <div className='card-body mh-100'>
                  <h5 className='card-title text-center petscare-brand'>
                    {pet.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
