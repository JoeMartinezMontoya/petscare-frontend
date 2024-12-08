'use client';
import { FlashMessageProvider } from './contexts/FlashMessageContext';
import { AuthProvider } from './contexts/AuthContext';
import FlashMessage from './components/FlashMessage';
import ThemeToggle from './components/ThemeToggle';
import 'bootswatch/dist/minty/bootstrap.min.css';
import Navbar from './components/Navbar';
import './contexts/FlashMessageContext';
import { useEffect } from 'react';
import Script from 'next/script';
import React from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    typeof document !== 'undefined'
      ? require('bootstrap/dist/js/bootstrap.bundle.min.js')
      : null;
  }, []);

  return (
    <html lang='en'>
      <head>
        <title>PetsCare - Home</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='petscare-body-bg'>
        <AuthProvider>
          <FlashMessageProvider>
            <Script
              src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
              strategy='beforeInteractive'
            />
            <Navbar />
            <ThemeToggle />
            <FlashMessage />
            {children}
          </FlashMessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
