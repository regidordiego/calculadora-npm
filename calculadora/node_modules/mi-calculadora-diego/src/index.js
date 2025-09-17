/**
 * calcito-aritmetica
 * Funciones aritméticas básicas pensadas para ser reutilizadas.
 * Uso (ESM):
 *   import { add, subtract, multiply, divide } from 'calcito-aritmetica';
 *   add(2, 3) // 5
 */

/** Suma una lista de números. */
export function add(...nums) {
  return nums.reduce((acc, n) => acc + Number(n), 0);
}

/** Resta: a - b */
export function subtract(a, b) {
  return Number(a) - Number(b);
}

/** Multiplica una lista de números. */
export function multiply(...nums) {
  return nums.reduce((acc, n) => acc * Number(n), 1);
}

/**
 * Divide: a / b
 * Lanza un Error si b === 0
 */
export function divide(a, b) {
  const divisor = Number(b);
  if (divisor === 0) {
    throw new Error("No se puede dividir entre 0");
  }
  return Number(a) / divisor;
}

export default { add, subtract, multiply, divide };
