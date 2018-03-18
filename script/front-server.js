/* eslint-env node */
/* eslint-disable no-console */

'use strict';

const express = require('express');
const path = require('path');
const scss = require('gap-node-scss');
const webpack = require('gap-node-webpack');

const baseDir = path.resolve(__dirname, '..');
const app = express();
const port = '8007';

app.use('/css', scss.middleware({
    inputDir: path.resolve(baseDir, 'front/scss'),
    outputDir: path.resolve(baseDir, 'site/static/dev/css'),
    includePaths: [
        path.resolve(baseDir, 'node_modules/foundation-sites/scss'),
        path.resolve(baseDir, 'node_modules/gap-front-scss/scss')
    ],
    sourceMap: true,
    outputStyle: 'expanded' // nested, expanded, compact, compressed
}));

app.use(webpack.middleware({
    contextDir: path.resolve(baseDir, 'front/js'),
    outputDir: path.resolve(baseDir, 'site/static/dev/js'),
    modules: [
        path.resolve(baseDir, 'node_modules')
    ],
    sourceMap: true,
    publicSlug: 'js',
    entry: {
        main: './main.js'
    }
}));

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
