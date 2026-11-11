import { evaluateGuess } from './evaluateGuess';

export type GuessResult = {
  guess: string;
  bulls: number;
  cows: number;
};
export type GameState = {
  secret: string;
  history: GuessResult[];
};
export function updateGameState(currentState: GameState, guess: string): GameState {
  const score = evaluateGuess(currentState.secret, guess);

  const newEntry: GuessResult = {
    guess: guess,
    bulls: score.bulls,
    cows: score.cows,
  };

  return {
    ...currentState,
    history: [...currentState.history, newEntry],
  };
}
