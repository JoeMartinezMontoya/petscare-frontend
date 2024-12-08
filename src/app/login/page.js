'use client';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
    const response = await axios
      .post(`${apiUrl}/api/auth/login-user`, {
        email: formData.email,
        password: formData.password,
      })
      .then((json) => {
        localStorage.setItem('authToken', json.data);
        addFlashMessage(json.message || 'Message test', 'success');
        router.push('/');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || 'Une erreur inattendue est survenue.';

        setFormData({ email: '', password: '' });
        addFlashMessage(errorMessage, 'danger');

        console.error('Erreur:', {
          code: err.code,
          message: err.message,
          response: err.response,
        });
      });
  };

  return (
    <div className='row mt-5'>
      <div
        className='col-12 col-md-6 mx-auto p-5 rounded-end-2'
        id='auth-left-side'>
        <h2 className='petscare-brand'>Content de vous revoir !</h2>
        <p className='mt-4'>Est-ce que vos compagnons se portent bien ?</p>
        <p className='mt-4'>Nous proposerons bientôt de nouveaux services</p>
        <p className='mt-4'>
          Suivez nous sur les réseaux pour ne pas les manquer
        </p>

        <button className='btn btn-info'>
          Vous ne possédez pas encore de compte?
        </button>
      </div>
      <div className='col-12 col-md-6 mx-auto p-5'>
        <div className='row'>
          <h2 className='petscare-brand col'>Connexion</h2>
          {error && (
            <div
              className='alert alert-danger alert-dismissible fade show'
              role='alert'>
              {error}
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'></button>
            </div>
          )}
          {success && (
            <div
              className='alert alert-success alert-dismissible fade show'
              role='alert'>
              {success}
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'></button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email :
            </label>
            <div className='input-group'>
              <input
                className='form-control'
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className='input-group-text'>morray@example.com</span>
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Mot de passe :
            </label>
            <div className='input-group'>
              <input
                className='form-control'
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className='input-group-text'>********</span>
            </div>
          </div>

          <button type='submit' className='btn btn-success'>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
