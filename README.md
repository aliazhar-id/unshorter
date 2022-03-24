# unshorter
> Minimalist and lightweight URL unshortener for Node.js

## Usage
```js

// ES6 Modules
import unshorter from 'unshorter';

// CommonJS Modules
const unshorter = require('unshorter');

const shortUrl = 'https://s.id/aliazhar-github' //Example

unshorter(shortUrl)
 .then((longUrl) => console.info(longUrl))
 .catch(() => console.error('Opps!'));

```
