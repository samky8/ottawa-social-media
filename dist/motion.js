/* Progressive enhancements: content stays visible if motion or JavaScript is unavailable. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 const serviceCards=[...document.querySelectorAll('.page-index .service-overview .service-cards article')];
 function updateServices(){
  const start=innerHeight*.92;
  const distance=Math.max(1,innerHeight*.28);
  serviceCards.forEach(card=>{
   const fraction=Math.min(1,Math.max(0,(start-card.getBoundingClientRect().top)/distance));
   // Smoothstep ties the fade to scroll position, so scrolling up reverses it.
   const opacity=reduced.matches?1:fraction*fraction*(3-2*fraction);
   card.style.setProperty('--service-opacity',opacity);
   card.classList.add('scroll-fade');
  });
 }
 const progress=document.createElement('div');
 progress.className='reading-progress';progress.setAttribute('aria-hidden','true');
 progress.hidden=!!document.querySelector('.page-index');
 document.body.append(progress);
 let queued=false;
 function updateProgress(){
  const distance=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${distance>0?Math.min(1,Math.max(0,scrollY/distance)):0})`;
  updateServices();
  queued=false;
 }
 function queueProgress(){if(!queued){queued=true;requestAnimationFrame(updateProgress);}}
 addEventListener('scroll',queueProgress,{passive:true});addEventListener('resize',queueProgress);updateProgress();
 if('ResizeObserver' in window)new ResizeObserver(queueProgress).observe(document.body);

 const animated=new Set();
 function enter(element){
  if(reduced.matches||!element.animate)return;
  const animation=element.animate([{opacity:.35,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
  animated.add(animation);animation.onfinish=()=>animated.delete(animation);
 }
 if('IntersectionObserver' in window){
  const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   if(entry.boundingClientRect.top>0)enter(entry.target);
   reveals.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('.section-heading,.service-cards article,.sample,.plan,.steps article,.values article,.pricing-invite,.custom-pricing,.about-photo').forEach(el=>{if(!serviceCards.includes(el))reveals.observe(el);});
  const steps=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('step-in-view',entry.isIntersecting)),{rootMargin:'-10% 0px -30% 0px',threshold:.4});
  document.querySelectorAll('.steps article').forEach(el=>steps.observe(el));
 }

 const hero=document.querySelector('.hero-art');
 let pointerFrame=0;
 function resetHero(){cancelAnimationFrame(pointerFrame);pointerFrame=0;hero?.style.removeProperty('--tilt-x');hero?.style.removeProperty('--tilt-y');}
 hero?.addEventListener('pointermove',event=>{
  if(reduced.matches||!finePointer.matches||event.pointerType==='touch')return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame=requestAnimationFrame(()=>{
   const rect=hero.getBoundingClientRect();
   hero.style.setProperty('--tilt-x',`${((event.clientY-rect.top)/rect.height-.5)*-5}deg`);
   hero.style.setProperty('--tilt-y',`${((event.clientX-rect.left)/rect.width-.5)*6}deg`);
  });
 });
 hero?.addEventListener('pointerleave',resetHero);
 reduced.addEventListener('change',()=>{resetHero();queueProgress();if(reduced.matches){animated.forEach(animation=>animation.cancel());animated.clear();}});

 // A real, keyboard-accessible artwork viewer rather than a decorative cursor.
 const samples=[...document.querySelectorAll('.sample')];
 if(!samples.length)return;
 const dialog=document.createElement('dialog');dialog.className='art-viewer';dialog.setAttribute('aria-labelledby','viewer-title');
 const close=document.createElement('button');close.className='viewer-close';close.type='button';close.textContent='Close ×';close.setAttribute('aria-label','Close creative preview');
 const layout=document.createElement('div');layout.className='viewer-layout';
 const canvas=document.createElement('div');canvas.className='viewer-canvas';
 const info=document.createElement('div');info.className='viewer-info';
 const label=document.createElement('p');label.className='eyebrow';label.textContent='Sample creative / fictional business';
 const title=document.createElement('h2');title.id='viewer-title';
 const description=document.createElement('p');
 const position=document.createElement('p');position.className='viewer-position';position.setAttribute('aria-live','polite');
 const controls=document.createElement('div');controls.className='viewer-controls';
 const previous=document.createElement('button');previous.type='button';previous.textContent='Previous';
 const next=document.createElement('button');next.type='button';next.textContent='Next';
 controls.append(previous,next);info.append(label,title,description,position,controls);layout.append(canvas,info);dialog.append(close,layout);document.body.append(dialog);
 let active=0,opener=null;
 function show(index){
  active=(index+samples.length)%samples.length;
  const sample=samples[active];
  const art=sample.querySelector('.creative').cloneNode(true);
  art.querySelector('.view-art')?.remove();
  art.querySelector('img').loading='eager';
  canvas.replaceChildren(art);
  title.textContent=sample.querySelector('.sample-caption h3').textContent;
  description.textContent=sample.querySelector('.sample-description').textContent;
  position.textContent=`Concept ${active+1} of ${samples.length}`;
 }
 samples.forEach((sample,index)=>{
  const button=document.createElement('button');button.type='button';button.className='view-art';button.textContent='View concept';
  button.setAttribute('aria-label',`View ${sample.querySelector('.sample-caption h3').textContent} creative concept`);
  button.addEventListener('click',()=>{opener=button;show(index);dialog.showModal();document.documentElement.classList.add('viewer-open');close.focus();});
  sample.querySelector('.creative').append(button);
 });
 previous.addEventListener('click',()=>show(active-1));next.addEventListener('click',()=>show(active+1));
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('viewer-open');opener?.focus();});
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(active+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(active-1);}});
})();
