import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

(async ()=> {
  const src = process.argv[2];
  const dest = process.argv[3];
  let template = await fs.promises.readFile(src,'utf8')
  let cwd = process.cwd();
  process.chdir(path.dirname(src));
  console.info(`ejs.render:${src} => ${dest}`);
  let html = ejs.render(template,{filename:path.basename(src)});
  process.chdir(cwd);
  await fs.promises.writeFile(dest,html,'utf8');
})();