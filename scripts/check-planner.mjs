import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const element=(dataset={})=>({dataset,attrs:{},children:[],classList:{values:new Map(),toggle(k,v){this.values.set(k,v);}},addEventListener(k,fn){this[k]=fn;},setAttribute(k,v){this.attrs[k]=v;},replaceChildren(...children){this.children=children;},append(child){this.children.push(child);},querySelectorAll(){return [];}});
const plans=['Presence','Growth','Partner'].map(calendarPlan=>element({calendarPlan}));
const views=['grid','list'].map(calendarView=>element({calendarView}));
const goals=['social','seo','digital'].map(serviceGoal=>element({serviceGoal}));
const ids=Object.fromEntries(['calendar-output','calendar-status','event-detail','calendar-cta','service-result'].map(id=>[id,element()]));
for(const name of ['Presence','Growth','Partner'])ids[`calendar-${name}`]={dataset:{summary:name},content:{cloneNode(){return {name};}}};
for(const name of ['social','seo','digital'])ids[`service-${name}`]={content:{cloneNode(){return {name};}}};
vm.runInNewContext(await readFile('planner.js','utf8'),{encodeURIComponent,document:{getElementById(id){return ids[id];},createElement(){return element();},querySelectorAll(selector){return {'[data-calendar-plan]':plans,'[data-calendar-view]':views,'[data-service-goal]':goals}[selector]||[];}}});
for(const b of plans){b.click();assert.equal(ids['calendar-output'].children[0].name,b.dataset.calendarPlan);assert.equal(plans.filter(b=>b.attrs['aria-pressed']==='true').length,1);assert.equal(ids['calendar-cta'].href,`/contact.html?plan=${b.dataset.calendarPlan}`);}
for(const b of views){b.click();assert.equal(ids['calendar-output'].classList.values.get('list-view'),b.dataset.calendarView==='list');}
for(const b of goals){b.click();assert.equal(ids['service-result'].children[0].name,b.dataset.serviceGoal);assert.equal(goals.filter(b=>b.attrs['aria-pressed']==='true').length,1);}
ids['calendar-output'].click({target:{closest(){return element({eventTitle:'Day 5: Content idea',eventDescription:'Example description'});}}});
assert.equal(ids['event-detail'].children[0].textContent,'Day 5: Content idea');
assert.equal(ids['event-detail'].children[1].textContent,'Example description');
console.log('PASS: package switching, calendar/list views, event details and all service-finder options.');
