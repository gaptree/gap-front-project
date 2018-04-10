#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

'use strict';

const path = require('path');
const fs = require('fs');

const baseDir = path.resolve(__dirname, '..');
const localSetting = JSON.parse(
    fs.readFileSync(
        path.resolve(baseDir, 'setting/setting.local.json'),
        'utf8'
    )
);

const port = localSetting.port || 8007;
const staticHost = localSetting.staticHost || 'localhost';

const front = require('gap-node-front')({
    baseDir: baseDir,
    port: port,
    staticHost: staticHost,
    scss: {
        publicSlug: 'css',
        inputDir: 'front/scss',
        outputDir: {
            dev: 'site/static/dev/css',
            dist: 'site/static/dist/css'
        },
        includePaths: [
            'node_modules/foundation-sites/scss',
            'node_modules/gap-front-scss/scss',
            'node_modules/gap-front-zselect/scss'
        ]
    },
    webpack: {
        publicSlug: 'js',
        contextDir: 'front/js',
        outputDir: {
            'dev': 'site/static/dev/js',
            'dist': 'site/static/dist/js'
        },
        modules: [
            'node_modules'
        ],
        entry: {
            main: './main.js'
        }
    },
    public: {
        publicSlug: '',
        publicDir: 'site/public'
    },
    mock: {
        mockDir: 'mock'
    }
});

const cmd = process.argv[2];

if (cmd === 'server') {
    front.runServer();
} else if (cmd === 'release') {
    front.release();
}
