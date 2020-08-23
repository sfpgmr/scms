import Fontmin from 'fontmin';
import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
const {JSDOM} = jsdom;

const fsp = fs.promises;
const codePoints = new Set();

function stringToCodePointArray (str) {
  return (str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)).map(c=>c.codePointAt(0)) || [];
}

function setCodePoints(text)
{
  if(!text || !text.length) return;
  const cps = stringToCodePointArray(text);
  for(let i = 0,e = cps.length;i < e;++i){
    codePoints.add(cps[i]);
  }
}

async function parseText(dir){
  const entries = await fsp.readdir(dir);
  for(const entry of entries){
    const entryPath = path.join(dir,entry);
    const stat = await fsp.stat(entryPath);
    if(stat.isDirectory()){
      await parseText(entryPath);
    }
    if(stat.isFile()){
      const extName = path.extname(entryPath);
      if(extName.match(/html?/i)){
        console.info(entryPath);
        let dom = await JSDOM.fromFile(entryPath);
        let doc = dom.window.document;
        console.log(doc.title);
        setCodePoints(doc.textContent + doc.title);
      }
      if(extName.match(/\.js|\.css|\.md|\.riot/i)){
        console.info(entryPath);
        setCodePoints(await fsp.readFile(entryPath,'utf-8'));
      }
    }
  }
}

(async()=>{

  await parseText('./public');  
  await parseText('./src');

  // 使っている文字を列挙する
  let text = Array.from(codePoints).map(cp=>String.fromCodePoint(cp)).join('');
  console.info(text);
  const fontmin = new Fontmin()
  .src('./src/fonts/*.ttf')
  .use(Fontmin.glyph({ 
    text: text,
    hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
  }))
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2woff({
    deflate: true           // deflate woff. default = false
  }))
  .use(Fontmin.ttf2svg())
  .use(Fontmin.css({
    glyph: false,
    fontPath: '/fonts/'
  }))
  .dest('./public/fonts');

  //
  fontmin.run(function (err, files) {
      if (err) {
          throw err;
      }
  });
})();
