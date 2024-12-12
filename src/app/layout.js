'use client';
import { FlashMessageProvider } from './contexts/FlashMessageContext';
import { AuthProvider } from './contexts/AuthContext';
import FlashMessage from './components/FlashMessage';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import Script from 'next/script';
import React from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Charger Bootstrap uniquement si le DOM est défini
    if (typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <title>PetsCare - Home</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
        />
      </head>
      <body className='petscare-body-bg'>
        <ThemeProvider attribute='data-theme' defaultTheme='light'>
          <AuthProvider>
            <FlashMessageProvider>
              <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
                strategy='beforeInteractive'
              />
              <Navbar />
              <FlashMessage />
              {children}
            </FlashMessageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
