### readFile

Read files asynchronously.

```js
var file = require('read-file');
file.readFileSync('foo.txt');
```

### readFileSync

Read files synchronously.

```js
var file = require('read-file');
file.readFile('foo.txt', callback);
```

### encoding

Default encoding is `utf8`, this can be changed by passing an encoding as a second param:

```js
var file = require('read-file');
file.readFileSync('foo.txt', 'utf8');
// or
file.readFile('foo.txt', 'utf8', callback);
```

### normalizeNL

Normalize all line endings to newlines, `\n`.

```js
var file = require('read-file');
var str = file.readFileSync('foo.txt');
file.normalizeNL(str);
```

### stripBOM

Strip byte order marks.

```js
var file = require('read-file');
var str = file.readFileSync('foo.txt');
file.stripBOM(str);
```
