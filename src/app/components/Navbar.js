import React from 'react';
import Link from 'next/link';
import '../globals.css';

export default function Navbar() {
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
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link href='/' className='nav-link'>
                Accueil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
