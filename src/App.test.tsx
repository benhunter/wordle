import React from 'react';
import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import getSolutionWord from './getSolutionWord';

let app: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;
jest.mock('./getSolutionWord');

const mockGetSolutionWord = getSolutionWord as jest.MockedFunction<typeof getSolutionWord>;

const clickButton = (name: string) => {
  userEvent.click(screen.getByRole('button', { name }));
};

beforeEach(() => {
  mockGetSolutionWord.mockReturnValue('ALERT');
  app = render(<App DEBUG={false} />);
});

test('renders title', () => {
  const titleText = screen.getByText(/wordle/i);
  expect(titleText).toBeInTheDocument();
});

test.skip('renders five empty guesses', () => {
  expect(screen.getAllByText('A')).toBeInTheDocument();
  expect(false).toBeTruthy();
});

test('When I guess the correct word the letters are all green and the game ends', () => {
  clickButton('A');
  clickButton('L');
  clickButton('E');
  clickButton('R');
  clickButton('T');
  clickButton('ENTER');

  clickButton('X');
  expect(screen.getAllByText(/x/i)).toHaveLength(1);

  expect(screen.getAllByText('A')[0]).toHaveClass('green');
  expect(screen.getAllByText('L')[0]).toHaveClass('green');
  expect(screen.getAllByText('E')[0]).toHaveClass('green');
  expect(screen.getAllByText('R')[0]).toHaveClass('green');
  expect(screen.getAllByText('T')[0]).toHaveClass('green');
});

test('When I press the backspace, characters in the current guess are removed', () => {
  clickButton('A');
  clickButton('backspace');

  expect(screen.getByText('A')).toBeInTheDocument();
});

test('When I try to Enter an invalid word, the row shakes', async () => {
  clickButton('Q');
  clickButton('Q');
  clickButton('Q');
  clickButton('Q');
  clickButton('Q');
  userEvent.click(screen.getByRole('button', { name: /enter/i }));

  expect(screen.getAllByText(/q/i)[0]).toHaveClass('shake');

  fireEvent.animationEnd(screen.getAllByText(/q/i)[0]);

  expect(screen.getAllByText(/q/i)[0]).not.toHaveClass('shake');
});

test('When I Enter a word in the dictionary the correct letters and positions are colored', () => {
  clickButton('A');
  clickButton('W');
  clickButton('A');
  clickButton('R');
  clickButton('E');
  clickButton('ENTER');
  expect(screen.getAllByText('A')[0]).toHaveClass('green');
  expect(screen.getAllByText('W')[0]).not.toHaveClass('green');
  expect(screen.getAllByText('W')[0]).not.toHaveClass('yellow');
  expect(screen.getAllByText('A')[1]).not.toHaveClass('yellow');
  expect(screen.getAllByText('A')[1]).not.toHaveClass('green');
  expect(screen.getAllByText('R')[0]).toHaveClass('green');
  expect(screen.getAllByText('E')[0]).toHaveClass('yellow');
});

test.skip('When a guess has double letters, but solution does not, the only one of the letter will be marked. mark the correct guess first, leave the double letter grey', () => {
  expect(false).toBeTruthy();
});

test('Backspace should not work after game solve', () => {
  clickButton('A');
  clickButton('L');
  clickButton('E');
  clickButton('R');
  clickButton('T');
  clickButton('ENTER');
  clickButton('backspace');
  expect(screen.getAllByText('T')).toHaveLength(2);
});

test.skip('Pressing Enter shakes if not enough letters', () => {
  expect(false).toBeTruthy();
});

test.skip('Pressing more than five letters shakes', () => {
  expect(false).toBeTruthy();
});
