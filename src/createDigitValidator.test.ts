import { expect, test } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

test('should validate', () => {
  const isDecDigit = createDigitValidator(10);
  expect(isDecDigit('5')).toBe(true);
  expect(isDecDigit('a')).toBeFalsy();

  const isHexDigit = createDigitValidator(16);
  expect(isHexDigit('9')).toBe(true);
  expect(isHexDigit('f')).toBe(true);
  expect(isHexDigit('F')).toBe(true);
  expect(isHexDigit('g')).toBeFalsy();
});
