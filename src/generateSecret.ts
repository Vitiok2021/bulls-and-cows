export function generateSecret(
  length: number,
  base: number,
  random = Math.random,
  currentSecret: string = '',
): string {
  if (currentSecret.length === length) {
    return currentSecret;
  }
  const randomDigit = Math.floor(random() * base).toString(base);

  if (currentSecret.includes(randomDigit)) {
    return generateSecret(length, base, random, currentSecret);
  } else {
    return generateSecret(length, base, random, currentSecret + randomDigit);
  }
}
