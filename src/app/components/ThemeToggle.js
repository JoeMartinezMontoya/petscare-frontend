'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Utiliser useEffect pour ne rendre le thème qu'après le montage sur le client
  useEffect(() => {
    setMounted(true); // Le composant est monté sur le client
  }, []);

  if (!mounted) {
    return null; // Ne pas afficher le bouton avant que le client soit prêt
  }

  // Toggle du thème entre 'light' et 'dark'
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className='btn btn-outline-info theme-toggle-btn mx-2'>
      {theme === 'light' ? (
        <i className='bi bi-moon-stars'></i> // Icône pour le thème clair
      ) : (
        <i className='bi bi-sun'></i> // Icône pour le thème sombre
      )}
    </button>
  );
}
