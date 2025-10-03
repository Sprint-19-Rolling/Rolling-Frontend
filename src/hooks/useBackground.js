// src/hooks/useBackground.js
// 배경색상 Hook
import { useState } from 'react';

let backgroundColorState = '';
let listeners = [];

export function useBackground() {
  const [backgroundColor, setBackgroundColor] = useState(backgroundColorState);

  const setBackground = (color) => {
    backgroundColorState = color;
    setBackgroundColor(color);
    listeners.forEach((l) => l(color));
  };

  if (!listeners.includes(setBackgroundColor)) {
    listeners.push(setBackgroundColor);
  }

  return { backgroundColor, setBackground };
}
