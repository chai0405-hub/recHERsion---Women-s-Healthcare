/* Sakhi Health - state, analysis rules, screens */
/* ---------- state ---------- */
const LKEY='sakhi_lang';
let lang='en';try{lang=localStorage.getItem(LKEY)||'en'}catch(e){}
let tab='log',selDate=null,entries=[],user=Auth.current(),authMode='login';
function load(){try{return JSON.parse(localStorage.getItem(Auth.dataKey(user)))||[]}catch(e){return []}}
function persist(){if(!user)return;try{localStorage.setItem(Auth.dataKey(user),JSON.stringify(entries))}catch(e){}}
entries=user?load():[];
const T=k=>UI[lang][k];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
const today=()=>iso(new Date());
const addDays=(s,n)=>{const d=new Date(s+'T00:00:00');d.setDate(d.getDate()+n);return iso(d)};
const diff=(a,b)=>Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5);
const fmt=s=>new Date(s+'T00:00:00').toLocaleDateString(lang==='kn'?'kn-IN':'en-IN',{day:'numeric',month:'short',year:'numeric'});
const r1=x=>Math.round(x*10)/10;

/* ---------- analysis (transparent rules) ---------- */
function analyze(){
  const e=[...entries].sort((a,b)=>a.date<b.date?-1:1),n=e.length;
  const starts=e.filter(x=>x.periodStart).map(x=>x.date);
  const cycles=[];for(let i=1;i<starts.length;i++)cycles.push(diff(starts[i-1],starts[i]));
  const avgCycle=cycles.length?cycles.reduce((a,b)=>a+b,0)/cycles.length:null;
  const range=cycles.length?Math.max(...cycles)-Math.min(...cycles):0;
  const freq={};Object.keys(SYMS).forEach(k=>freq[k]=n?e.filter(x=>x.syms.includes(k)).length/n:0);
  const mean=f=>n?e.reduce((a,x)=>a+f(x),0)/n:0;
  const avgPain=mean(x=>x.pain),avgEnergy=mean(x=>x.energy);
  const maxPain=n?Math.max(...e.map(x=>x.pain)):0;
  const highPainDays=e.filter(x=>x.pain>=7).length;
  const heavyDays=e.filter(x=>x.flow===3).length;
  const pc=k=>Math.round(freq[k]*100);
  const sc=(k,thr)=>({met:freq[k]>=thr,text:{en:`${SYMS[k].en} (${pc(k)}% of days)`,kn:`${SYMS[k].kn} (${pc(k)}% ದಿನಗಳು)`}});
  const irregular=(cycles.length>=2&&(avgCycle>35||avgCycle<21||range>=8))||freq.irregular>=0.2;
  const cycCrit={met:irregular,text:cycles.length?{en:UI.en.cyc(Math.round(avgCycle),range),kn:UI.kn.cyc(Math.round(avgCycle),range)}:{en:'Cycle regularity (needs 3+ period starts)',kn:'ಚಕ್ರದ ಕ್ರಮಬದ್ಧತೆ (3+ ಮುಟ್ಟು ಪ್ರಾರಂಭ ಬೇಕು)'}};
  const pats=[];
  const add=(id,crit,flag)=>{const m=crit.filter(c=>c.met).length;pats.push({id,crit,matched:m,total:crit.length,flagged:flag(crit,m)})};
  add('pcos',[cycCrit,sc('acne',.2),sc('hair',.15),sc('hairloss',.15),sc('weight',.15)],(c,m)=>c[0].met&&m>=2);
  add('iron',[
    {met:heavyDays>=2,text:{en:`Heavy flow on ${heavyDays} day(s)`,kn:`${heavyDays} ದಿನ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ`}},
    sc('fatigue',.3),sc('dizzy',.1),sc('pale',.1),
    {met:avgEnergy<=4&&n>0,text:{en:`Low average energy (${r1(avgEnergy)}/10)`,kn:`ಕಡಿಮೆ ಸರಾಸರಿ ಶಕ್ತಿ (${r1(avgEnergy)}/10)`}}
  ],(c,m)=>c[1].met&&m>=3);
  add('endo',[
    {met:highPainDays>=2,text:{en:`Pain 7+/10 on ${highPainDays} day(s)`,kn:`${highPainDays} ದಿನ ನೋವು 7+/10`}},
    sc('painful',.1),sc('pelvic',.15),
    {met:avgPain>=4,text:{en:`Average pain ${r1(avgPain)}/10`,kn:`ಸರಾಸರಿ ನೋವು ${r1(avgPain)}/10`}},
    {met:heavyDays>=1,text:{en:`Heavy flow on ${heavyDays} day(s)`,kn:`${heavyDays} ದಿನ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ`}}
  ],(c,m)=>c[0].met&&m>=3);
  add('thyroid',[sc('fatigue',.15),sc('weight',.15),sc('cold',.15),sc('hairloss',.15),sc('moodsw',.15),sc('palp',.1),sc('sleep',.15)],(c,m)=>m>=4);
  return{e,n,starts,cycles,avgCycle,range,freq,avgPain,avgEnergy,maxPain,highPainDays,heavyDays,pats,pc};
}

