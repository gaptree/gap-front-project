# Gap Front Project

This is an example to show that how to build front server and create web application.

## Build Front Server

### gap-node-scss

<https://github.com/gaptree/gap-node-scss>

```
$ yarn add gap-node-scss --dev
```

```javascript
const express = require('express');
const path = require('path');
const scss = require('gap-node-scss');

const app = express();
const port = '8007';
const publicSlug = 'css';

app.use('/' + publicSlug, scss.middleware({
    inputDir: path.resolve(__dirname, 'src/scss'),
    outputDir: path.resolve(__dirname, 'dev/css'),
    includePaths: [
        path.resolve(__dirname, 'module/scss/normalize-scss/')
    ],
    sourceMap: true,
    outputStyle: 'expanded'
}));

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
```

### gap-node-webpack

<https://github.com/gaptree/gap-node-webpack>

```
$ yarn add gap-node-webpack --dev
```

```javascript
'use strict';

const express = require('express');
const path = require('path');
const middleware = require('gap-node-webpack').middleware;

const app = express();
const port = '8007';
const publicSlug = 'js';

app.use(middleware({
    contextDir: path.resolve(__dirname, 'src/js'),
    outputDir: path.resolve(__dirname, 'dev/js'),
    modules: [
        path.resolve(__dirname, 'module/js/')
    ],
    sourceMap: true,
    publicSlug: publicSlug,
    entry: {
        main: './main.js'
    }
}));

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
```

### gap-node-mock

<https://github.com/gaptree/gap-node-mock>

```
$ yarn add gap-node-mock --dev
```


```javascript
const mock = require('gap-node-mock);
const express = require('express');

const app = express();
app.use('/', mock({mockDir: xxx});

app.listen(port);
```

## Create Web Application
