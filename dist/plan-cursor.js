/* A viewport cursor allows smooth colour fades without changing its pixel shape. */
(() => {
 const screen=document.querySelector('.laptop-screen');
 if(!screen)return;
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const cursor=document.createElement('span');
 const arrow=document.createElement('img');
 const outline=document.createElement('img');
 arrow.className='plan-pixel-arrow';
 arrow.alt='';
 outline.alt='';
 cursor.append(outline,arrow);
 cursor.className='plan-pixel-cursor';
 cursor.setAttribute('aria-hidden','true');
 cursor.hidden=true;
 document.body.append(cursor);
 let timer=0,hue=0,hovered=false,ready=false;
 function stop(){clearInterval(timer);timer=0;}
 function refresh(){
  stop();
  const active=ready&&hovered&&fine.matches&&!document.hidden;
  cursor.hidden=!active;
  screen.classList.toggle('has-pixel-cursor',active);
  if(reduced.matches){hue=0;arrow.style.filter='hue-rotate(0deg)';}
  if(active&&!reduced.matches){
   timer=setInterval(()=>{
    hue+=90;
    arrow.style.filter=`hue-rotate(${hue}deg)`;
   },5000);
  }
 }
 function move(event){
  if(event.pointerType==='touch')return;
  cursor.style.transform=`translate3d(${event.clientX-3}px,${event.clientY-5}px,0)`;
  if(!hovered){hovered=true;refresh();}
 }
 function leave(){hovered=false;refresh();}
 let loaded=0;
 for(const layer of [arrow,outline]){
  layer.addEventListener('load',()=>{loaded++;ready=loaded===2;refresh();});
  layer.addEventListener('error',()=>{ready=false;refresh();});
 }
 arrow.src=new URL('assets/cursors/pixel-arrow-fill.svg',document.currentScript.src).href;
 outline.src=new URL('assets/cursors/pixel-arrow-outline.svg',document.currentScript.src).href;
 screen.addEventListener('pointerenter',move);
 screen.addEventListener('pointermove',move);
 screen.addEventListener('pointerleave',leave);
 screen.addEventListener('pointercancel',leave);
 fine.addEventListener('change',refresh);
 reduced.addEventListener('change',refresh);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)leave();else refresh();});
 window.addEventListener('blur',leave);
 window.addEventListener('pagehide',leave);
 refresh();
})();
