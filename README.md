# bufferize
Create a filter that will read data from standard input and output a text + hex output to  standard output.

### Install
npm: `npm i --save bufferize`
yarn: `yarn add bufferize`

### Usage 
With ES Modules:
```javascript
import bufferize from 'bufferize';

const bufferized = bufferize('Pamela Anderson');

console.log(bufferized); // 50 61 6d 65 6c 61 20 41 6e 64 65 72 73 6f 6e
```

With commonjs:
```javascript
const bufferize = require('bufferize');

const bufferized = bufferize('Blue train');

console.log(bufferized); // 42 6c 75 65 20 74 72 61 69 6e
```

From CLI:
```bash
echo "Subwoofer" | npm run bufferize # 53 75 62 77 6f 6f 66 65 72
```