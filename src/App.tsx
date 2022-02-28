import React, { useState } from 'react';
import './App.css';

type WordProps = {
  guess: string;
}

function Word({ guess }: WordProps) {
  return (
    <div className="word">
      {guess.padEnd(5, ' ').split('').map((letter) => (<div className="letter">{letter}</div>))}
    </div>
  );
}

type keyboardProps = {
  handleKeyPress: (key: string)=>void;
}

function Keyboard({ handleKeyPress }: keyboardProps) {
  const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  const buildKeyboardRow = (row: string) => (
    <div className="keyboard-row">
      {row.split('').map((key) => (
        <button
          type="button"
          className="keyboard-key"
          onClick={() => handleKeyPress(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );

  return (
    <div className="keyboard">
      {keyboardRows.map((row) => buildKeyboardRow(row))}
    </div>
  );
}

type GuessState = {
  guesses: Array<string>;
  currentWord: number;
}
const initialGuessState: GuessState = { guesses: ['', '', '', '', ''], currentWord: 0 };
// const initialGuesses: Array<string> = ['ADIEU', 'STORY', 'STARE', 'CLEAR', 'TEARS'];

function App() {
  const [guessState, setGuessState] = useState({ ...initialGuessState });

  const handleKeyPress = (key: string) => {
    console.log(key);

    const newGuesses = guessState.guesses;
    if (guessState.currentWord < 5) {
      newGuesses[guessState.currentWord] += key;
    } else {
      return;
    }
    const newCurrentWord = newGuesses[guessState.currentWord].length < 5
      ? guessState.currentWord
      : guessState.currentWord + 1;

    setGuessState({
      guesses: newGuesses,
      currentWord: newCurrentWord,
    });
  };

  return (
    <div className="App">
      <h1>WORDLE</h1>
      {guessState.guesses.map((guess) => <Word guess={guess} />)}
      <Keyboard handleKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
