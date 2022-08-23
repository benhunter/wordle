import React from 'react';
import getSolutionWord from './getSolutionWord';

type WordProps = {
  guess: string;
  showColors: boolean;
  doShake: boolean;
  endShakeCallback: () => void;
}

export default function Word({
  guess,
  showColors,
  doShake,
  endShakeCallback,
}: WordProps) {
  function getLetterColor(letter: string, index: number) {
    let color = '';
    if (showColors) {
      if (letter === getSolutionWord()[index]) {
        color = 'green';
      } else if (getSolutionWord().includes(letter)) {
        // was letter already marked?
        // is this the second occurrence of letter in guess?
        if (guess.slice(0, index).includes(letter)) {
          // does solution have letter more than once?
          if ([getSolutionWord().matchAll(new RegExp(letter, 'g'))].length > 1) {
            color = 'yellow';
          }
        } else {
          color = 'yellow';
        }
      }
    }
    return color;
  }

  function getWordColors() {
    return ['', '', '', '', ''];
  }

  return (
    <div className="word">
      {guess.padEnd(5, ' ')
        .split('')
        .map((letter, index) => (
          <div
            className={`letter ${(getLetterColor(letter, index))}${doShake ? 'shake' : ''}`}
            key={letter + index.toString()}
            data-testid="guess-letter"
            onAnimationEnd={() => endShakeCallback()}
          >
            {letter}
          </div>
        ))}
    </div>
  );
}
