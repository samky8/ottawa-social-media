import {execFileSync} from 'node:child_process';
import {cp,mkdir,writeFile,readFile} from 'node:fs/promises';
const domain='localsocial.ca';
const url=`https://${domain}`;
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BASE_PATH:'',SITE_URL:url}});
await mkdir('docs',{recursive:true});await cp('dist','docs',{recursive:true});await writeFile('docs/.nojekyll','');
await writeFile('docs/CNAME',`${domain}\n`);
for(const file of ['index','services','pricing','founder-pricing','founder-contact','work','about','contact']){
 const html=await readFile(`docs/${file}.html`,'utf8');
 if(html.includes('/ottawa-social-media-draft/'))throw new Error(`Old repository path in ${file}`);
}
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BASE_PATH:'',SITE_URL:''}});
console.log(`GitHub Pages prepared in docs/ for ${url}/. Local dist/ restored.`);
