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
          const token = localStorage.getItem('authToken'); // Récupère le token stocké
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/show-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Met à jour les données utilisateur avec la réponse
          setUserData(response.data);
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

    fetchUserData(); // Appelle la fonction uniquement une fois
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className='container mt-5'>
      <h1 className='petscare-brand'>Mon Profil</h1>
      {userData ? (
        <div>
          <p>
            <strong>Nom :</strong> {userData.name}
          </p>
          <p>
            <strong>Email :</strong> {userData.email}
          </p>
          {/* Tu peux ajouter plus d'informations ici */}
        </div>
      ) : (
        <p>Aucune donnée utilisateur trouvée.</p>
      )}
    </div>
  );
}
