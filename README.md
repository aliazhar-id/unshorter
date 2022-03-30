# unshorter
> Promise-based, Minimalist and Lightweight URL unshortner for Node.js

## Installation
```bash
npm install unshorter --save
```

## Usage
```js

// ES6 Modules
import unshorter from 'unshorter';

// CommonJS Modules
const unshorter = require('unshorter');

const shortUrl = 'https://s.id/aliazhar-github' //Example

unshorter(shortUrl)
 .then((longUrl) => console.info('Result:', longUrl))
 .catch((err) => console.error('Oops!'));

```

## License

This project is licensed under [MIT License](LICENSE).