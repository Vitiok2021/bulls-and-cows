import { expect, test } from 'vitest';
import { updateGameState, type GameState } from './updateGameState';

test('check user state', () => {
  const initialState: GameState = { history: [] };
  const newState = updateGameState(initialState, '1234');

  expect(newState.history.length).toEqual(1);
  expect(initialState.history.length).toEqual(0);
});
