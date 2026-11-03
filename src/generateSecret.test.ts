import { expect, test, vi } from 'vitest';
import { generateSecret } from './generateSecret';

test('generateSecret should generate a unique string of correct length and base', () => {
  const mockRandom = vi
    .fn()
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.9);

  const secret = generateSecret(3, 10, mockRandom);

  expect(secret).toBe('159');
  expect(secret).toHaveLength(3);
  expect(mockRandom).toHaveBeenCalledTimes(4);
});
