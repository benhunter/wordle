import React from 'react';
import getSolutionWord from './GetSolutionWord';

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
  return (
    <div className="word">
      {guess.padEnd(5, ' ')
        .split('')
        .map((letter, index) => (
          <div
            className={`letter ${showColors && letter === getSolutionWord()[index] ? 'green ' : ''}${doShake ? 'shake' : ''}`}
            key={letter + index.toString()}
            data-testid={`${showColors && letter === (getSolutionWord())[index] ? 'green' : ''}`}
            onAnimationEnd={() => endShakeCallback()}
          >
            {letter}
          </div>
        ))}
    </div>
  );
}
