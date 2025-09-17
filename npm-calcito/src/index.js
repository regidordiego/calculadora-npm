
export function add(...nums) {
  return nums.reduce((acc, n) => acc + Number(n), 0);
}


export function subtract(a, b) {
  return Number(a) - Number(b);
}


export function multiply(...nums) {
  return nums.reduce((acc, n) => acc * Number(n), 1);
}


export function divide(a, b) {
  const divisor = Number(b);
  if (divisor === 0) {
    throw new Error("No se puede dividir entre 0");
  }
  return Number(a) / divisor;
}

export default { add, subtract, multiply, divide };
