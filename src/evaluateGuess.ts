export function evaluateGuess(secret: string, guess: string) {
  const bullsCount = guess.split('').filter((digit, index) => digit === secret[index]).length;
  const cowsCount = guess
    .split('')
    .filter((digit, index) => secret.includes(digit) && digit !== secret[index]).length;

  return { bulls: bullsCount, cows: cowsCount };
}
