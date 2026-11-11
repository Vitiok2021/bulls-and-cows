import { expect, test } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets';

test('return possible count', () => {
  expect(countPossibleSecrets(4, 10)).toBe(5040);
  expect(countPossibleSecrets(2, 2)).toBe(2);
});
