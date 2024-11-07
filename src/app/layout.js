'use client';
import 'bootswatch/dist/minty/bootstrap.min.css';
import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Script from 'next/script';

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
        <Script
          src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
          strategy='beforeInteractive'
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
