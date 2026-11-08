export type GuessResult = {
  guess: string;
  bulls: number;
  cows: number;
};
export type GameState = {
  history: GuessResult[];
};
export function updateGameState(currentState: GameState, guess: string): GameState {
  console.log(currentState, guess);
  return currentState;
}
