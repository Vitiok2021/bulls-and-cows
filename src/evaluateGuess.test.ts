import { expect, test } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

test('evaluateGuess should correctly count bulls and cows', () => {
  expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  expect(evaluateGuess('1234', '1354')).toEqual({ bulls: 2, cows: 1 });
});
