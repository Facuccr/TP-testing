import { describe, expect, it } from 'vitest';
import { calcularPrecioFinal } from '../src/services/precios.ts';

describe('calcularPrecioFinal', () => {
  it('aplica un descuento del 10 %', () => {
    expect(calcularPrecioFinal(1000, 10)).toBe(900);
  });

  it('conserva el precio si el descuento es cero', () => {
    expect(calcularPrecioFinal(1000, 0)).toBe(1000);
  });

  it('rechaza descuentos superiores al 100 %', () => {
    expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError);
  });

  it('devuelve cero con un descuento del 100 %', () => {
  expect(calcularPrecioFinal(1000, 100)).toBe(0);
  });

  it('devuelve cero con un descuento del 100 %', () => {
  expect(calcularPrecioFinal(1000, 100)).toBe(0);
});

it('lanza RangeError si el precio es negativo', () => {
  expect(() => calcularPrecioFinal(-100, 10)).toThrow(RangeError);
});

it('lanza RangeError si el descuento es negativo', () => {
  expect(() => calcularPrecioFinal(1000, -10)).toThrow(RangeError);
});

it('lanza RangeError si el precio es NaN', () => {
  expect(() => calcularPrecioFinal(NaN, 10)).toThrow(RangeError);
});
});
