import { numberFormat } from 'futures/utils/numberFormat';

test('input 123 output 123', () => {
  expect(numberFormat('123')).toBe('123');
});

test('input 12345 output 12,345', () => {
  expect(numberFormat('12345')).toBe('12,345');
});

test('input 12345.3422 output 12,345.3422', () => {
  expect(numberFormat('12345.3422')).toBe('12,345.3422');
});

test('input int 12345 output str 12,345', () => {
  expect(numberFormat(12345)).toBe('12,345');
});

test('input 12,345 output 12,345', () => {
  expect(numberFormat('12,345')).toBe('12,345');
});
