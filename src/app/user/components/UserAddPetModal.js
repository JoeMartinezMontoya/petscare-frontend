import React, { useState } from 'react';
import axios from 'axios';
import { useFlashMessage } from '@/app/contexts/FlashMessageContext';
import { useQueryClient } from '@tanstack/react-query';

export default function UserAddPetModal({ userId }) {
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    species: '',
    birthDate: '',
  });
  const { addFlashMessage } = useFlashMessage();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [displayName, setDisplayName] = useState('');

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const apiUrl = process.env.NEXT_PUBLIC_PETS_API_URL;
    const token = sessionStorage.getItem('authToken');
    const response = await axios
      .post(
        `${apiUrl}/api/pets/create-pet`,
        {
          name: formData.name,
          species: formData.species,
          race: formData.race,
          birthDate: formData.birthDate,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((json) => {
        addFlashMessage(json.data.detail || 'Message test', 'success');
        handlePetAdded();
      })
      .catch((err) => {
        addFlashMessage(err.response.data.detail || 'Message test', 'danger');
      });
  };

  const handlePetAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['userPets'] });
  };

  const handleBlur = () => {
    setDisplayName(formData.name);
  };

  return (
    <>
      <button
        className='btn btn-info col-4'
        data-bs-toggle='modal'
        data-bs-target='#addPetModal'>
        Ajouter un animal
      </button>
      {/**================================================================================================
       *                                         LAYERED BACKGROUND
       *================================================================================================**/}
      <div
        className='modal fade'
        id='addPetModal'
        tabIndex='-1'
        aria-hidden='true'>
        <div className='modal-dialog'>
          {/**================================================================================================
           *                                         MODAL
           *================================================================================================**/}
          <div className='modal-content petscare-background'>
            {/**================================================================================================
             *                                         HEADER
             *================================================================================================**/}
            <div className='modal-header'>
              <h5 className='modal-title petscare-brand'>Ajouter un animal</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'></button>
            </div>
            {/**================================================================================================
             *                                         FORM
             *================================================================================================**/}
            <div className='modal-body flex'>
              <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                  <div className='col-12'>
                    <label className='form-label petscare-brand'>
                      Nom de l&apos;animal
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-6'>
                    <label className='form-label petscare-brand'>Espèces</label>
                    <input
                      type='text'
                      className='form-control'
                      name='species'
                      value={formData.species}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='col-6'>
                    <label className='form-label petscare-brand'>Race</label>
                    <input
                      type='text'
                      className='form-control'
                      name='race'
                      value={formData.race}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-12'>
                    <label className='form-label petscare-brand'>
                      Date de naissance
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      name='birthDate'
                      value={formData.birthDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>

                {/**================================================================================================
                 *                                         FOOTER
                 *================================================================================================**/}
                {error && <p className='text-danger'>{error}</p>}
                {success && <p className='text-success'>{success}</p>}
                <button type='submit' className='btn btn-primary'>
                  Ajouter {displayName}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
