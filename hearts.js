/* Personal reactions only. No counts, server requests or analytics. */
(() => {
 const prefix='local-social:liked-concept:v1:';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const controls=[];
 const read=key=>{try{return localStorage.getItem(key)==='yes';}catch{return false;}};
 function render(control,liked){
  control.button.setAttribute('aria-pressed',String(liked));
  control.button.setAttribute('aria-label',`${liked?'Unlike':'Like'} ${control.name} creative concept`);
  control.button.title=liked?'Liked in this browser. Click to unlike.':'Like this concept. Saved only in this browser.';
  control.button.querySelector('span').textContent=liked?'Liked':'Like';
 }
 document.querySelectorAll('.sample').forEach(sample=>{
  const caption=sample.querySelector('.sample-caption');
  const name=caption?.querySelector('h3')?.textContent;
  if(!name)return;
  const key=prefix+encodeURIComponent(name);
  const button=document.createElement('button');button.type='button';button.className='heart-button';
  button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/></svg><span>Like</span>';
  const control={button,name,key};controls.push(control);render(control,read(key));caption.append(button);
  button.addEventListener('animationend',()=>button.classList.remove('is-popping'));
  button.addEventListener('click',()=>{
   const liked=button.getAttribute('aria-pressed')!=='true';
   controls.filter(c=>c.key===key).forEach(c=>render(c,liked));
   button.classList.remove('is-popping');
   if(liked&&!reduced.matches){void button.offsetWidth;button.classList.add('is-popping');}
   try{if(liked)localStorage.setItem(key,'yes');else localStorage.removeItem(key);}catch{/* Still works for this page when storage is blocked. */}
  });
 });
 addEventListener('storage',event=>{if(event.key===null||event.key.startsWith(prefix))controls.forEach(c=>render(c,read(c.key)));});
 reduced.addEventListener('change',()=>{if(reduced.matches)controls.forEach(c=>c.button.classList.remove('is-popping'));});
})();
