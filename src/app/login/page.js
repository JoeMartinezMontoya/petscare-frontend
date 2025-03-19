'use client';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { addFlashMessage } = useFlashMessage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login-user`, {
        email: formData.email,
        password: formData.password,
      })
      .then((json) => {
        login(json.data.userData.id, json.data.token);
        addFlashMessage(json.message || 'Bonjour !', 'success');
        router.push('/');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || 'Une erreur inattendue est survenue.';

        console.log(err);

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
      <div className='col-12 col-md-6 mx-auto p-5 rounded-end-2 petscare-background'>
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
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label petscare-brand'>
              Email
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
            <label htmlFor='password' className='form-label petscare-brand'>
              Mot de passe
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
