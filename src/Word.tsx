import React from 'react';

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
            className={`letter ${showColors && letter === 'ALERT'[index] ? 'green ' : ''}${doShake ? 'shake' : ''}`}
            key={letter + index.toString()}
            data-testid={`${showColors && letter === 'ALERT'[index] ? 'green' : ''}`}
            onAnimationEnd={() => endShakeCallback()}
          >
            {letter}
          </div>
        ))}
    </div>
  );
}
