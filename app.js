const toggle=document.querySelector('#menu-toggle');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));document.querySelector('#navigation').classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.click();toggle.focus();}});
const form=document.querySelector('#inquiry');
if(form){
 const interest=form.elements.interest;const plan=new URLSearchParams(location.search).get('plan');if([...interest.options].some(o=>o.value===plan))interest.value=plan;
 let prepared='';const status=document.querySelector('#form-status'),download=document.querySelector('#download');
 form.addEventListener('input',()=>{download.hidden=true;prepared='';status.textContent='';});
 form.addEventListener('submit',event=>{event.preventDefault();if(form.elements.website2.value){status.textContent='Unable to prepare this inquiry. Please reload and try again.';return;}
 let first=null;for(const name of ['name','business','email','message']){const field=form.elements[name],error=document.querySelector(`#${name}-error`);let message='';if(!field.value.trim())message='Please fill in this field.';else if(!field.validity.valid)message=name==='email'?'Enter a valid email address, such as name@example.com.':'Please check this field.';field.setAttribute('aria-invalid',String(!!message));field.setAttribute('aria-describedby',`${name}-error`);error.textContent=message;if(message&&!first)first=field;}
 if(first){status.textContent='Please check the highlighted fields.';first.focus();return;}
 prepared=['Consultation inquiry',...['name','business','email','profile','interest','message'].map(n=>`${n[0].toUpperCase()+n.slice(1)}: ${form.elements[n].value.trim()}`)].join('\n\n');status.textContent='Your inquiry is ready to download. It has not been sent. This preview has no delivery connection; save the text for when the agency contact details are available.';download.hidden=false;status.focus();
 });
 download.addEventListener('click',()=>{if(!prepared)return;const url=URL.createObjectURL(new Blob([prepared],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='consultation-inquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}
