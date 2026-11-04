export function createDigitValidator(base: number) {
  return (char: string) => {
    console.log(base, char);
    return false;
  };
}
