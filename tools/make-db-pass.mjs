import {encrypt,decrypt} from './encrypt.mjs';
import fs from 'fs';

const fsp = fs.promises;

(async()=>{
  const key = JSON.parse(await fsp.readFile('./keys/sql/pass-phrase.json','utf-8'));
  const out = encrypt(Array.from(key["base"]).map(c=>c.charCodeAt(0).toString(16)).join(''));
  await fsp.writeFile('./keys/sql/pass-phrase.txt',out,'utf-8');
  console.info(out);
})();

