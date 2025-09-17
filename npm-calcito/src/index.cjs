// CommonJS proxy para compatibilidad con require()
// Nota: la implementación real vive en ESM (src/index.js)
const add = (...nums) => nums.reduce((acc, n) => acc + Number(n), 0);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (...nums) => nums.reduce((acc, n) => acc * Number(n), 1);
const divide = (a, b) => {
  const divisor = Number(b);
  if (divisor === 0) throw new Error("No se puede dividir entre 0");
  return Number(a) / divisor;
};
module.exports = { add, subtract, multiply, divide };
