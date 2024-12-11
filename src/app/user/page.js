'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';
import axios from 'axios';

export default function UserPage() {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState(true);
  const [formattedBirthDate, setFormattedBirthDate] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setFormattedCreatedAt(
            dayjs(parsedData.createdAt).format('DD MMMM YYYY à HH:mm')
          );
          setFormattedBirthDate(
            dayjs(parsedData.birthDate).format('DD MMMM YYYY')
          );
          setLoading(false);
        } else {
          const token = localStorage.getItem('authToken');
          await axios
            .get(
              `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/show-user`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              dayjs.locale('fr');
              const data = response.data;
              setUserData(data);
              setFormattedCreatedAt(
                dayjs(data.createdAt).format('DD MMMM YYYY à HH:mm')
              );
              setFormattedBirthDate(
                dayjs(data.birthDate).format('DD MMMM YYYY')
              );
              localStorage.setItem('userData', JSON.stringify(data));
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (isAuthenticated === undefined) {
    return (
      <div className='row mt-5 petscare-background'>
        <h2 className='petscare-brand col-10 mx-auto my-5 text-center'>
          Chargement...
        </h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='row mt-5 petscare-background'>
        <h2 className='petscare-brand col-10 mx-auto my-5 text-center'>
          Vous devez vous connecter pour afficher cette page
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='row mt-5 petscare-background'>
        <div className='row'>
          <h1 className='petscare-brand col-10 mx-auto mt-5 text-center'>
            Données en cours de chargement
          </h1>
        </div>
        <div className='row m-5'>
          <div className='spinner-grow m-auto' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='row mt-5 petscare-background'>
        <div className='col-12 col-md-6 mx-auto p-5'>
          <div className='row'>
            {userData ? (
              <>
                <div className='row my-4 align-items-center'>
                  <img src='https://placehold.co/200x200' className='col-2' />

                  <h1 className='petscare-brand col-10'>
                    Bonjour {userData.userName}
                  </h1>
                </div>

                <table className='table table-borderless'>
                  <tbody>
                    <tr>
                      <th scope='row'>
                        <i className='bi bi-card-checklist'></i> Nom
                        d'utilisateur
                      </th>
                      <td colSpan='2'>{userData.userName}</td>
                    </tr>
                    <tr>
                      <th scope='row'>
                        <i className='bi bi-person-badge'></i> Nom
                      </th>
                      <td colSpan='2'>
                        {userData.firstName} {userData.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>
                        <i className='bi bi-mailbox2'></i> Email
                      </th>
                      <td colSpan='2'>{userData.email}</td>
                    </tr>
                    <tr>
                      <th scope='row'>
                        <i className='bi bi-calendar-date'></i> Date de
                        naissance
                      </th>
                      <td colSpan='2'>{formattedBirthDate}</td>
                    </tr>
                    <tr>
                      <th scope='row'>
                        <i className='bi bi-calendar2-check'></i> Membre depuis
                        le
                      </th>
                      <td colSpan='2'>{formattedCreatedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className='row my-4 align-items-center'>
                  <img src='https://placehold.co/200x200' className='col-2' />

                  <h1 className='petscare-brand col-10'>
                    Bonjour
                    <div className='placeholder-wave d-inline mx-2'>
                      <span className='placeholder col-10'></span>
                    </div>
                  </h1>
                </div>
                <table className='table table-borderless'>
                  <tbody>
                    <tr className='placeholder-wave'>
                      <th scope='row'>
                        <span className='placeholder col-8'></span>
                      </th>
                      <td colSpan='2'>
                        <span className='placeholder col-12'></span>
                      </td>
                    </tr>
                    <tr className='placeholder-wave'>
                      <th scope='row'>
                        <span className='placeholder col-8'></span>
                      </th>
                      <td colSpan='2'>
                        <span className='placeholder col-12'></span>
                      </td>
                    </tr>
                    <tr className='placeholder-wave'>
                      <th scope='row'>
                        <span className='placeholder col-8'></span>
                      </th>
                      <td colSpan='2'>
                        <span className='placeholder col-12'></span>
                      </td>
                    </tr>
                    <tr className='placeholder-wave'>
                      <th scope='row'>
                        <span className='placeholder col-3'></span>
                      </th>
                      <td colSpan='2'>
                        <span className='placeholder col-12'></span>
                      </td>
                    </tr>
                    <tr className='placeholder-wave'>
                      <th scope='row'>
                        <span className='placeholder col-4'></span>
                      </th>
                      <td colSpan='2'>
                        <span className='placeholder col-12'></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        <div className='col-12 col-md-6 m-auto p-5'>
          <div id='carouselExampleIndicators' className='carousel slide'>
            <div className='carousel-indicators'>
              <button
                type='button'
                data-bs-target='#carouselExampleIndicators'
                data-bs-slide-to='0'
                className='active'
                aria-current='true'
                aria-label='Slide 1'></button>
              <button
                type='button'
                data-bs-target='#carouselExampleIndicators'
                data-bs-slide-to='1'
                aria-label='Slide 2'></button>
              <button
                type='button'
                data-bs-target='#carouselExampleIndicators'
                data-bs-slide-to='2'
                aria-label='Slide 3'></button>
            </div>
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <img
                  src='https://placehold.co/400x200'
                  className='d-block w-50 m-auto'
                />
              </div>
              <div className='carousel-item'>
                <img
                  src='https://placehold.co/400x200'
                  className='d-block w-50 m-auto'
                />
              </div>
              <div className='carousel-item'>
                <img
                  src='https://placehold.co/400x200'
                  className='d-block w-50 m-auto'
                />
              </div>
            </div>
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#carouselExampleIndicators'
              data-bs-slide='prev'>
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'></span>
              <span className='visually-hidden'>Previous</span>
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#carouselExampleIndicators'
              data-bs-slide='next'>
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'></span>
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
