import fs from 'fs';
import Applause from 'applause';
import pkg from '../package.json' assert { type: 'json' };
import minify from 'html-minifier';

const minifyOptions = {
    includeAutoGeneratedTags: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    collapseWhitespace: true,
};
const patterns = [
    {
        //match: /\"..\//g,
        match: /__buildVersion__/g,
        replacement: pkg.version,
    },
    {
        //match: /\"..\//g,
        match: /__buildDate__/g,
        replacement: new Date().getTime(),
    },
];
const options = [
    {
        options: {
            patterns,
            dev: true,
        },
        path: './frontend/dist/dev/app/index.html',
        write: './frontend/dist/dev/app/index.html',
    },
    {
        options: {
            patterns,
        },
        path: './frontend/dist/prod/app/index.html',
        write: './frontend/dist/prod/app/index.html',
    },
    {
        options: {
            patterns,
        },
        path: './frontend/dist/dev/login/login.html',
        write: './frontend/dist/dev/login/login.html',
    },
    {
        options: {
            patterns,
        },
        path: './frontend/dist/prod/login/login.html',
        write: './frontend/dist/prod/login/login.html',
    },
];

options.forEach(function ({ options, path, write }) {
    fs.readFile(path, 'utf8', function (err, rawContent) {
        const applause = Applause.create(options);
        const applauseOutput = applause.replace(rawContent);
        const minifyOutput = minify.minify(applauseOutput.content || rawContent, minifyOptions);
        const output = options.dev ? applauseOutput.content : minifyOutput;

        if (err) {
            return console.log(err);
        }

        fs.writeFile(write, output, function (err) {
            if (err) {
                return console.log(err);
            }

            return console.log(`replaced ${path}`);
        });
    });
});
