import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import pkg from './package.json' assert { type: 'json' };

const allHTMLData = './frontend/src/html/*.html';
const fontAwesomeSolid = 'node_modules/@fortawesome/fontawesome-free/css/solid.css';
const fontAwesomeMin = 'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
const fontAwesomeTff = 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf';
const fontAwesomeWoff2 = 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';
const outputDir = 'frontend/dist/';
const config = [
    {
        input: `${outputDir}dev/js/main.js`,
        output: {
            dir: `${outputDir}dev/js`,
            format: 'esm',
        },
        plugins: [
            copy({
                targets: [
                    {
                        src: allHTMLData,
                        dest: './frontend/dist/dev',
                    },
                    {
                        src: fontAwesomeSolid,
                        dest: 'frontend/dist/dev/css',
                    },
                    {
                        src: fontAwesomeMin,
                        dest: 'frontend/dist/dev/css',
                    },
                    {
                        src: fontAwesomeTff,
                        dest: 'frontend/dist/dev/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: 'frontend/dist/dev/webfonts',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/dev/',
                    },
                ],
            }),
            resolve(),
            replace({
                preventAssignment: false,
                __buildDate__: () => JSON.stringify(new Date()),
                __buildVersion__: pkg.version,
                delimiters: ['', ''],
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
                        src: allHTMLData,
                        dest: './frontend/dist/prod/',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/prod/',
                    },
                    {
                        src: fontAwesomeSolid,
                        dest: 'frontend/dist/prod/css',
                    },
                    {
                        src: fontAwesomeMin,
                        dest: 'frontend/dist/prod/css',
                    },
                    {
                        src: fontAwesomeTff,
                        dest: 'frontend/dist/prod/webfonts',
                    },
                    {
                        src: fontAwesomeWoff2,
                        dest: 'frontend/dist/prod/webfonts',
                    },
                    {
                        src: 'frontend/dist/dev/js/locales/*.js',
                        dest: 'frontend/dist/prod/js/locales/',
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
