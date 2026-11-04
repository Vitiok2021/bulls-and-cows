export function countPossibleSecrets(length: number, base: number): number {
  if (length === 0) return 1;
  return base * countPossibleSecrets(length - 1, base - 1);
}
