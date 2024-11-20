'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8082/api/auth/register',
        {
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccess(response.data.message || 'Inscription réussie !');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (err) {
      // Récupérer le message du back-end s'il existe
      const errorMessage =
        err.response?.data?.error || 'Une erreur inattendue est survenue.';
      setError(errorMessage);

      // Optionnel : journaliser les détails pour le debug
      console.error('Erreur:', {
        code: err.code,
        message: err.message,
        response: err.response,
      });
    }
  };

  return (
    <div className='row'>
      <div className='col-12 col-md-6 mx-auto p-5'>
        <div className='row'>
          <h2 className='petscare-brand col'>Inscription</h2>
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

          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirmer le mot de passe :
            </label>
            <div className='input-group'>
              <input
                className='form-control'
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className='input-group-text'>********</span>
            </div>
          </div>

          <button type='submit' className='btn btn-success'>
            Inscription
          </button>
        </form>
      </div>

      <div
        className='col-12 col-md-6 mx-auto p-5 rounded-start-2'
        id='auth-right-side'>
        <h2 className='petscare-brand'>Rejoignez-nous</h2>
        <p className='mt-4'>
          Intégrez une communauté bienveillante et aimante qui oeuvre pour le
          bien-être de nos compagnons à fourrure
        </p>
        <p className='mt-4'>
          Gardez ou faites gardez vos compagnons, vous pourrez vous inscrire en
          tant que PetSitter afin de signaler aux autres membres que vous êtes
          disponible, et vous faire recommander par cette même communauté
        </p>
        <p className='mt-4'>
          Retrouvez votre compagnon ou celui des autres grâçe à notre système
          intelligent
        </p>

        <button className='btn btn-info'>Déjà inscrit?</button>
      </div>
    </div>
  );
}
