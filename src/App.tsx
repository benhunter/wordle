import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import Word from './Word';

type Guess = {
  letters: string;
  id: number;
  entered: boolean;
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
      entered: false,
    }),
  );
  return initialArray;
};

// const initialGuesses: Array<string> = ['ADIEU', 'STORY', 'STARE', 'CLEAR', 'TEARS'];

function App() {
  const initialGuessState: GuessState = {
    guesses: buildInitialGuesses(),
    currentGuessIndex: 0,
    gameSolved: false,
  };

  const [guessState, setGuessState] = useState({ ...initialGuessState });
  const [doShake, setDoShake] = useState(false);

  const handleLetterKeyPress = (key: string) => {
    const {
      guesses,
      currentGuessIndex,
    } = guessState;
    const { gameSolved } = guessState;

    if (gameSolved) return;

    if (guessState.currentGuessIndex < 5) {
      if (guesses[guessState.currentGuessIndex].letters.length < 5) {
        guesses[guessState.currentGuessIndex].letters += key;
      }
    } else {
      return;
    }

    // const currentGuessIndex = guesses[guessState.currentGuessIndex].letters.length < 5
    //   ? guessState.currentGuessIndex
    //   : guessState.currentGuessIndex + 1;

    setGuessState({
      guesses,
      currentGuessIndex,
      gameSolved,
    });
  };

  const handleEnterKeyPress = () => {
    if (guessState.gameSolved) return;

    if (guessState.guesses[guessState.currentGuessIndex].letters.length === 5) {
      const { guesses } = guessState;

      setDoShake(true);

      guesses[guessState.currentGuessIndex].entered = true;

      setGuessState({
        ...guessState,
        guesses,
      });
    }
  };

  const handleBackKeyPress = () => {
    if (guessState.guesses[guessState.currentGuessIndex].letters.length > 0) {
      const { guesses } = guessState;
      const currentGuess: Guess = guesses[guessState.currentGuessIndex];
      currentGuess.letters = currentGuess.letters.slice(0, currentGuess.letters.length - 1);

      setGuessState({
        ...guessState,
        guesses,
      });
    }
  };

  return (
    <div className="App">
      <h1>WORDLE</h1>
      {guessState.guesses.map((guess, index) => (
        <Word
          guess={guess.letters}
          showColors={guess.entered}
          key={guess.id}
          doShake={doShake && guessState.guesses[guessState.currentGuessIndex].id === guess.id}
          endShakeCallback={() => (setDoShake(false))}
        />
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
