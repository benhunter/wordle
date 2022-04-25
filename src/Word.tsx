import React from 'react';

type WordProps = {
  guess: string;
}

export default function Word({ guess }: WordProps) {
  return (
    <div className="word">
      {guess.padEnd(5, ' ')
        .split('')
        .map((letter, index) => (
          <div
            className="letter"
            key={letter + index.toString()}
          >
            {letter}
          </div>
        ))}
    </div>
  );
}
