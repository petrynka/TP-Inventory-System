import { formatDate, formatCurrency, calculateOrderTotal } from '../utils/formatters';
import { describe, test, expect } from 'vitest'

describe('formatDate', () => {
  test('formats valid date', () => {
    const date = formatDate('2024-10-06');
    expect(date.short).toMatch(/\d{2} \D+/);
    expect(date.full).toMatch(/\d{2} \D+ \d{4}/);
  });

  test('returns fallback on invalid date', () => {
    const date = formatDate('invalid');
    expect(date.short).toBe('Невідома дата');
  });
});

describe('formatCurrency', () => {
  test('formats UAH correctly', () => {
    expect(formatCurrency(1234.56)).toBe('1 234,56 uah');
  });

  test('returns 0 for invalid input', () => {
    expect(formatCurrency('wrong')).toBe('0');
  });
});

describe('calculateOrderTotal', () => {
  test('returns zero total for empty input', () => {
    const result = calculateOrderTotal([]);
    expect(result.usd).toBe(0);
    expect(result.uah).toBe(0);
  });

  test('calculates correct total', () => {
    const products = [
      { price: [{ symbol: 'USD', value: 10 }, { symbol: 'UAH', value: 400 }] },
      { price: [{ symbol: 'USD', value: 5 }] },
    ];
    const result = calculateOrderTotal(products);
    expect(result.usd).toBe(15);
    expect(result.uah).toBe(400);
  });
});
