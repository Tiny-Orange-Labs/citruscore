import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import pkg from '../package.json' assert { type: 'json' };

const loginHTML = './frontend/src/html/login.html';
const appHTML = './frontend/src/html/index.html';
const fontAwesomeTff = './node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf';
const fontAwesomeWoff2 = './node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';
const shoelaceAssets = './node_modules/@shoelace-style/shoelace/dist/assets';
const outputDir = './frontend/dist/';
const config = [
    {
        input: `${outputDir}dev/app/js/main.js`,
        output: {
            dir: `${outputDir}dev/app/js`,
            format: 'esm',
        },
        plugins: [
            css({
                // no absolute or relative paths allowed (bruh)
                output: 'bundle.css',
                hook: 'buildStart',
            }),
            resolve(),
            replace({
                preventAssignment: false,
                __buildDate__: () => JSON.stringify(new Date()),
                __buildVersion__: pkg.version,
                delimiters: ['', ''],
            }),
            copy({
                targets: [
                    {
                        src: shoelaceAssets,
                        dest: './frontend/dist/dev/app/assets/shoelace',
                    },
                    {
                        src: appHTML,
                        dest: './frontend/dist/dev/app',
                    },
                    {
                        src: fontAwesomeTff,
                        dest: './frontend/dist/dev/app/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: './frontend/dist/dev/app/webfonts',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/dev/app',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/dev/app',
                    },
                    {
                        src: 'frontend/dist/dev/app/js/bundle.css',
                        dest: 'frontend/dist/dev/app/css/',
                    },
                ],
                copyOnce: true,

                hook: 'buildEnd',
            }),
        ],
    },
    {
        input: `${outputDir}dev/app/js/main.js`,
        output: {
            dir: `${outputDir}prod/app/js`,
            format: 'iife',
        },
        plugins: [
            copy({
                targets: [
                    {
                        src: shoelaceAssets,
                        dest: './frontend/dist/prod/app/assets/shoelace',
                    },
                    {
                        src: appHTML,
                        dest: './frontend/dist/prod/app/',
                    },

                    {
                        src: fontAwesomeTff,
                        dest: './frontend/dist/prod/app/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: './frontend/dist/prod/app/webfonts',
                    },
                    {
                        src: './frontend/dist/dev/app/js/locales/*',
                        dest: './frontend/dist/prod/app/js/locales/',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/prod/app/',
                    },
                    {
                        src: 'frontend/dist/dev/app/js/bundle.css',
                        dest: 'frontend/dist/prod/app/css/',
                    },
                ],
            }),
            resolve(),
            terser(),
            strip(),
        ],
    },
    {
        input: `${outputDir}dev/app/js/login.js`,
        output: {
            dir: `${outputDir}dev/login`,
            format: 'iife',
        },
        plugins: [
            resolve(),
            css({
                // no absolute or relative paths allowed (bruh)
                output: 'login.css',
            }),
            copy({
                targets: [
                    {
                        src: loginHTML,
                        dest: './frontend/dist/dev/login',
                    },
                    {
                        src: shoelaceAssets,
                        dest: './frontend/dist/dev/login/assets/shoelace',
                    },
                ],
            }),
        ],
    },
    {
        input: `${outputDir}dev/app/js/login.js`,
        output: {
            dir: `${outputDir}prod/login`,
            format: 'iife',
        },
        plugins: [
            resolve(),
            css({
                // no absolute or relative paths allowed (bruh)
                output: 'login.css',
            }),
            terser(),
            strip(),
            copy({
                targets: [
                    {
                        src: loginHTML,
                        dest: './frontend/dist/prod/login',
                    },
                    {
                        src: shoelaceAssets,
                        dest: './frontend/dist/prod/login/assets/shoelace',
                    },
                ],
            }),
        ],
    },
];

export default config;
