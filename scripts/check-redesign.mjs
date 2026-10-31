import {readFile,readdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {packages} from '../content.mjs';
import {schedule,calendarBody} from './planner.mjs';
const pages=(await readdir('dist')).filter(f=>f.endsWith('.html'));
const htmlByFile=new Map(await Promise.all(pages.map(async f=>[f,await readFile(`dist/${f}`,'utf8')])));
let links=0;
for(const [file,html] of htmlByFile){
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${file}: exactly one h1`);
 assert(html.includes('name="description"'));
 assert(html.includes('noindex,nofollow'));
 for(const [,url]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!url.startsWith('/')&&!url.startsWith('#'))continue;
  const [base,fragment]=url.split('#');
  const pathname=base.split('?')[0];
  const target=pathname==='/'?'index.html':pathname?pathname.slice(1):file;
  await access(`dist/${target}`);
  if(fragment)assert(htmlByFile.get(target)?.includes(`id="${fragment}"`),`${file}: missing fragment ${url}`);
  links++;
 }
 assert(!/guaranteed growth/i.test(html));
 assert(!/\$499|\$999|\$1,799|plus applicable HST|\+ HST/i.test(html), `${file}: obsolete pricing`);
 if(html.includes('plan-explorer'))for(const p of packages){
  const template=html.match(new RegExp(`<template id="mix-${p.name}">([\\s\\S]*?)</template>`))?.[1];
  assert(template,`Missing ${p.name} template`);
  assert.equal((template.match(/class="ticket reel"/g)||[]).length,p.reels);
  assert.equal((template.match(/class="ticket post"/g)||[]).length,p.posts);
 }
}
assert.deepEqual(packages.map(p=>[p.reels,p.posts]),[[3,4],[5,8],[8,12]]);
assert.deepEqual(packages.map(p=>p.price),['795','1,495','2,495']);
assert.deepEqual(packages.map(p=>p.stories),[0,4,8]);
const pricing=htmlByFile.get('pricing.html');
assert(pricing.includes('Recommended &mdash; Most Popular'));
assert.equal((pricing.match(/<details><summary>/g)||[]).length,9);
assert(pricing.includes('15% off'));
assert(pricing.includes('CAD &middot; including taxes'));
assert(htmlByFile.get('contact.html').includes('All prices are CAD per month, including taxes.'));
assert(htmlByFile.get('contact.html').includes('$675 CAD/month for 2 months, then $795/month'));
for(const p of packages){
 const discounted=Math.floor(Number(p.price.replaceAll(',',''))*0.85).toLocaleString('en-CA');
 assert(pricing.includes('$'+discounted+'<span class="price-period"> <i class="price-slash">/</i> month'));
 assert(pricing.includes('For your first 2 months, then regular price.'));
 assert(pricing.includes('/contact.html?plan='+p.name));
 assert(pricing.includes(p.shoot));
 for(const feature of p.features)assert(pricing.includes(feature));
}
// Exercise the actual explorer handlers without introducing a browser dependency.
const buttons=packages.map(p=>({dataset:{explore:p.name},attrs:{},addEventListener(type,fn){this[type]=fn;},setAttribute(k,v){this.attrs[k]=v;}}));
const preview={replaceChildren(node){this.selected=node.name;}};
const templates=Object.fromEntries(packages.map(p=>[`mix-${p.name}`,{content:{cloneNode(){return {name:p.name};}}}]));
vm.runInNewContext(await readFile('app.js','utf8'),{document:{querySelector(){return null;},querySelectorAll(){return buttons;},addEventListener(){},getElementById(id){return id==='plan-preview'?preview:templates[id];}}});
for(const button of buttons){button.click();assert.equal(preview.selected,button.dataset.explore);assert.equal(buttons.filter(b=>b.attrs['aria-pressed']==='true').length,1);assert.equal(button.attrs['aria-pressed'],'true');}
assert.equal(pages.length,8);
assert(!htmlByFile.get('index.html').includes('id="packages"'));
assert(!htmlByFile.get('services.html').includes('id="packages"'));
assert(htmlByFile.get('pricing.html').includes('id="packages"'));
assert(htmlByFile.get('services.html').includes('id="seo"'));
for(const p of packages){
 const events=schedule(p);
 assert.equal(events.filter(e=>e.type==='Reel').length,p.reels);
 assert.equal(events.filter(e=>e.type==='Feed post').length,p.posts);
 assert.equal(events.filter(e=>e.type==='Shoot').length,p.shootCount);
 assert.equal(events.filter(e=>e.type==='Story').length,p.stories);
 assert(events.every(e=>e.day>=1&&e.day<=28));
 assert.equal((calendarBody(p).match(/class="calendar-day /g)||[]).length,28);
}
await import('./check-planner.mjs');
await import('./check-laptop.mjs');
console.log(`PASS: ${pages.length} pages, ${links} local links/assets/fragments, page structure and calendar quantities for all packages.`);
