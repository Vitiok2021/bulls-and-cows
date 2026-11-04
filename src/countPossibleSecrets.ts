export function countPossibleSecrets(
  length: number,
  base: number,
  cache: Record<string, number> = {},
): number {
  const key = `${length}-${base}`;
  if (key in cache) {
    return cache[key]!;
  }
  if (length === 0) return 1;
  const result = base * countPossibleSecrets(length - 1, base - 1, cache);
  cache[key] = result;
  return result;
}
