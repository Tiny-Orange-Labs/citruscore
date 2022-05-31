const fs = require('fs');
const Applause = require('applause');
const { version } = require('../package'); 
const options = [{
    options: {
        patterns: [{
            //match: /\"..\//g,
            match: /{{timestamp}}/g,
            replacement: `?v=${version}`
        }]
    },
    path: './lib/html/template.html',
    write: './lib/html/index.html',
}];

options.forEach(function ({ options, path, write }) {
    fs.readFile(path, 'utf8', function (err, content) {
        const applause = Applause.create(options);
        const output = applause.replace(content);
        
        if (err) {
            return console.log(err);
        }
        if (!output.content) {
            return console.log(`nothing replaced ${path}`);
        }

        fs.writeFile(write, output.content, function (err) {
            if (err) {
                return console.log(err);
            }

            return console.log(`replaced ${path}`);
        }); 
    });
});