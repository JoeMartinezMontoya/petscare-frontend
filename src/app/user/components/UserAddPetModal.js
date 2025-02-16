import React, { useState } from 'react';
import axios from 'axios';
import { useFlashMessage } from '@/app/contexts/FlashMessageContext';

export default function UserAddPetModal({ userId }) {
  const [formData, setFormData] = useState({
    name: '',
    race: '',
  });
  const { addFlashMessage } = useFlashMessage();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [displayName, setDisplayName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const apiUrl = process.env.NEXT_PUBLIC_PETS_API_URL;
    const token = localStorage.getItem('authToken');
    const response = await axios
      .post(
        `${apiUrl}/api/pets/create-pet`,
        {
          name: formData.name,
          race: formData.race,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((json) => {
        console.log(json);

        // addFlashMessage(json.data.detail || 'Message test', 'success');
      })
      .catch((err) => {
        addFlashMessage(err.response.data.detail || 'Message test', 'danger');
      });
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
      {/* Layered background */}
      <div
        className='modal fade'
        id='addPetModal'
        tabIndex='-1'
        aria-hidden='true'>
        <div className='modal-dialog'>
          {/* Modal */}
          <div className='modal-content petscare-background'>
            {/* Header */}
            <div className='modal-header'>
              <h5 className='modal-title petscare-brand'>Ajouter un animal</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'></button>
            </div>
            {/* Form */}
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
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
                <div className='mb-3'>
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
                {/* Button & Messages */}
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
