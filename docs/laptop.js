/* Keep the calendar open without JS, on small screens and with reduced motion. */
(() => {
 const stage=document.querySelector('.laptop-scroll');
 if(!stage)return;
 const lid=stage.querySelector('.laptop-lid');
 const app=stage.querySelector('.calendar-app');
 const motion=matchMedia('(min-width:761px) and (min-height:650px) and (prefers-reduced-motion:no-preference)');
 let frame=0,focusOpen=false;
 function update(){
  frame=0;
  const enabled=motion.matches;
  stage.classList.toggle('is-scroll-laptop',enabled);
  const top=stage.getBoundingClientRect().top;
  const progress=enabled?Math.max(0,Math.min(1,(innerHeight*.72-top)/(innerHeight*.42))):1;
  const open=focusOpen?1:progress;
  const eased=open*open*(3-2*open);
  const angle=-88*(1-eased);
  lid.style.setProperty('--lid-angle',`${angle.toFixed(2)}deg`);
  // Remove the untransformed lid's empty height above the folded notebook.
  const lift=lid.offsetHeight*(1-Math.cos(angle*Math.PI/180));
  stage.style.setProperty('--lid-lift',`${lift.toFixed(2)}px`);
  stage.style.setProperty('--screen-opacity',String(Math.max(0,Math.min(1,(open-.16)/.24))));
  stage.style.setProperty('--cover-opacity',String(1-Math.max(0,Math.min(1,(open-.12)/.22))));
  stage.style.setProperty('--hint-opacity',String(1-open));
  // Tab focus opens the display immediately; a folded screen never traps focus.
  app.style.pointerEvents=open<.85?'none':'';
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update);}
 stage.addEventListener('focusin',()=>{focusOpen=true;update();});
 stage.addEventListener('focusout',event=>{if(!stage.contains(event.relatedTarget)){focusOpen=false;queue();}});
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue);
 motion.addEventListener('change',update);
 update();
})();
