// app.js placed alongside index.html (inside unsubday_test_bundle)
const initialSubs=[
{"id":"1","name":"Spotify","price":"$9.99","nextRenewal":"2025-11-01"},
{"id":"2","name":"Netflix","price":"$15.99","nextRenewal":"2025-10-30"},
{"id":"3","name":"Adobe Creative Cloud","price":"$52.99","nextRenewal":"2025-11-03"},
{"id":"4","name":"YouTube Premium","price":"$13.99","nextRenewal":"2025-11-05"},
{"id":"5","name":"iCloud+ 200GB","price":"$2.99","nextRenewal":"2025-11-02"},
{"id":"6","name":"Disney+","price":"$13.99","nextRenewal":"2025-11-07"},
{"id":"7","name":"Amazon Prime","price":"$14.99","nextRenewal":"2025-11-15"},
{"id":"8","name":"Notion Pro","price":"$8.00","nextRenewal":"2025-11-09"},
{"id":"9","name":"Figma Professional","price":"$12.00","nextRenewal":"2025-11-12"},
{"id":"10","name":"1Password","price":"$2.99","nextRenewal":"2025-11-20"},
{"id":"11","name":"ChatGPT Plus","price":"$20.00","nextRenewal":"2025-11-01"},
{"id":"12","name":"Xbox Game Pass","price":"$10.99","nextRenewal":"2025-11-04"}
];
let subs=JSON.parse(localStorage.getItem('unsubday_demo_subs')||'null'); if(!Array.isArray(subs)||subs.length===0){subs=initialSubs.slice(); localStorage.setItem('unsubday_demo_subs', JSON.stringify(subs));}
function save(){localStorage.setItem('unsubday_demo_subs', JSON.stringify(subs));}
const bodyEl=document.getElementById('subsBody');
function render(){bodyEl.innerHTML=''; subs.forEach((s,i)=>{const tr=document.createElement('tr'); tr.innerHTML=`
<td>${s.name}</td><td>${s.price}</td><td>${s.nextRenewal}</td>
<td class="actions">
<button class="btn" data-action="paid" data-i="${i}">Paid</button>
<button class="btn" data-action="unsub" data-i="${i}">Unsub</button>
<button class="btn" data-action="remind" data-i="${i}">Remind</button>
<button class="btn danger" data-action="delete" data-i="${i}">Delete</button>
</td>`; bodyEl.appendChild(tr);});}
render();
bodyEl.addEventListener('click',(e)=>{const btn=e.target.closest('button'); if(!btn) return; const i=+btn.dataset.i; const act=btn.dataset.action;
if(act==='paid') alert('Mark as paid: '+subs[i].name);
if(act==='unsub') alert('Unsubscribe: '+subs[i].name);
if(act==='remind') alert('Set reminder: '+subs[i].name);
if(act==='delete') openDelete(i);
});
let deleteIndex=-1; const delOverlay=document.getElementById('deleteOverlay'); const delName=document.getElementById('delName');
document.getElementById('delCancel').onclick=()=>closeDel();
document.getElementById('delConfirm').onclick=()=>{ if(deleteIndex>=0){ subs.splice(deleteIndex,1); save(); render(); } closeDel(); };
function openDelete(i){ deleteIndex=i; delName.textContent=subs[i].name; delOverlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDel(){ delOverlay.classList.remove('open'); document.body.style.overflow=''; deleteIndex=-1; }
delOverlay.addEventListener('click',(e)=>{ if(e.target===delOverlay) closeDel(); });
const resetOverlay=document.getElementById('resetOverlay');
document.getElementById('btnReset').onclick=()=>{ resetOverlay.classList.add('open'); document.body.style.overflow='hidden'; };
document.getElementById('resetCancel').onclick=()=>closeReset();
document.getElementById('resetConfirm').onclick=()=>{ const clear=document.getElementById('resetClear').checked; alert('Reset closest renewals'+(clear?' and cleared reminders.':'.')); closeReset(); };
function closeReset(){ resetOverlay.classList.remove('open'); document.body.style.overflow=''; document.getElementById('resetClear').checked=false; }
resetOverlay.addEventListener('click',(e)=>{ if(e.target===resetOverlay) closeReset(); });
const notifOverlay=document.getElementById('notifOverlay'); const notifList=document.getElementById('notifList');
document.getElementById('btnNotifications').onclick=()=>{ notifList.innerHTML='<li>No notifications yet.</li>'; notifOverlay.classList.add('open'); document.body.style.overflow='hidden'; };
document.getElementById('notifClose').onclick=()=>closeNotif();
function closeNotif(){ notifOverlay.classList.remove('open'); document.body.style.overflow=''; }
notifOverlay.addEventListener('click',(e)=>{ if(e.target===notifOverlay) closeNotif(); });
document.getElementById('btnRestore').onclick=()=>{ subs=initialSubs.slice(); save(); render(); };
