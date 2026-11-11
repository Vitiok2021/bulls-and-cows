import { expect, test } from 'vitest';
import { isValidGuess } from './isValidGuess';

test('isValidGuess should check players guess', () => {
  expect(isValidGuess('1234', 4, 10)).toBe(true);
  expect(isValidGuess('123', 4, 10)).toBeFalsy();
  expect(isValidGuess('1123', 4, 10)).toBeFalsy();
  expect(isValidGuess('123a', 4, 10)).toBeFalsy();
});
