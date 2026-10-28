import {execFileSync} from 'node:child_process';
import {cp,mkdir,writeFile,readFile} from 'node:fs/promises';
const slug='ottawa-social-media-draft';
const url=`https://samky8.github.io/${slug}`;
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BASE_PATH:`/${slug}`,SITE_URL:url}});
await mkdir('docs',{recursive:true});await cp('dist','docs',{recursive:true});await writeFile('docs/.nojekyll','');
for(const file of ['index','services','pricing','founder-pricing','founder-contact','work','about','contact']){
 const html=await readFile(`docs/${file}.html`,'utf8');
 if(/(?:href|src)="\/(?!ottawa-social-media-draft\/)/.test(html))throw new Error(`Unprefixed link in ${file}`);
}
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BASE_PATH:'',SITE_URL:''}});
console.log(`GitHub Pages draft prepared in docs/ for ${url}/. Local dist/ restored.`);
