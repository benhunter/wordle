import React from 'react';

type keyboardProps = {
  handleLetterKeyPress: (key: string) => void;
  handleEnterKeyPress: () => void;
  handleBackKeyPress: () => void;
}

export default function Keyboard({
  handleLetterKeyPress,
  handleEnterKeyPress,
  handleBackKeyPress,
}: keyboardProps) {
  const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  function buildKeyboardButtons(row: string) {
    return (
      row.split('')
        .map((key) => (
          <button
            type="button"
            className="keyboard-key"
            onClick={() => handleLetterKeyPress(key)}
            key={key}
          >
            {key}
          </button>
        ))
    );
  }

  const buildKeyboardRow = (row: string) => (
    <div
      className="keyboard-row"
      key={row}
    >
      {buildKeyboardButtons(row)}
    </div>
  );

  const buildSpecialKeyboardRow = () => (
    <div className="keyboard-row">
      <button
        type="button"
        className="keyboard-key"
        id="key-enter"
        onClick={() => handleEnterKeyPress()}
      >
        ENTER
      </button>
      {buildKeyboardButtons(keyboardRows[2])}
      <button
        type="button"
        className="keyboard-key"
        id="key-back"
        onClick={() => handleBackKeyPress()}
      >
        <span className="material-icons">backspace</span>
      </button>
    </div>
  );

  return (
    <div className="keyboard">
      {buildKeyboardRow(keyboardRows[0])}
      {buildKeyboardRow(keyboardRows[1])}
      {buildSpecialKeyboardRow()}
    </div>
  );
}
