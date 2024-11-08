import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../page.js';

test('renders welcome message', () => {
  render(<Home />);
  const welcomeElement = screen.getByText(/Welcome to PetsCare!/i);
  expect(welcomeElement).toBeInTheDocument();
});
