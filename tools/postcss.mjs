import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import mixin from 'postcss-mixins';
import nested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

export default async function postcss(css){

  const processedCss = await
  postcss([
    autoprefixer,
    atImport,
    mixin,
    nested,
    postcssPresetEnv({stage:0, preserve: false,features:{
      'custom-properties': false
    }}),
    cssnano
  ]).process(css,{
    from:css
  });
  return processedCss.css;
}
