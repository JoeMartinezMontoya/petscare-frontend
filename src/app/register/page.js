'use client';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import PasswordInput from './components/PasswordInput';
import React, { useState, useCallback } from 'react';
import TextInput from './components/TextInput';
import InfoPanel from './components/InfoPanel';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const fieldLabels = {
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    username: "Nom d'utilisateur",
    firstname: 'Prénom',
    lastname: 'Nom',
    birthdate: 'Date de naissance',
  };

  const validateField = useCallback(
    (name, value) => {
      let error = '';
      let successMessage = '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

      switch (name) {
        case 'username':
          if (!value) error = "Nom d'utilisateur requis";
          else if (value.length < 3)
            error = 'Pseudo trop court (min 3 caractères)';
          else successMessage = '✅';
          break;
        case 'email':
          if (!value) error = 'Email requis';
          else if (!emailRegex.test(value)) error = 'Email invalide';
          else successMessage = '✅';
          break;
        case 'password':
          if (!value) error = 'Mot de passe requis';
          else if (!passwordRegex.test(value))
            error =
              'Au moins une majuscule, une minuscule, un chiffre et 12 caractères requis';
          else successMessage = '✅';
          break;
        case 'confirmPassword':
          if (!value) error = 'Veuillez confirmer vos mots de passe';
          else if (value !== formData.password)
            error = 'Les mots de passe ne correspondent pas';
          else successMessage = '✅';
          break;
        case 'firstname':
        case 'lastname':
        case 'birthdate':
          if (!value) error = 'Champ obligatoire';
          else successMessage = '✅';
          break;
        default:
          break;
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
      setSuccess((prev) => ({ ...prev, [name]: successMessage }));
    },
    [formData.password]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    },
    [validateField]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess({});

    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
    await axios
      .post(`${apiUrl}/api/auth/register-user`, formData)
      .then((json) => {
        addFlashMessage(json.data.message, 'success');
        router.push('/login');
      })
      .catch((err) => {
        addFlashMessage(err.response.data.detail || 'Message test', 'danger');
      });
  };

  const handleDemo = () => {
    setFormData({
      username: 'DemoUser',
      email: 'demo@example.com',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: '1990-01-01',
      password: 'DemoPass1234',
      confirmPassword: 'DemoPass1234',
    });
    setErrors({});
  };

  return (
    <div className='row mt-5'>
      <div className='col-12 col-md-6 mx-auto p-5'>
        <h2 className='petscare-brand'>Inscription</h2>
        <form onSubmit={handleSubmit} className='d-flex flex-column mt-3'>
          {Object.keys(formData).map((field) =>
            field !== 'password' && field !== 'confirmPassword' ? (
              <TextInput
                key={field}
                label={fieldLabels[field]}
                name={field}
                type={field === 'birthdate' ? 'date' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                error={errors[field]}
                success={success[field]}
              />
            ) : (
              <PasswordInput
                key={field}
                label={fieldLabels[field]}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                error={errors[field]}
                success={success[field]}
              />
            )
          )}
          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-success mt-3'>
              Inscription
            </button>
            <button
              type='button'
              className='btn btn-secondary mt-3'
              onClick={handleDemo}>
              Remplir Demo
            </button>
          </div>
        </form>
      </div>
      <InfoPanel />
    </div>
  );
}
