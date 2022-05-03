import React from 'react';
import {
  fireEvent, getByText,
  render, RenderResult, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from './App';

let app: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;

beforeEach(() => {
  app = render(<App />);
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
  expect(screen.getAllByTestId('green')).toHaveLength(5);
});

test('When I press the backspace, characters in the current guess are removed', () => {
  userEvent.click(screen.getByRole('button', { name: 'A' }));
  userEvent.click(screen.getByRole('button', { name: 'backspace' }));

  expect(screen.getByText('A')).toBeInTheDocument();
});

test('When I try to Enter an invalid word, the row shakes', async () => {
  userEvent.click(screen.getByRole('button', { name: 'Q' }));
  userEvent.click(screen.getByRole('button', { name: 'Q' }));
  userEvent.click(screen.getByRole('button', { name: 'Q' }));
  userEvent.click(screen.getByRole('button', { name: 'Q' }));
  userEvent.click(screen.getByRole('button', { name: 'Q' }));
  userEvent.click(screen.getByRole('button', { name: /enter/i }));

  expect(screen.getAllByText(/q/i)[0]).toHaveClass('shake');

  fireEvent.animationEnd(screen.getAllByText(/q/i)[0]);

  expect(screen.getAllByText(/q/i)[0]).not.toHaveClass('shake');
});
