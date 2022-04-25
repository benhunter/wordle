import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

test('renders title', () => {
  const titleText = screen.getByText(/wordle/i);
  expect(titleText)
    .toBeInTheDocument();
});

test('renders five empty guesses', () => {
  expect(screen.getByRole);
});

test('When I guess the correct word the letters are all green and the game ends', () => {
  userEvent.click(screen.getByRole('button', { name: 'A' }));
  userEvent.click(screen.getByRole('button', { name: 'L' }));
  userEvent.click(screen.getByRole('button', { name: 'E' }));
  userEvent.click(screen.getByRole('button', { name: 'R' }));
  userEvent.click(screen.getByRole('button', { name: 'T' }));
  userEvent.click(screen.getByRole('button', { name: /enter/i }));

  userEvent.click(screen.getByRole('button', { name: /^x$/i }));
  expect(screen.getAllByText(/x/i)).toHaveLength(1);
});
