import resolve from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import { minifyHTML } from 'rollup-plugin-minify-html';
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser';
import minifyHTMLLiterals from 'rollup-plugin-minify-html-literals';
import prettier from 'rollup-plugin-prettier';
import copy from 'rollup-plugin-copy';
import sass from 'sass';

const copyConfig = {
  targets: [{ 
      src: 'node_modules/@fortawesome/fontawesome-free/css/solid.css', 
      dest: 'dist/assets/css' 
  }, { 
    src: 'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css', 
    dest: 'dist/assets/css' 
  }, { 
    src: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf', 
    dest: 'dist/assets/webfonts/' 
  }, { 
    src: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2', 
    dest: 'dist/assets/webfonts/' 
  }],
};
const minifyHTMLConfig = {
  targets: [{
    src: 'lib/html/index.html',
    dest: 'dist/prod/index.html',
    minifierOptions: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: false,
      minifyURLs: true
    }
  }]
};
const scssConfig = {
  outputStyle: 'compressed',
  sourceMap: true,
  failOnError: true,
  verbose: true,
  sass,
  output: './dist/prod/bundle.css',
};
const eslintConfig = {
  fix: true,
  include: ['lib/js/*.js'],
};
const prettierConfig = {
  tabWidth: 4,
  singleQuote: true,
  parser: 'babel',
};
const config = {
  input: 'lib/js/bundle.js',
  output: {
    dir: 'dist/prod/',
    format: 'esm',
  },
  plugins: [
    copy(copyConfig),
    minifyHTML(minifyHTMLConfig),
    prettier(prettierConfig),
    eslint(eslintConfig),
    scss(scssConfig),
    minifyHTMLLiterals(),
    resolve(),
    terser()
  ]
};

export default config;