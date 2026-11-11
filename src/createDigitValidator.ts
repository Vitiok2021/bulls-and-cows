export function createDigitValidator(base: number) {
  return (char: string) => {
    const lower = char.toLowerCase();
    const parsed = parseInt(lower, base);
    return !Number.isNaN(parsed);
  };
}