/* ---------- UI helpers ---------- */
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
function toggleLang(){lang=lang==='en'?'kn':'en';try{localStorage.setItem(LKEY,lang)}catch(e){}render()}
function go(t){tab=t;render();window.scrollTo(0,0)}
function openDate(d){selDate=d;tab='log';render();window.scrollTo(0,0)}
function pick(el,group){el.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('on'));el.classList.add('on')}

function chart(a){
  if(!a.n)return'';
  const last=a.e[a.n-1].date,first=addDays(last,-59),W=600,H=150,P=22;
  const x=d=>P+(diff(first,d)/59)*(W-2*P),y=v=>H-P-(v/10)*(H-2*P);
  let bars='',pts=[],marks='';
  a.e.filter(z=>z.date>=first).forEach(z=>{
    bars+=`<rect x="${x(z.date)-3}" y="${y(z.pain)}" width="6" height="${Math.max(0,H-P-y(z.pain))}" rx="2" fill="#f9a8d4"/>`;
    pts.push(`${x(z.date)},${y(z.energy)}`);
    if(z.periodStart)marks+=`<circle cx="${x(z.date)}" cy="${H-8}" r="4.5" fill="#9d174d"/>`;
  });
  return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><line x1="${P}" y1="${H-P}" x2="${W-P}" y2="${H-P}" stroke="#e5e7eb"/>${bars}<polyline points="${pts.join(' ')}" fill="none" stroke="#be185d" stroke-width="2"/>${marks}</svg>`;
}

/* ---------- screens ---------- */
function viewLog(){
  const d=selDate||today();selDate=d;
  const ex=entries.find(x=>x.date===d)||{periodStart:false,flow:0,pain:0,energy:6,mood:3,syms:[],notes:''};
  const moods=['😞','😕','😐','🙂','😊'];
  const recent=[...entries].sort((a,b)=>a.date<b.date?1:-1).slice(0,7);
  return`<div class="card">
    <label>${T('date')}</label><input type="date" id="f_date" value="${d}" max="${today()}" onchange="selDate=this.value;render()">
    <label><input type="checkbox" id="f_ps" ${ex.periodStart?'checked':''}> ${T('period')}</label>
    <label>${T('flow')}</label>
    <div class="row seg" id="f_flow">${[0,1,2,3].map(i=>`<button type="button" data-v="${i}" class="${ex.flow===i?'on':''}" onclick="pick(this)">${T('f'+i)}</button>`).join('')}</div>
    <label>${T('pain')}: <span id="pv">${ex.pain}</span>/10</label><input type="range" id="f_pain" min="0" max="10" value="${ex.pain}" oninput="pv.textContent=this.value">
    <label>${T('energy')}: <span id="ev">${ex.energy}</span>/10</label><input type="range" id="f_energy" min="0" max="10" value="${ex.energy}" oninput="ev.textContent=this.value">
    <label>${T('mood')}</label>
    <div class="row mood" id="f_mood">${moods.map((m,i)=>`<button type="button" data-v="${i+1}" class="${ex.mood===i+1?'on':''}" onclick="pick(this)">${m}</button>`).join('')}</div>
    <label>${T('syms')}</label>
    <div class="row" id="f_syms">${Object.keys(SYMS).map(k=>`<button type="button" class="chip ${ex.syms.includes(k)?'on':''}" data-k="${k}" onclick="this.classList.toggle('on')">${SYMS[k][lang]}</button>`).join('')}</div>
    <label>${T('notes')}</label><textarea id="f_notes" rows="2">${esc(ex.notes)}</textarea>
    <p><button class="primary" onclick="saveEntry()">${T('save')}</button></p>
  </div>
  <div class="card"><h3>${T('recent')}</h3>
    ${recent.length?recent.map(r=>`<div class="recent" onclick="openDate('${r.date}')"><span>${fmt(r.date)}${r.periodStart?' 🩸':''}</span><span class="mute">${T('pain')} ${r.pain} · ${T('energy')} ${r.energy}</span></div>`).join(''):`<p class="mute">${T('noEntries')}</p>`}
    <p class="row noprint"><button class="ghost" onclick="loadDemo()">${T('demo')}</button><button class="ghost danger" onclick="clearAll()">${T('clear')}</button></p>
  </div>`;
}
function saveEntry(){
  const g=id=>document.getElementById(id);
  const on=sel=>{const b=document.querySelector(sel+' button.on');return b?+b.dataset.v:0};
  const e={date:g('f_date').value||today(),periodStart:g('f_ps').checked,flow:on('#f_flow'),pain:+g('f_pain').value,energy:+g('f_energy').value,mood:on('#f_mood')||3,
    syms:[...document.querySelectorAll('#f_syms .chip.on')].map(b=>b.dataset.k),notes:g('f_notes').value.slice(0,300)};
  entries=entries.filter(x=>x.date!==e.date);entries.push(e);persist();toast(T('saved'));render();
}
function clearAll(){if(confirm(T('confirmClear'))){entries=[];persist();selDate=null;toast(T('cleared'));render()}}
function loadDemo(){
  let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
  const end=today(),begin=addDays(end,-89),starts=[addDays(end,-87),addDays(end,-49),addDays(end,-8)];
  entries=[];
  for(let i=0;i<90;i++){
    const d=addDays(begin,i),ps=starts.includes(d);
    const sinceP=Math.min(...starts.map(p=>diff(p,d)).filter(v=>v>=0).concat([99]));
    const inP=sinceP>=0&&sinceP<6;
    const syms=[];const add=(k,p)=>{if(rnd()<p)syms.push(k)};
    add('acne',.45);add('hair',.3);add('hairloss',.3);add('weight',.28);add('fatigue',.3);add('bloat',.2);add('headache',.15);add('moodsw',.1);add('sleep',.1);add('irregular',.2);
    if(inP)add('painful',.6);
    let pain=inP?Math.round(3+rnd()*3):Math.round(rnd()*2);
    entries.push({date:d,periodStart:ps,flow:inP?(sinceP<2?3-(rnd()<.5?1:0):sinceP<4?2:1):0,pain,energy:Math.round(4+rnd()*4),mood:Math.round(2+rnd()*3),syms,notes:''});
  }
  persist();toast(T('demoLoaded'));go('insights');
}

function viewInsights(){
  const a=analyze();
  if(a.n<7)return`<div class="card"><p>${T('need')}</p><p><button class="ghost" onclick="go('log')">${T('tLog')}</button> <button class="ghost" onclick="loadDemo()">${T('demo')}</button></p></div>`;
  const flagged=a.pats.filter(p=>p.flagged),rest=a.pats.filter(p=>!p.flagged);
  const card=(p,cls)=>`<div class="card ${cls}"><span class="pill ${p.flagged?'':'g'}">${p.matched}/${p.total} ${T('match')}</span>
    <h3 style="margin-top:8px">${PATTERNS[p.id].name[lang]}</h3>
    <div class="bar"><i style="width:${p.matched/p.total*100}%"></i></div>
    ${p.flagged?`<p>${PATTERNS[p.id].desc[lang]}</p>`:''}
    <ul class="cr">${p.crit.map(c=>`<li class="${c.met?'y':'n'}">${esc(c.text[lang])}</li>`).join('')}</ul>
    ${p.flagged?`<b>${T('tests')}</b><ul>${PATTERNS[p.id].tests[lang].map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
  </div>`;
  return`<div class="stats">
    <div class="stat"><b>${a.n}</b><span>${T('days')}</span></div>
    <div class="stat"><b>${a.avgCycle?Math.round(a.avgCycle):'–'}</b><span>${T('avgCycle')}</span></div>
    <div class="stat"><b>${r1(a.avgPain)}</b><span>${T('avgPain')}</span></div>
    <div class="stat"><b>${r1(a.avgEnergy)}</b><span>${T('avgEnergy')}</span></div></div>
  <div class="card">${chart(a)}<p class="mute">${T('trend')}</p></div>
  <div class="warn">${T('disc')}</div>
  <h3>${T('flagged')}</h3>
  ${flagged.length?flagged.map(p=>card(p,'flag')).join(''):`<div class="card"><p>${T('noFlag')}</p></div>`}
  <div class="warn">${T('urgent')}</div>
  ${rest.length?`<h3>${T('others')}</h3>`+rest.map(p=>card(p,'low')).join(''):''}
  <p class="row"><button class="primary" onclick="go('report')">${T('tRep')} →</button></p>`;
}

function reportText(a){
  const fl=a.pats.filter(p=>p.flagged);
  let t=`*${T('rTitle')}*\n${T('rGen')}: ${fmt(today())}\n${T('rPeriod')}: ${fmt(a.e[0].date)} - ${fmt(a.e[a.n-1].date)} (${a.n} ${T('days')})\n\n`;
  t+=a.cycles.length?T('rCycleTxt')(a.cycles.length,Math.round(a.avgCycle),Math.min(...a.cycles),Math.max(...a.cycles)):T('rNoCycles');
  t+=`\n${T('rPainTxt')(r1(a.avgPain),a.maxPain,a.highPainDays)}\n`;
  const top=Object.keys(SYMS).filter(k=>a.freq[k]>0).sort((x,y)=>a.freq[y]-a.freq[x]).slice(0,6);
  t+=`\n${T('rSymp')}:\n`+top.map(k=>`- ${SYMS[k][lang]}: ${a.pc(k)}%`).join('\n');
  if(fl.length)t+=`\n\n${T('flagged')}:\n`+fl.map(p=>`- ${PATTERNS[p.id].name[lang]}`).join('\n');
  return t+`\n\n${T('disc')}`;
}
function viewReport(){
  const a=analyze();
  if(a.n<7)return`<div class="card"><p>${T('need')}</p></div>`;
  const fl=a.pats.filter(p=>p.flagged);
  const top=Object.keys(SYMS).filter(k=>a.freq[k]>0).sort((x,y)=>a.freq[y]-a.freq[x]).slice(0,8);
  const qs=[...new Set(fl.flatMap(p=>PATTERNS[p.id].qs[lang]))],tests=[...new Set(fl.flatMap(p=>PATTERNS[p.id].tests[lang]))];
  return`<div class="card"><h2>${T('rTitle')}</h2>${user&&!user.guest?`<p><b>${esc(user.name)}</b></p>`:''}
    <p class="mute">${T('rGen')}: ${fmt(today())} · ${T('rPeriod')}: ${fmt(a.e[0].date)} – ${fmt(a.e[a.n-1].date)} (${a.n} ${T('days')})</p>
    <h3>${T('rCycles')}</h3>
    <p>${a.cycles.length?T('rCycleTxt')(a.cycles.length,Math.round(a.avgCycle),Math.min(...a.cycles),Math.max(...a.cycles)):T('rNoCycles')}</p>
    <p>${T('rPainTxt')(r1(a.avgPain),a.maxPain,a.highPainDays)} ${T('rHeavy')}: ${a.heavyDays}.</p>
    <h3>${T('rSymp')}</h3>
    <table><tr><th>${T('rSympCol')}</th><th>${T('rPct')}</th></tr>${top.map(k=>`<tr><td>${SYMS[k][lang]}</td><td>${a.pc(k)}%</td></tr>`).join('')}</table>
    ${fl.length?`<h3>${T('flagged')}</h3><ul>${fl.map(p=>`<li><b>${PATTERNS[p.id].name[lang]}</b> (${p.matched}/${p.total})</li>`).join('')}</ul>
    <h3>${T('tests')}</h3><ul>${tests.map(t=>`<li>${t}</li>`).join('')}</ul>
    <h3>${T('ask')}</h3><ul>${qs.map(q=>`<li>${q}</li>`).join('')}</ul>`:`<p>${T('noFlag')}</p>`}
    <div class="warn">${T('disc')}</div>
  </div>
  <p class="row noprint"><button class="primary" onclick="window.print()">${T('print')}</button><button class="ghost" onclick="shareWA()">${T('wa')}</button></p>`;
}
function shareWA(){window.open('https://wa.me/?text='+encodeURIComponent(reportText(analyze())),'_blank')}

function viewPrivacy(){
  return`<div class="card"><h2>🔒 ${T('ptitle')}</h2><ul>${T('pText').map(x=>`<li>${x}</li>`).join('')}</ul>
  <div class="warn">${T('disc')}</div></div>`;
}

/* ---------- account screens ---------- */
function viewAuth(){
  const reg=authMode==='register';
  const pw=(id,label,auto,extra)=>`<label for="${id}">${label}</label><div class="pwrow"><input id="${id}" type="password" autocomplete="${auto}" ${extra||''}><button type="button" class="ghost" onclick="togglePw('${id}',this)">${T('aShow')}</button></div>`;
  return`<div class="card auth">
    <h2>🌸 ${reg?T('aRegister'):T('aLogin')}</h2>
    <p class="mute">${T('aLocalNote')}</p>
    <form onsubmit="return submitAuth(event)" novalidate>
      ${reg?`<label for="a_name">${T('aName')}</label><input id="a_name" type="text" autocomplete="name" maxlength="60">`:''}
      <label for="a_email">${T('aEmail')}</label><input id="a_email" type="email" autocomplete="email" inputmode="email">
      ${pw('a_pw',T('aPass'),reg?'new-password':'current-password',reg?'oninput="meter(this.value)"':'')}
      ${reg?`<div class="meter"><i id="a_meter"></i></div><small class="mute">${T('aPassHint')}</small>
        ${pw('a_pw2',T('aPass2'),'new-password')}
        <label class="chk"><input type="checkbox" id="a_consent"> <span>${T('aConsent')}</span></label>`
        :`<label class="chk"><input type="checkbox" id="a_remember" checked> <span>${T('aRemember')}</span></label>`}
      <div id="a_err" class="err" role="alert"></div>
      <button class="primary wide" id="a_btn" type="submit">${reg?T('aRegister'):T('aLogin')}</button>
    </form>
    <p class="center">${reg?T('aHaveAcct'):T('aNoAcct')} <a href="#" onclick="setAuthMode('${reg?'login':'register'}');return false">${reg?T('aLogin'):T('aRegister')}</a></p>
    <p class="center mute">— ${T('aOr')} —</p>
    <p class="center"><button class="ghost" onclick="guestLogin()">${T('aGuest')}</button></p>
  </div>`;
}
function meter(v){const m=document.getElementById('a_meter');if(m)m.style.width=(Auth.strength(v)/4*100)+'%'}
function togglePw(id,btn){const i=document.getElementById(id);const show=i.type==='password';i.type=show?'text':'password';btn.textContent=show?T('aHide'):T('aShow')}
function setAuthMode(m){authMode=m;render()}
async function submitAuth(ev){
  ev.preventDefault();
  const v=id=>{const el=document.getElementById(id);return el?el.value:''};
  const c=id=>{const el=document.getElementById(id);return !!(el&&el.checked)};
  const errBox=document.getElementById('a_err'),btn=document.getElementById('a_btn');
  const label=btn.textContent;errBox.textContent='';btn.disabled=true;btn.textContent=T('aWait');
  let res;
  try{
    res=authMode==='register'
      ?await Auth.register({name:v('a_name'),email:v('a_email'),password:v('a_pw'),confirm:v('a_pw2'),consent:c('a_consent')})
      :await Auth.login({email:v('a_email'),password:v('a_pw'),remember:c('a_remember')});
  }catch(e){res={ok:false,err:'aErrStorage'}}
  if(!res.ok){errBox.textContent=T(res.err).replace('{s}',res.wait||'');btn.disabled=false;btn.textContent=label;return false}
  startSession(res.user);return false;
}
function startSession(u){user=u;entries=load();tab='log';selDate=null;render();toast(T('aWelcome')+', '+u.name);window.scrollTo(0,0)}
function guestLogin(){startSession(Auth.guest().user)}
function logout(){Auth.logout();user=null;entries=[];selDate=null;authMode='login';render();window.scrollTo(0,0)}
function deleteAccount(){if(confirm(T('aConfirmDelete'))){Auth.remove(user.email);user=null;entries=[];authMode='register';render();window.scrollTo(0,0)}}
function accountCard(){
  if(!user)return'';
  return`<div class="card"><h3>👤 ${T('aAccount')}</h3><p><b>${esc(user.name)}</b><br><span class="mute">${user.guest?T('aGuestNote'):esc(user.email)}</span></p>
    <p class="row noprint"><button class="ghost" onclick="logout()">${T('aLogout')}</button>${user.guest?'':`<button class="ghost danger" onclick="deleteAccount()">${T('aDelete')}</button>`}</p></div>`;
}

function render(){
  document.documentElement.lang=lang;
  document.getElementById('tagline').textContent=T('tagline');
  document.getElementById('langBtn').textContent=lang==='en'?'ಕನ್ನಡ':'English';
  document.getElementById('userBox').innerHTML=user?`<span class="uname">👤 ${esc(user.name)}</span><button class="ghost sm" onclick="logout()">${T('aLogout')}</button>`:'';
  if(!user){document.getElementById('tabs').innerHTML='';document.getElementById('app').innerHTML=viewAuth();return}
  const tabs=[['log','tLog'],['insights','tIns'],['report','tRep'],['privacy','tPriv']];
  document.getElementById('tabs').innerHTML=tabs.map(([k,l])=>`<button class="${tab===k?'on':''}" onclick="go('${k}')">${T(l)}</button>`).join('');
  const v={log:viewLog,insights:viewInsights,report:viewReport,privacy:viewPrivacy}[tab];
  document.getElementById('app').innerHTML=v()+(tab==='privacy'?accountCard():'');
}
render();
