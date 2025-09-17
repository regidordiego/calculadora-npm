export function add(...nums: number[]): number;
export function subtract(a: number, b: number): number;
export function multiply(...nums: number[]): number;
export function divide(a: number, b: number): number;
declare const _default: {
  add: typeof add;
  subtract: typeof subtract;
  multiply: typeof multiply;
  divide: typeof divide;
};
export default _default;
