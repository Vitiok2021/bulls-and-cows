export function isValidGuess(guess: string, length: number, base: number) {
  const isCorrectLength = guess.length === length;
  const isUnique = guess.split('').every((char, index) => guess.indexOf(char) === index);
  const isValidChars = guess.split('').every((char) => !Number.isNaN(parseInt(char, base)));

  return isCorrectLength && isUnique && isValidChars;
}
