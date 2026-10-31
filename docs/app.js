const backToTop=document.querySelector('.back-to-top');
if(backToTop){
const updateBackToTop=()=>{
 const scrollable=document.documentElement.scrollHeight-window.innerHeight;
 backToTop.hidden=scrollable<=0||window.scrollY<=scrollable/2;
};
window.addEventListener('scroll',updateBackToTop,{passive:true});
window.addEventListener('resize',updateBackToTop);
new ResizeObserver(updateBackToTop).observe(document.body);
backToTop.addEventListener('click',()=>{
 window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 const topLink=document.querySelector('.skip');
 topLink?.focus({preventScroll:true});
});
updateBackToTop();
}

const toggle=document.querySelector('#menu-toggle');
if(toggle){
 const navigation=document.querySelector('#navigation');
 const backdrop=document.querySelector('#menu-backdrop');
 const mobile=window.matchMedia('(max-width:760px)');
 const background=[document.querySelector('main'),document.querySelector('footer')];
 const setMenu=open=>{
  toggle.setAttribute('aria-expanded',String(open));
  navigation.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  background.forEach(element=>{if(element)element.inert=open;});
 };
 toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
 backdrop?.addEventListener('click',()=>{setMenu(false);toggle.focus();});
 navigation.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
 mobile.addEventListener('change',()=>{if(!mobile.matches)setMenu(false);});
}
const form=document.querySelector('#inquiry');
document.querySelectorAll('[data-explore]').forEach(button=>{
 button.addEventListener('click',()=>{
  const template=document.getElementById(`mix-${button.dataset.explore}`);
  const preview=document.getElementById('plan-preview');
  if(!template||!preview)return;
  document.querySelectorAll('[data-explore]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  preview.replaceChildren(template.content.cloneNode(true));
 });
});
if(form){
 const interest=form.elements.interest;const plan=new URLSearchParams(location.search).get('plan');if([...interest.options].some(o=>o.value===plan))interest.value=plan;
 let prepared='',sending=false;const status=document.querySelector('#form-status'),download=document.querySelector('#download');
 const submit=form.querySelector('[type="submit"]');
 const celebrate=()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!Element.prototype.animate)return;
  const layer=document.createElement('div');
  layer.setAttribute('aria-hidden','true');
  layer.style.cssText='position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999';
  document.body.append(layer);
  const colors=['#f07865','#e7bb49','#71866a','#8ca9bf'];
  for(let i=0;i<64;i++){
   const piece=document.createElement('span');
   piece.style.cssText='position:absolute;top:-20px;left:'+Math.random()*100+'%;width:8px;height:12px;background:'+colors[i%colors.length]+';border-radius:2px';
   layer.append(piece);
   piece.animate([
    {transform:'translate3d(0,-20px,0) rotate(0deg)',opacity:1},
    {transform:'translate3d('+(Math.random()*240-120)+'px,'+(window.innerHeight+60)+'px,0) rotate('+(Math.random()*1080-540)+'deg)',opacity:0}
   ],{duration:1800+Math.random()*1000,delay:Math.random()*250,easing:'cubic-bezier(.2,.6,.5,1)',fill:'both'});
  }
  setTimeout(()=>layer.remove(),3200);
 };
 form.addEventListener('input',()=>{download.hidden=true;prepared='';status.textContent='';});
 form.addEventListener('submit',async event=>{event.preventDefault();if(sending)return;if(form.elements.website2.value){status.textContent='Unable to send this inquiry. Please reload and try again.';return;}
 let first=null;for(const name of ['name','business','email','message']){const field=form.elements[name],error=document.querySelector(`#${name}-error`);let message='';if(!field.value.trim())message='Please fill in this field.';else if(!field.validity.valid)message=name==='email'?'Enter a valid email address, such as name@example.com.':'Please check this field.';field.setAttribute('aria-invalid',String(!!message));field.setAttribute('aria-describedby',`${name}-error`);error.textContent=message;if(message&&!first)first=field;}
 if(first){status.textContent='Please check the highlighted fields.';first.focus();return;}
 prepared=['Consultation inquiry',...(form.dataset.offer?[form.dataset.offer]:[]),...['name','business','email','profile','interest','message'].map(n=>`${n[0].toUpperCase()+n.slice(1)}: ${form.elements[n].value.trim()}`)].join('\n\n');
 const recipient=form.dataset.recipient;
 if(!form.dataset.accessKey){status.textContent=`Your inquiry is ready to download. It has not been sent. Please email the downloaded inquiry to ${recipient}.`;download.hidden=false;status.focus();return;}
 const payload=Object.fromEntries(['name','business','email','profile','interest','message'].map(name=>[name,form.elements[name].value.trim()]));
 Object.assign(payload,{access_key:form.dataset.accessKey,subject:'LOCAL / SOCIAL — New consultation inquiry',from_name:'LOCAL / SOCIAL website',replyto:payload.email,offer:form.dataset.offer,botcheck:''});
 sending=true;submit.disabled=true;form.setAttribute('aria-busy','true');download.hidden=true;status.textContent='Sending your inquiry…';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  const result=await response.json();
  if(!response.ok||result.success!==true)throw new Error('Submission not accepted');
  status.textContent='Thanks so much for reaching out! We’ll review your message and get back to you shortly. We’re looking forward to learning more about your business.';prepared='';form.reset();celebrate();
 }catch{
  status.textContent=`We couldn’t confirm your submission. Your details are still here. Please email ${recipient}, or download a copy of your inquiry.`;download.hidden=false;
 }finally{clearTimeout(timeout);sending=false;submit.disabled=false;form.removeAttribute('aria-busy');status.focus();}
 });
 download.addEventListener('click',()=>{if(!prepared)return;const url=URL.createObjectURL(new Blob([prepared],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='consultation-inquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}
