import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import minifyHTMLLiterals from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import sass from 'sass';
import prettier from 'rollup-plugin-prettier';

const copyConfig = {
  targets: [{  
    src: 'lib/html/index.html', 
    dest: 'dist/dev'
  }],
};
const scssConfig = {
  failOnError: true,
  verbose: true,
  sass,
  output: './dist/dev/bundle.css',
};
const prettierConfig = {
  tabWidth: 4,
  singleQuote: true,
  parser: 'babel',
};
const config = {
  input: 'lib/js/bundle.js',
  output: {
    dir: 'dist/dev',
    format: 'esm'
  },
  plugins: [
    scss(scssConfig),
    minifyHTMLLiterals(),
    copy(copyConfig),
    prettier(prettierConfig),
    resolve(),
  ],
  preserveEntrySignatures: false,
};

export default config;