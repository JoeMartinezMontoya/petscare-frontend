import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import React from 'react';
import '../globals.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='navbar navbar-expand-lg bg-transparent petscare-brand'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          PetsCare
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarColor01'>
          {/* Liens principaux */}
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link href='/' className='nav-link'>
                Accueil
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link href='/user' className='nav-link'>
                    Mon profil
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className='navbar-nav ms-auto'>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link href='/register' className='btn btn-secondary mx-1'>
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link href='/login' className='btn btn-info mx-1'>
                    Connexion
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logout} className='btn btn-info'>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
