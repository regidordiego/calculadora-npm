// Nota: instala primero el paquete con `npm i calcito-aritmetica-diego24`.
// Si usas otro nombre al publicar, actualiza la ruta debajo.
import { add, subtract, multiply, divide } from './node_modules/mi-calculadora-diego/src/index.js';

const inputEl = document.getElementById('input');
const operatorEls = document.querySelectorAll('.operators div');
const numberEls = document.querySelectorAll('.numbers div');
const equalEl = document.getElementById('result');
const clearEl = document.getElementById('clear');

let buffer = '';

function render() {
  inputEl.textContent = buffer;
}

function appendChar(ch) {
  buffer += ch;
  render();
}

function isOperator(ch) {
  return ch === '+' || ch === '-' || ch === '×' || ch === '÷';
}

function canAppendDot() {
  // Evita dos '.' en el mismo número
  const parts = buffer.split(/[+\-×÷]/);
  const last = parts[parts.length - 1];
  return !last.includes('.');
}

function sanitizeBuffer() {
  // Si acaba en operador, lo quitamos para evaluar
  if (buffer.length && isOperator(buffer[buffer.length - 1])) {
    buffer = buffer.slice(0, -1);
  }
}

function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === ' ') { i++; continue; }
    if (isOperator(ch)) {
      // Soportar negativos unarios: si es '-' y está al inicio o tras otro operador, se trata como parte del número
      const prev = tokens[tokens.length - 1];
      const isUnaryMinus = ch === '-' && (tokens.length === 0 || (typeof prev === 'string' && isOperator(prev)));
      if (isUnaryMinus) {
        // adjuntar al número que sigue
        let j = i + 1;
        let numStr = '-';
        while (j < expr.length && /[0-9.]/.test(expr[j])) {
          numStr += expr[j++];
        }
        if (numStr === '-' || numStr === '-.') throw new Error('Expresión inválida');
        tokens.push(parseFloat(numStr));
        i = j;
        continue;
      } else {
        tokens.push(ch);
        i++;
        continue;
      }
    }
    if (/[0-9.]/.test(ch)) {
      let j = i;
      let numStr = '';
      while (j < expr.length && /[0-9.]/.test(expr[j])) {
        numStr += expr[j++];
      }
      if (numStr.split('.').length > 2) throw new Error('Número mal formado');
      tokens.push(parseFloat(numStr));
      i = j;
      continue;
    }
    throw new Error('Carácter no reconocido: ' + ch);
  }
  return tokens;
}

function shuntingYard(tokens) {
  const out = [];
  const ops = [];
  const prec = { '+': 1, '-': 1, '×': 2, '÷': 2 };
  const applyOp = () => {
    const op = ops.pop();
    const b = out.pop();
    const a = out.pop();
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Expresión inválida');
    switch (op) {
      case '+': out.push(add(a, b)); break;
      case '-': out.push(subtract(a, b)); break;
      case '×': out.push(multiply(a, b)); break;
      case '÷': out.push(divide(a, b)); break;
      default: throw new Error('Operador desconocido: ' + op);
    }
  };
  for (const t of tokens) {
    if (typeof t === 'number') {
      out.push(t);
    } else if (isOperator(t)) {
      while (ops.length && prec[ops[ops.length - 1]] >= prec[t]) {
        applyOp();
      }
      ops.push(t);
    } else {
      throw new Error('Token inválido');
    }
  }
  while (ops.length) applyOp();
  if (out.length !== 1) throw new Error('Expresión inválida');
  return out[0];
}

function evaluateExpression(expr) {
  const tokens = tokenize(expr);
  return shuntingYard(tokens);
}

// Eventos de UI
numberEls.forEach(el => {
  el.addEventListener('click', () => {
    const val = el.textContent;
    if (val === '.') {
      if (canAppendDot()) appendChar('.');
    } else {
      appendChar(val);
    }
  });
});

operatorEls.forEach(el => {
  el.addEventListener('click', () => {
    const op = el.textContent;
    if (!buffer && op !== '-') return; // evitar operador al inicio, salvo '-'
    if (buffer && isOperator(buffer[buffer.length - 1])) {
      // reemplazar operador si el último también lo era
      buffer = buffer.slice(0, -1) + op;
      render();
    } else {
      appendChar(op);
    }
  });
});

equalEl.addEventListener('click', () => {
  try {
    sanitizeBuffer();
    if (!buffer) return;
    const result = evaluateExpression(buffer);
    buffer = String(result);
    render();
  } catch (err) {
    buffer = 'Error';
    render();
    setTimeout(() => {
      buffer = '';
      render();
    }, 1200);
  }
});

clearEl.addEventListener('click', () => {
  buffer = '';
  render();
});

// Render inicial
render();
