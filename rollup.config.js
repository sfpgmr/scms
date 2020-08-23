// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import riot from 'rollup-plugin-riot';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: './src/js/bundle.mjs',
    output: {
      file: './public/js/bundle.mjs',
      format: 'iife',
      compact:true
    },
    plugins:[riot(),noderesolve(),commonjs(),terser()]
  }
];