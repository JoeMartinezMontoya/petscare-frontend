import TextInput from '@/app/register/components/TextInput';
import axios from 'axios';
import React, { useState } from 'react';

async function sendAnnouncementForm() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/api/announcements/create-announcement`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }
  );

  console.log(response);

  return response;
}

export default function AnnouncementForm({ type }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
    expiration_date: '',
    contact_info: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendAnnouncementForm();
  };

  return (
    <>
      <h2 className='petscare-brand'>Avis de {type}</h2>

      <form onSubmit={handleSubmit} className='d-flex flex-column'>
        <TextInput
          label='Titre'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />

        <TextInput
          label='Contenu'
          name='content'
          value={formData.content}
          onChange={handleChange}
          textarea
        />

        <label>Date d&apos;expiration</label>
        <TextInput
          type='date'
          name='expiration_date'
          value={formData.expiration_date}
          onChange={handleChange}
        />

        <TextInput
          label='Contact Info'
          name='contact_info'
          value={formData.contact_info}
          onChange={handleChange}
        />

        <button type='submit' className='btn btn-primary col-3'>
          Publier l&apos;annonce
        </button>
      </form>
    </>
  );
}
