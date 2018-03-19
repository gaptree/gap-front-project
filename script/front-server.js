/* eslint-env node */
/* eslint-disable no-console */

'use strict';

const express = require('express');
const path = require('path');
const scss = require('gap-node-scss');
const webpack = require('gap-node-webpack');
const fs = require('fs');

const baseDir = path.resolve(__dirname, '..');
const setting = JSON.parse(
    fs.readFileSync(
        path.resolve(baseDir, 'setting/front-server.json'),
        'utf8'
    )
);

const app = express();
const port = '8007';

if (setting.scss) {
    app.use(setting.scss.publicSlug, scss.middleware({
        inputDir: path.resolve(baseDir, setting.scss.inputDir),
        outputDir: path.resolve(baseDir, setting.scss.outputDir.dev),
        includePaths: setting.scss.includePaths.map(item => path.resolve(baseDir, item)),
        sourceMap: true,
        outputStyle: 'expanded' // nested, expanded, compact, compressed
    }));
}

if (setting.webpack) {
    app.use(webpack.middleware({
        contextDir: path.resolve(baseDir, setting.webpack.contextDir),
        outputDir: path.resolve(baseDir, setting.webpack.outputDir.dev),
        modules: setting.webpack.modules.map(item => path.resolve(baseDir, item)),
        sourceMap: true,
        publicSlug: setting.webpack.publicSlug,
        entry: setting.webpack.entry
    }));
}

if (setting.public) {
    app.use(
        setting.public.publicSlug,
        express.static(path.resolve(baseDir, setting.public.publicDir))
    );
}

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
