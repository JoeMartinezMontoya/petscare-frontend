'use client';
import { FlashMessageProvider } from './contexts/FlashMessageContext';
import { AuthProvider } from './contexts/AuthContext';
import FlashMessage from './components/FlashMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import Script from 'next/script';
import React from 'react';
import ReactQueryProvider from './components/ReactQueryProvider';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout({ children }) {
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
        <ReactQueryProvider>
          <ThemeProvider attribute='data-theme' defaultTheme='light'>
            <UserProvider>
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
            </UserProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
