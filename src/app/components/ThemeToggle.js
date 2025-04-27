'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className='btn btn-outline-info theme-toggle-btn mx-2'>
      {theme === 'light' ? (
        <i className='bi bi-moon-stars'></i>
      ) : (
        <i className='bi bi-sun'></i>
      )}
    </button>
  );
}
