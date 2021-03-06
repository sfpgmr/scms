import path from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import mixin from 'postcss-mixins';
import nested from 'postcss-nested';
import simpleVars from 'postcss-simple-vars';
import postcssPresetEnv from 'postcss-preset-env';
import cssVariables from 'postcss-css-variables';
//import perfectionist from 'perfectionist';
import cssnano from 'cssnano';
import fs from 'fs-extra';
import purgecss from '@fullhuman/postcss-purgecss';
//import tailwindcss from 'tailwindcss';

process.chdir(path.resolve(path.dirname(new URL(import.meta.url).pathname),'../'));

async function buildcss(){

  const src = process.argv[2];
  const dest = process.argv[3];

  const css = await fs.readFile(src,'utf8');
 
  const processedCss = await
  postcss([
    autoprefixer,
    atImport,
    mixin,
    nested,
    postcssPresetEnv({stage:0, preserve: false,features:{
      'custom-properties': false
    }}),
    purgecss({content: ['./public/js/*.js', './public/html/*.html','./src/ejs/*.ejs','./src/riot/*.riot']}),
    cssnano
  ]).process(css,{
    from:src,to:dest
  });
  console.info(`building css : ${src} => ${dest}`);
  await fs.writeFile(dest,processedCss.css,'utf8');
}

try {
  buildcss();
} catch (e) {
  console.error(e.stack);
  process.abort();
}
