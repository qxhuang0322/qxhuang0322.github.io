import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'_site');
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','styles.css','script.js','robots.txt','sitemap.xml','.nojekyll'])fs.copyFileSync(path.join(root,name),path.join(out,name));
for(const dir of ['pages','assets'])fs.cpSync(path.join(root,dir),path.join(out,dir),{recursive:true,filter:p=>!p.includes(`${path.sep}placeholder`)});
console.log('Packaged public website in _site/');
