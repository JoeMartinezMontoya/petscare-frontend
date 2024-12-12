'use client';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstname: '',
    lastname: '',
    birthdate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
    const response = await axios
      .post(`${apiUrl}/api/auth/register-user`, {
        email: formData.email,
        password: formData.password,
        password: formData.password,
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        birthdate: formData.birthdate,
      })
      .then((json) => {
        addFlashMessage(json.data.detail || 'Message test', 'success');
        router.push('/login');
      })
      .catch((err) => {
        addFlashMessage(err.response.data.detail || 'Message test', 'danger');
      });
  };

  return (
    <div className='row mt-5'>
      <div className='col-12 col-md-6 mx-auto p-5'>
        <div className='row'>
          <h2 className='petscare-brand col'>Inscription</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className='d-flex flex-column justify-content-evenly mt-3'>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label fg-color fw-bold'>
              Pseudonyme :
            </label>
            <div className='input-group'>
              <input
                className='form-control'
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span className='input-group-text'>SuperCutePaws99</span>
            </div>
            <div className='form-text fg-color fst-italic'>
              Vous serez visible sur notre site sous ce nom
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label fg-color fw-bold'>
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

          <div className='mb-3 row'>
            <div className='col-12 col-xxl-6'>
              <label
                htmlFor='firstname'
                className='form-label fg-color fw-bold'>
                Prénom :
              </label>
              <div className='input-group'>
                <input
                  className='form-control'
                  type='text'
                  id='firstname'
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <span className='input-group-text'>Élisa</span>
              </div>
            </div>

            <div className='col-12 col-xxl-6 mt-3 mt-xxl-0'>
              <label htmlFor='lastname' className='form-label fg-color fw-bold'>
                Nom de famille :
              </label>
              <div className='input-group'>
                <input
                  className='form-control'
                  type='text'
                  id='lastname'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <span className='input-group-text'>Delajungle</span>
              </div>
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='birthdate' className='form-label fg-color fw-bold'>
              Date de naissance :
            </label>
            <div className='input-group'>
              <input
                className='form-control'
                type='date'
                id='birthdate'
                name='birthdate'
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
              <span className='input-group-text'>05/11/1993</span>
            </div>
          </div>

          <div className='mb-3 row'>
            <div className='col-12 col-xxl-6'>
              <label htmlFor='password' className='form-label fg-color fw-bold'>
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

            <div className='col-12 col-xxl-6 mt-3 mt-xxl-0'>
              <label
                htmlFor='confirmPassword'
                className='form-label fg-color fw-bold'>
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
          </div>

          <button type='submit' className='btn btn-success mt-3 mx-auto'>
            Inscription
          </button>
        </form>
      </div>

      <div className='col-12 col-md-6 mx-auto p-5 rounded-start-2 petscare-background'>
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
