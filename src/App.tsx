import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import Word from './Word';
import getSolutionWord from './GetSolutionWord';

type AppProps = {
  DEBUG: boolean
}

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

function App({ DEBUG = false }: AppProps) {
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

    function isGuessFiveLetters() {
      return guessState.guesses[guessState.currentGuessIndex].letters.length === 5;
    }

    function isGuessInDictionary() {
      return true;
    }

    function isSolved() {
      return guessState.guesses[guessState.currentGuessIndex].letters === getSolutionWord();
    }

    if (isGuessFiveLetters()) {
      if (isGuessInDictionary()) {
        // yes - check for solution or go to next guess
        if (isSolved()) {
          // end game
          const { guesses } = guessState;
          guesses[guessState.currentGuessIndex].entered = true;
          setGuessState({
            ...guessState,
            guesses,
            gameSolved: true,
          });
        } else {
          const { guesses } = guessState;
          guesses[guessState.currentGuessIndex].entered = true;
          const currentGuessIndex = guessState.currentGuessIndex + 1;

          setGuessState({
            ...guessState,
            guesses,
            currentGuessIndex,
          });
        }
      } else {
        // no - shake and stay on current guess
        setDoShake(true);
      }
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

  function renderDebug() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      >
        <div>
          DEBUG:
        </div>
        <br />
        <div>
          Solution is
          {' '}
          {getSolutionWord()}
        </div>
        <br />
        <div style={{ textAlign: 'left' }}>
          GuessState is
          <br />
          {' '}
          {JSON.stringify(guessState)}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>WORDLE</h1>
      {guessState.guesses.map((guess) => (
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
      {DEBUG && renderDebug()}
    </div>
  );
}

export default App;
