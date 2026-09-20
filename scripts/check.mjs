import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const load=name=>JSON.parse(fs.readFileSync(path.join(root,'data',name),'utf8').replace(/^\uFEFF/,''));
const papers=load('publications.json');
const profile=load('profile.json');
const files=['index.html','pages/all-publications.html','pages/all-news.html','pages/all-honors.html'];
const ids=new Set(),dois=new Set();
for(const p of papers){
 assert(p.id&&!ids.has(p.id),`Duplicate or missing paper ID: ${p.id}`);ids.add(p.id);
 assert(p.authors.includes(profile.name),`Name missing from authors: ${p.id}`);
 assert.equal(p.isFirstAuthor,p.authors[0]===profile.name,`First-author flag: ${p.id}`);
 assert(['published','preprint','accepted'].includes(p.status),`Invalid status: ${p.id}`);
 assert(Number.isInteger(p.year)&&p.year>=2000,`Invalid year: ${p.id}`);
 assert(p.links.length&&p.links.every(l=>/^https:\/\//.test(l.url)),`Missing paper links: ${p.id}`);
 assert(p.sourceUrls?.length,`Missing provenance: ${p.id}`);
 if(p.thumbnail){
  assert(p.thumbnailAlt&&p.figureLabel&&/^https:\/\//.test(p.figureSource||''),`Missing figure description or source: ${p.id}`);
  assert(p.thumbnail.startsWith('assets/publications/'),`Unexpected figure path: ${p.id}`);
 }
 if(p.journalImpactFactor){
  const metric=p.journalImpactFactor;
  assert(p.status!=='preprint'&&Number.isFinite(metric.value)&&metric.value>0&&Number.isInteger(metric.year)&&/^https:\/\//.test(metric.sourceUrl),`Invalid journal impact factor: ${p.id}`);
 }
 if(p.doi){assert(!dois.has(p.doi),`Duplicate DOI: ${p.doi}`);dois.add(p.doi);}
 if(p.status==='published')assert(p.doi&&p.doi.startsWith('10.1109/'),`Published IEEE paper lacks IEEE DOI: ${p.id}`);
}
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: expected one H1`);
 assert(!/Your Name|your\.email|Collaborator A|Optional Widget Area|Replace this|placeholder\/paper/i.test(html),`${file}: template content remains`);
 assert(html.includes('Qingxiao Huang'),`${file}: missing identity`);
 const idsInFile=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(idsInFile.length,new Set(idsInFile).size,`${file}: duplicate IDs`);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=m[1].replace(/&amp;/g,'&');
  if(/^(https?:|mailto:|data:)/.test(url)||url==='#')continue;
  const [beforeHash,fragment]=url.split('#');
  let target=beforeHash.split('?')[0];
  target=target?path.resolve(root,path.dirname(file),target):path.join(root,file);
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  assert(fs.existsSync(target),`${file}: broken local link ${url}`);
  if(fragment&&target.endsWith('.html'))assert(fs.readFileSync(target,'utf8').includes(`id="${fragment}"`),`${file}: missing anchor ${url}`);
 }
 for(const m of html.matchAll(/<img\b[^>]*>/g))assert(/\balt="[^"]+"/.test(m[0]),`${file}: image without alt`);
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const full=fs.readFileSync(path.join(root,'pages/all-publications.html'),'utf8');
assert.equal((home.match(/class="publication"/g)||[]).length,papers.filter(p=>p.isFirstAuthor&&p.featured).length,'Home selection differs from data');
assert.equal((full.match(/class="publication"/g)||[]).length,papers.filter(p=>p.isFirstAuthor).length,'Full list differs from data');
console.log(`Validated ${files.length} pages, every local link/anchor, and ${papers.length} publication records.`);
