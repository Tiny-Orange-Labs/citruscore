import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import pkg from './package.json' assert { type: 'json' };

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
                        src: './frontend/src/html/*.html',
                        dest: './frontend/dist/dev',
                    },
                    {
                        src: 'node_modules/@fortawesome/fontawesome-free/css/solid.css',
                        dest: 'frontend/dist/dev/css',
                    },
                    {
                        src: 'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
                        dest: 'frontend/dist/dev/css',
                    },
                    {
                        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf',
                        dest: 'frontend/dist/dev/webfonts',
                    },
                    {
                        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
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
                        src: './frontend/src/html/*.html',
                        dest: './frontend/dist/prod/',
                    },
                    {
                        src: 'frontend/assets/',
                        dest: 'frontend/dist/prod/',
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
