const calendarOutput=document.getElementById('calendar-output');
document.querySelectorAll('[data-calendar-plan]').forEach(button=>button.addEventListener('click',()=>{
 const name=button.dataset.calendarPlan;
 const template=document.getElementById(`calendar-${name}`);
 if(!template||!calendarOutput)return;
 calendarOutput.replaceChildren(template.content.cloneNode(true));
 document.querySelectorAll('[data-calendar-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.getElementById('calendar-status').textContent=template.dataset.summary;
 const detail=document.getElementById('event-detail');
 detail.replaceChildren();
 const message=document.createElement('p');message.textContent='Select a content idea for details. Dates and themes are illustrative.';detail.append(message);
 const cta=document.getElementById('calendar-cta');cta.href=`${document.documentElement?.dataset.base||''}/contact.html?plan=${encodeURIComponent(name)}`;cta.textContent=`Discuss ${name} ↗`;
}));
document.querySelectorAll('[data-calendar-view]').forEach(button=>button.addEventListener('click',()=>{
 calendarOutput?.classList.toggle('list-view',button.dataset.calendarView==='list');
 document.querySelectorAll('[data-calendar-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
calendarOutput?.addEventListener('click',event=>{
 const item=event.target.closest('[data-event-title]');if(!item)return;
 calendarOutput.querySelectorAll('.calendar-event').forEach(b=>b.classList.toggle('selected',b===item));
 const title=document.createElement('strong'),description=document.createElement('p');
 title.textContent=item.dataset.eventTitle;description.textContent=item.dataset.eventDescription;
 document.getElementById('event-detail').replaceChildren(title,description);
});
document.querySelectorAll('[data-service-goal]').forEach(button=>button.addEventListener('click',()=>{
 const template=document.getElementById(`service-${button.dataset.serviceGoal}`);
 if(!template)return;
 document.getElementById('service-result').replaceChildren(template.content.cloneNode(true));
 document.querySelectorAll('[data-service-goal]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
