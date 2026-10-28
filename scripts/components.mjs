import {packages} from '../content.mjs';

export function explorer(){
 return `<div class="plan-explorer" aria-label="Explore monthly content"><div class="explorer-heading"><p class="eyebrow">01—03 / Find your rhythm</p><h3>What does a month<br>actually look like?</h3><p>Pick a plan to see its unique content mix. Then compare every inclusion below.</p><div class="plan-switch" role="group" aria-label="Explore a package">${packages.map(p=>`<button type="button" data-explore="${p.name}" aria-pressed="${!!p.featured}" aria-controls="plan-preview">${p.name}</button>`).join('')}</div></div><div id="plan-preview" class="plan-preview" aria-live="polite" aria-atomic="true">${planPreview(packages[1])}</div></div>`;
}
function planPreview(p){return `<div class="mix-heading"><span>${p.name} / monthly content mix</span><strong>$${p.price}<small> CAD / month, including taxes</small></strong></div><div class="content-tickets" aria-hidden="true">${Array.from({length:p.reels},(_,i)=>`<span class="ticket reel">REEL ${String(i+1).padStart(2,'0')}</span>`).join('')}${Array.from({length:p.posts},(_,i)=>`<span class="ticket post"><b>▧</b>POST ${String(i+1).padStart(2,'0')}</span>`).join('')}</div><p class="mix-summary"><strong>${p.reels+p.posts} videos and branded posts, plus ${p.stories} Story placements.</strong> ${p.reels} edited short-form videos + ${p.posts} branded posts or carousels.</p><p class="small">${p.shoot}. Adapted for Instagram and Facebook; not twice the content.</p><a class="text-link" href="/contact.html?plan=${p.name}">Talk about ${p.name}</a>`;}
export function explorerTemplates(){return packages.map(p=>`<template id="mix-${p.name}">${planPreview(p)}</template>`).join('');}

export const trustRail=`<div class="trust-rail"><div><span>01 / Made here</span><strong>On-site content creation</strong></div><div><span>02 / Clear scope</span><strong>Visible monthly deliverables</strong></div><div><span>03 / No borrowed proof</span><strong>Clearly labelled creative samples</strong></div><a href="/services.html#process">See how it works </a></div>`;

export const proofNotes=[
 ['The idea','Make the dining experience tangible before someone books.','The creative choices','Warm photography, generous type and one simple invitation keep the attention on the meal.'],
 ['The idea','Turn a familiar morning ritual into a recognisable café story.','The creative choices','A portrait crop, a short headline and a consistent name treatment give a Reel cover a clear point of view.'],
 ['The idea','Show the care that happens before a catering order reaches the table.','The creative choices','Preparation imagery puts the work on show; the copy connects that care to the gathering.']
];
