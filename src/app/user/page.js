'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function UserPage() {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/show-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des données utilisateur :',
            error
          );
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
      <h1 className='petscare-brand mt-5 text-center'>
        Prénom Nom OU Username
      </h1>
      <div className='row mt-5 petscare-background'>
        <div className='col-12 col-md-6 mx-auto p-5'>
          <div className='row'>
            {userData ? (
              <div>
                <p>
                  <strong>Id:</strong> {userData.id}
                </p>
                <p>
                  <strong>Email :</strong> {userData.email}
                </p>
                <p>
                  <strong>Rôle :</strong> {userData.role}
                </p>
                {/* Tu peux ajouter plus d'informations ici */}
              </div>
            ) : (
              <p>Chargement en cours...</p>
            )}
          </div>
        </div>
        <div className='col-12 col-md-6 mx-auto p-5'>
          <h1 className='petscare-brand'>Photos ?</h1>
        </div>
      </div>
    </>
  );
}
