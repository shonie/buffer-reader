# bufferized
Create a filter that will read data from standard input and output a text + hex output to standard output.

### Install
npm: `npm i --save bufferized`

yarn: `yarn add bufferized`

### Usage
With ES Modules:
```javascript
import BufferReader from 'bufferized';

const reader = new BufferReader({
  buffer: Buffer.from('Pamela Anderson')
});

reader.pipe(process.stdout); // Pamela Anderson | 50 61 6d 65 6c 61 20 41 6e 64 65 72 73 6f 6e
```

With commonjs:
```javascript
const BufferReader = require('bufferized');

const reader = new BufferReader({
  buffer: Buffer.from('Blue train')
});

reader.pipe(process.stdout); // Blue train | 42 6c 75 65 20 74 72 61 69 6e
```

From CLI:
```bash
echo "Subwoofer" | npx bufferized # Subwoofer | 53 75 62 77 6f 6f 66 65 72
```