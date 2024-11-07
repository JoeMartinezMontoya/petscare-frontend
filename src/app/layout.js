import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-light'>{children}</body>
    </html>
  );
}
