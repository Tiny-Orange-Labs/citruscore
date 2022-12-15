import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import pkg from '../package.json' assert { type: 'json' };

const allHTMLData = './frontend/src/html/*.html';
const fontAwesomeTff = './node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf';
const fontAwesomeWoff2 = './node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';
const shoelaceAssets = './node_modules/@shoelace-style/shoelace/dist/assets';
const outputDir = './frontend/dist/';
const config = [
    {
        input: `${outputDir}dev/js/main.js`,
        output: {
            dir: `${outputDir}dev/js`,
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
                        dest: './frontend/dist/dev/assets/shoelace',
                    },
                    {
                        src: allHTMLData,
                        dest: './frontend/dist/dev',
                    },
                    {
                        src: fontAwesomeTff,
                        dest: './frontend/dist/dev/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: './frontend/dist/dev/webfonts',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/dev/',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/dev/',
                    },
                    {
                        src: 'frontend/dist/dev/js/bundle.css',
                        dest: 'frontend/dist/dev/css/',
                    },
                ],
                copyOnce: true,

                hook: 'buildEnd',
            }),
        ],
    },
    {
        input: `${outputDir}dev/js/main.js`,
        output: {
            dir: `${outputDir}prod/js`,
            format: 'iife',
        },
        plugins: [
            copy({
                targets: [
                    {
                        src: shoelaceAssets,
                        dest: './frontend/dist/prod/assets/shoelace',
                    },
                    {
                        src: allHTMLData,
                        dest: './frontend/dist/prod/',
                    },
                    {
                        src: fontAwesomeTff,
                        dest: './frontend/dist/prod/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: './frontend/dist/prod/webfonts',
                    },
                    {
                        src: './frontend/dist/dev/js/locales/*',
                        dest: './frontend/dist/prod/js/locales/',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/prod/',
                    },
                    {
                        src: 'frontend/dist/dev/js/bundle.css',
                        dest: 'frontend/dist/prod/css/',
                    },
                ],
            }),
            resolve(),
            terser(),
            strip(),
        ],
    },
];

export default config;
