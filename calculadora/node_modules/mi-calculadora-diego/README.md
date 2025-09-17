# calcito-aritmetica-diego24

Funciones aritméticas básicas para usar en proyectos de JavaScript o una calculadora web.

## Instalación

```bash
npm i calcito-aritmetica-diego24
# o
pnpm add calcito-aritmetica-diego24
```

> Si el nombre ya está ocupado en npm, cámbialo en `package.json` antes de publicar.

## Uso

### ESM

```js
import { add, subtract, multiply, divide } from 'calcito-aritmetica-diego24';

console.log(add(2, 3));        // 5
console.log(subtract(7, 4));   // 3
console.log(multiply(3, 4));   // 12
console.log(divide(10, 2));    // 5
```

### CommonJS

```js
const { add, subtract, multiply, divide } = require('calcito-aritmetica-diego24');
```

## Publicación rápida (script)

1. Inicia sesión en npm: `npm login`
2. Incrementa versión y publica en público:
   ```bash
   npm run release
   # equivale a:
   # npm version patch && npm publish --access public
   ```

Antes de publicar, puedes ejecutar el *linter*:
```bash
npm run lint
```
