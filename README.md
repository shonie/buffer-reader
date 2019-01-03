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

reader.pipe(process.stdout); // Pamela Anderson | 50616d656c6120416e646572736f6e
```

With commonjs:
```javascript
const BufferReader = require('bufferized');

const reader = new BufferReader({
  buffer: Buffer.from('Blue train')
});

reader.pipe(process.stdout); // Blue train | 426c756520747261696e
```

From CLI:
```bash
echo "Subwoofer" | npx bufferized # Subwoofer | 537562776f6f666572
```