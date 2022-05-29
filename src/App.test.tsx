import React from 'react';
import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

let app: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;

beforeEach(() => {
  app = render(<App DEBUG={false} />);
});

test('renders title', () => {
  const titleText = screen.getByText(/wordle/i);
  expect(titleText).toBeInTheDocument();
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

const click = (name: string) => {
  userEvent.click(screen.getByRole('button', { name }));
};

test('When I Enter a word in the dictionary the correct letters and positions are colored', () => {
  click('A');
  click('W');
  click('A');
  click('R');
  click('E');
  click('ENTER');
  expect(screen.getAllByText('A')[0]).toHaveClass('green');
  expect(screen.getAllByText('W')[0]).not.toHaveClass('green');
  expect(screen.getAllByText('W')[0]).not.toHaveClass('yellow');
  expect(screen.getAllByText('A')[1]).not.toHaveClass('yellow');
  expect(screen.getAllByText('A')[1]).not.toHaveClass('green');
  expect(screen.getAllByText('R')[0]).toHaveClass('green');
  expect(screen.getAllByText('E')[0]).toHaveClass('yellow');
});

test.skip('When a guess has double letters, but solution does not, the only one of the letter will be marked. mark the correct guess first, leave the double letter grey', () => {
  expect(false);
});

test.skip('Backspace should not work after game solve', () => {
  expect(false);
});

test.skip('Pressing Enter shakes if not enough letters', () => {
  expect(false);
});
