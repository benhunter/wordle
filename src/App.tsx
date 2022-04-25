import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import Word from './Word';

type Guess = {
  letters: string;
  id: number;
}

type GuessState = {
  guesses: Array<Guess>;
  currentGuessIndex: number;
  gameSolved: boolean;
}

const buildInitialGuesses = (): Guess[] => {
  let initialArray: Guess[] = new Array(5).fill({});
  initialArray = initialArray.map(
    (value, index) => ({
      letters: '',
      id: index,
    }),
  );
  return initialArray;
};

const initialGuessState: GuessState = {
  guesses: buildInitialGuesses(),
  currentGuessIndex: 0,
  gameSolved: false,
};

// const initialGuesses: Array<string> = ['ADIEU', 'STORY', 'STARE', 'CLEAR', 'TEARS'];

function App() {
  const [guessState, setGuessState] = useState({ ...initialGuessState });

  const handleLetterKeyPress = (key: string) => {
    const { guesses } = guessState;
    let { gameSolved } = guessState;

    if (gameSolved) return;

    if (guessState.currentGuessIndex < 5) {
      guesses[guessState.currentGuessIndex].letters += key;

      if (guesses[guessState.currentGuessIndex].letters.match('ALERT')) {
        gameSolved = true;
      }
    } else {
      return;
    }

    const currentGuessIndex = guesses[guessState.currentGuessIndex].letters.length < 5
      ? guessState.currentGuessIndex
      : guessState.currentGuessIndex + 1;

    setGuessState({
      guesses,
      currentGuessIndex,
      gameSolved,
    });
  };

  const handleEnterKeyPress = () => {
    console.log('Enter');
  };

  const handleBackKeyPress = () => {
    console.log('Back');
  };

  return (
    <div className="App">
      <h1>WORDLE</h1>
      {guessState.guesses.map((guess, index) => (
        <Word guess={guess.letters} key={guess.id} />
      ))}
      <Keyboard
        handleLetterKeyPress={handleLetterKeyPress}
        handleEnterKeyPress={handleEnterKeyPress}
        handleBackKeyPress={handleBackKeyPress}
      />
    </div>
  );
}

export default App;
