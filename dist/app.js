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
 let prepared='';const status=document.querySelector('#form-status'),download=document.querySelector('#download');
 form.addEventListener('input',()=>{download.hidden=true;prepared='';status.textContent='';});
 form.addEventListener('submit',event=>{event.preventDefault();if(form.elements.website2.value){status.textContent='Unable to prepare this inquiry. Please reload and try again.';return;}
 let first=null;for(const name of ['name','business','email','message']){const field=form.elements[name],error=document.querySelector(`#${name}-error`);let message='';if(!field.value.trim())message='Please fill in this field.';else if(!field.validity.valid)message=name==='email'?'Enter a valid email address, such as name@example.com.':'Please check this field.';field.setAttribute('aria-invalid',String(!!message));field.setAttribute('aria-describedby',`${name}-error`);error.textContent=message;if(message&&!first)first=field;}
 if(first){status.textContent='Please check the highlighted fields.';first.focus();return;}
 prepared=['Consultation inquiry',...(form.dataset.offer?[form.dataset.offer]:[]),...['name','business','email','profile','interest','message'].map(n=>`${n[0].toUpperCase()+n.slice(1)}: ${form.elements[n].value.trim()}`)].join('\n\n');status.textContent='Your inquiry is ready to download. It has not been sent. This preview has no delivery connection; save the text for when the agency contact details are available.';download.hidden=false;status.focus();
 });
 download.addEventListener('click',()=>{if(!prepared)return;const url=URL.createObjectURL(new Blob([prepared],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='consultation-inquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}
