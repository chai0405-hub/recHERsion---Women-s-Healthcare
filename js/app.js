/* Sakhi Health - state, analysis rules, screens */
/* ---------- state ---------- */
const LKEY='sakhi_lang';
let lang='en';try{lang=localStorage.getItem(LKEY)||'en'}catch(e){}
let scope='cycle',tab='log',selDate=null,entries=[],user=Auth.current(),authMode='login';
function load(){try{return JSON.parse(localStorage.getItem(Auth.dataKey(user)))||[]}catch(e){return []}}
function persist(){if(!user)return;try{localStorage.setItem(Auth.dataKey(user),JSON.stringify(entries))}catch(e){}}
const LPK=u=>Auth.dataKey(u)+'_lastperiod';
let lastP='',age=0;
const PROFK=u=>Auth.dataKey(u)+'_profile';
const PROF0=()=>({lpUnknown:false,miss:'',months:[],menarche:0,menUnknown:false,conds:[],fam:'',base:{done:false,len:0,reg:'',irrAge:0,pain:null,flow:'',syms:{}}});
let prof=PROF0();
function loadProf(){try{const o=JSON.parse(user&&localStorage.getItem(PROFK(user)));return o&&typeof o==='object'?Object.assign(PROF0(),o,{base:Object.assign(PROF0().base,(o&&o.base)||{})}):PROF0()}catch(e){returnPROF0()}}
function persistProf(){if(!user)return;try{localStorage.setItem(PROFK(user),JSON.stringify(prof))}catch(e){}}
const profDone=()=>!!age&&(!!lastP||prof.lpUnknown)&&!!prof.miss&&(prof.menarche>0||prof.menUnknown)&&prof.conds.length>0;
const lastMonths=()=>{const o=[],d=new Date();d.setDate(1);for(let i=0;i<6;i++){const x=new Date(d.getFullYear(),d.getMonth()-i,1);o.push(x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0'))}return o};
const monthLbl=m=>new Date(m+'-01T00:00:00').toLocaleDateString(lang==='kn'?'kn-IN':'en-IN',{month:'short',year:'numeric'});
const AGEK=u=>Auth.dataKey(u)+'_age';
let dob='';
function calcAge(d){if(!d)return 0;const b=new Date(d+'T00:00:00'),n=new Date();let a=n.getFullYear()-b.getFullYear();const m=n.getMonth()-b.getMonth();if(m<0||(m===0&&n.getDate()<b.getDate()))a--;return a>=9&&a<=90?a:0}
function loadAge(){try{dob=(user&&localStorage.getItem(AGEK(user)))||''}catch(e){dob=''}return calcAge(dob)}
function persistAge(){if(!user)return;try{dob?localStorage.setItem(AGEK(user),dob):localStorage.removeItem(AGEK(user))}catch(e){}}
function loadLP(){try{return(user&&localStorage.getItem(LPK(user)))||''}catch(e){return''}}
function persistLP(){if(!user)return;try{lastP?localStorage.setItem(LPK(user),lastP):localStorage.removeItem(LPK(user))}catch(e){}}
entries=user?load():[];lastP=loadLP();age=loadAge();prof=loadProf();
const T=k=>UI[lang][k];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
const today=()=>iso(new Date());
const addDays=(s,n)=>{const d=new Date(s+'T00:00:00');d.setDate(d.getDate()+n);return iso(d)};
const diff=(a,b)=>Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5);
const fmt=s=>new Date(s+'T00:00:00').toLocaleDateString(lang==='kn'?'kn-IN':'en-IN',{day:'numeric',month:'short',year:'numeric'});
const r1=x=>Math.round(x*10)/10;

/* ---------- analysis (transparent rules) ---------- */
function cycleStart(){const all=entries.filter(x=>x.periodStart).map(x=>x.date).concat(lastP?[lastP]:[]).sort();return all.length?all[all.length-1]:''}
function cycleInfo(avg){
  const cs=cycleStart();if(!cs)return null;
  const day=diff(cs,today())+1,L=Math.round(avg||28),ov=L-14;
  let ph='late';
  if(day<1)return null;
  if(day<=5)ph='menstrual';else if(day<ov-1)ph='follicular';else if(day<=ov+1)ph='ovulation';else if(day<=L)ph='luteal';
  return{start:cs,day,phase:ph,L};
}
function analyze(rng){
  rng=rng||scope;
  const all=[...entries].sort((a,b)=>a.date<b.date?-1:1);
  const starts=[...new Set(all.filter(x=>x.periodStart).map(x=>x.date).concat(lastP?[lastP]:[]))].sort();
  const cs=starts.length?starts[starts.length-1]:'';
  const e=(rng==='cycle'&&cs)?all.filter(x=>x.date>=cs):all,n=e.length;
  const cycles=[];for(let i=1;i<starts.length;i++)cycles.push(diff(starts[i-1],starts[i]));
  const avgCycle=cycles.length?cycles.reduce((a,b)=>a+b,0)/cycles.length:null;
  const range=cycles.length?Math.max(...cycles)-Math.min(...cycles):0;
  const LVL={1:.25,2:.6};
  const bf=k=>(prof.base.done&&LVL[prof.base.syms[k]])||0;
  const wL=Math.min(n,14)/14;
  const freq={};Object.keys(SYMS).forEach(k=>{const lg=n?e.filter(x=>x.syms.includes(k)).length/n:0;freq[k]=prof.base.done?(n?wL*lg+(1-wL)*bf(k):bf(k)):lg});
  const mean=f=>n?e.reduce((a,x)=>a+f(x),0)/n:0;
  const B=prof.base,w=Math.min(n,14)/14,bd=!!B.done,irrB=bd&&['irregular','later','start'].includes(B.reg);
  let avgPain=mean(x=>x.pain);const avgEnergy=mean(x=>x.energy);
  if(bd&&B.pain!=null)avgPain=n?w*avgPain+(1-w)*B.pain:B.pain;
  let maxPain=n?Math.max(...e.map(x=>x.pain)):0;if(bd&&B.pain!=null&&!n)maxPain=B.pain;
  let highPainDays=e.filter(x=>x.pain>=7).length;if(bd&&B.pain>=7)highPainDays=Math.max(highPainDays,2);
  let heavyDays=e.filter(x=>x.flow===3).length;if(bd&&B.flow==='heavy')heavyDays=Math.max(heavyDays,2);
  const pc=k=>Math.round(freq[k]*100);
  const sc=(k,thr)=>{const fromBase=prof.base.done&&bf(k)>0&&wL<1&&freq[k]>=bf(k)*(1-wL)&&freq[k]>0;
    return{met:freq[k]>=thr,text:fromBase?{en:`${SYMS[k].en} (${UI.en['lvl'+prof.base.syms[k]]}, last 3 months)`,kn:`${SYMS[k].kn} (${UI.kn['lvl'+prof.base.syms[k]]}, ಕಳೆದ 3 ತಿಂಗಳು)`}:{en:`${SYMS[k].en} (${pc(k)}% of days)`,kn:`${SYMS[k].kn} (${pc(k)}% ದಿನಗಳು)`}}};
  const yrs=(prof.menarche>0&&age)?age-prof.menarche:null;
  const teen=yrs!==null?yrs<=2:(age>0&&age<18),peri=age>=40,meno=age>=45;
  const kn=id=>prof.conds.includes(id);
  const knownC=id=>({met:kn(id),text:{en:UI.en.knownCrit,kn:UI.kn.knownCrit}});
  const lateMen={met:prof.menarche>=15,text:{en:UI.en.lateMen(prof.menarche),kn:UI.kn.lateMen(prof.menarche)}};
  const earlyMen={met:prof.menarche>0&&prof.menarche<12,text:{en:UI.en.earlyMen(prof.menarche),kn:UI.kn.earlyMen(prof.menarche)}};
  const famC={met:prof.fam==='yes',text:{en:UI.en.famCrit,kn:UI.kn.famCrit}};
  const missedN=prof.miss==='yes'?prof.months.length:0;
  const lpGap=lastP?diff(lastP,today()):0;
  const longGap=lpGap>(teen?60:45);
  const irregular=(cycles.length>=2&&(avgCycle>35||avgCycle<21||range>=8))||freq.irregular>=0.2||missedN>=2||longGap||irrB||(bd&&B.len>0&&(B.len>35||B.len<21));
  const irregularTeen=(cycles.length>=2&&(avgCycle>45||avgCycle<21||range>=15))||missedN>=3||longGap||(bd&&B.len>0&&(B.len>45||B.len<21));
  const baseCyc=cycles.length?{en:UI.en.cyc(Math.round(avgCycle),range),kn:UI.kn.cyc(Math.round(avgCycle),range)}:(bd&&B.len?{en:UI.en.cycSelf(B.len,irrB?'irregular':''),kn:UI.kn.cycSelf(B.len,irrB?'irregular':'')}:{en:'Cycle regularity (needs 3+ period starts)',kn:'ಚಕ್ರದ ಕ್ರಮಬದ್ಧತೆ (3+ ಮುಟ್ಟು ಪ್ರಾರಂಭ ಬೇಕು)'});
  const addEn=(missedN?' · '+UI.en.missedTxt(missedN):'')+(longGap?' · '+UI.en.gapTxt(lpGap):''),addKn=(missedN?' · '+UI.kn.missedTxt(missedN):'')+(longGap?' · '+UI.kn.gapTxt(lpGap):'');
  const cycText=(missedN||longGap)?{en:(cycles.length||(bd&&B.len)?baseCyc.en:UI.en.cycShort)+addEn,kn:(cycles.length||(bd&&B.len)?baseCyc.kn:UI.kn.cycShort)+addKn}:baseCyc;
  const cycCrit={met:irregular&&!teen&&!meno,text:teen?{en:UI.en.cycTeen,kn:UI.kn.cycTeen}:meno?{en:UI.en.cycMeno,kn:UI.kn.cycMeno}:cycText};
  const pats=[];
  const add=(id,core,flag,extra,kid)=>{const crit=core.concat(extra||[]);const cm=core.filter(c=>c.met).length,m=crit.filter(c=>c.met).length,known=!!kid&&kn(kid);pats.push({id,crit,matched:m,total:crit.length,known,flagged:flag(core,cm)||(known&&cm>=1)})};
  add('pcos',[cycCrit,sc('acne',.2),sc('hair',.15),sc('hairloss',.15),sc('weight',.15)],(c,m)=>c[0].met&&m>=2,[lateMen,famC,knownC('pcos')],'pcos');
  add('iron',[
    {met:heavyDays>=2,text:{en:`Heavy flow on ${heavyDays} day(s)`,kn:`${heavyDays} ದಿನ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ`}},
    sc('fatigue',.3),sc('dizzy',.1),sc('pale',.1),
    {met:avgEnergy<=4&&n>0,text:{en:`Low average energy (${n?r1(avgEnergy)+'/10':'needs daily logs'})`,kn:`ಕಡಿಮೆ ಸರಾಸರಿ ಶಕ್ತಿ (${n?r1(avgEnergy)+'/10':'ದೈನಂದಿನ ದಾಖಲೆ ಬೇಕು'})`}}
  ],(c,m)=>c[1].met&&m>=3,[knownC('anaemia')],'anaemia');
  add('endo',[
    {met:highPainDays>=2,text:{en:`Pain 7+/10 on ${highPainDays} day(s)`,kn:`${highPainDays} ದಿನ ನೋವು 7+/10`}},
    sc('painful',.1),sc('pelvic',.15),
    {met:avgPain>=4,text:{en:`Average pain ${r1(avgPain)}/10`,kn:`ಸರಾಸರಿ ನೋವು ${r1(avgPain)}/10`}},
    {met:heavyDays>=1,text:{en:`Heavy flow on ${heavyDays} day(s)`,kn:`${heavyDays} ದಿನ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ`}}
  ],(c,m)=>c[0].met&&m>=3,[earlyMen,knownC('endo')],'endo');
  add('thyroid',[sc('fatigue',.15),sc('weight',.15),sc('cold',.15),sc('hairloss',.15),sc('moodsw',.15),sc('palp',.1),sc('sleep',.15)],(c,m)=>m>=4,[lateMen,famC,knownC('thyroid')],'thyroid');
  if(teen)add('teen',[
    {met:true,text:yrs!==null?{en:UI.en.earlyYrs(yrs),kn:UI.kn.earlyYrs(yrs)}:{en:UI.en.ageCrit(age),kn:UI.kn.ageCrit(age)}},
    {met:irregularTeen,text:cycText},
    {met:highPainDays>=2||avgPain>=5,text:{en:`Pain 7+/10 on ${highPainDays} day(s), average ${r1(avgPain)}/10`,kn:`${highPainDays} ದಿನ ನೋವು 7+/10, ಸರಾಸರಿ ${r1(avgPain)}/10`}},
    {met:heavyDays>=2,text:{en:`Heavy flow on ${heavyDays} day(s)`,kn:`${heavyDays} ದಿನ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ`}},
    sc('fatigue',.3)
  ],(c,m)=>m>=2);
  if(peri)add('peri',[
    {met:true,text:{en:UI.en.ageCrit(age),kn:UI.kn.ageCrit(age)}},
    {met:irregular||(!!lastP&&diff(lastP,today())>=365),text:(lastP&&diff(lastP,today())>=365)?{en:UI.en.noPeriod12,kn:UI.kn.noPeriod12}:cycText},
    sc('hot',.1),sc('sleep',.15),sc('moodsw',.15),sc('palp',.1)
  ],(c,m)=>c[1].met&&m>=3&&(c[2].met||m>=4));
  return{yrs,menarche:prof.menarche,prof,missedN,age,scope:(rng==='cycle'&&cs)?'cycle':'all',e,n,starts,cycles,avgCycle:avgCycle||(bd&&B.len?B.len:null),range,freq,avgPain,avgEnergy,maxPain,highPainDays,heavyDays,pats,pc};
}

/* ---------- UI helpers ---------- */
function toast(m){const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
function setScope(v){scope=v;render()}
function toggleLang(){lang=lang==='en'?'kn':'en';try{localStorage.setItem(LKEY,lang)}catch(e){}render()}
function go(t){tab=t;render();window.scrollTo(0,0)}
function openDate(d){selDate=d;tab='log';render();window.scrollTo(0,0)}
function pick(el){el.parentNode.querySelectorAll('button').forEach(b=>{b.classList.remove('on');b.setAttribute('aria-pressed','false')});el.classList.add('on');el.setAttribute('aria-pressed','true')}
function toggleChip(b){b.classList.toggle('on');b.setAttribute('aria-pressed',b.classList.contains('on')?'true':'false')}
function cycleFont(){let n=0;try{n=((+localStorage.getItem('sakhi_fs')||0)+1)%3;localStorage.setItem('sakhi_fs',n)}catch(e){}applyFont()}
function applyFont(){let n=0;try{n=+localStorage.getItem('sakhi_fs')||0}catch(e){}document.documentElement.classList.remove('fs1','fs2');if(n)document.documentElement.classList.add('fs'+n)}

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
  return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T('trend')}" style="width:100%;height:auto"><line x1="${P}" y1="${H-P}" x2="${W-P}" y2="${H-P}" stroke="#e5e7eb"/>${bars}<polyline points="${pts.join(' ')}" fill="none" stroke="#be185d" stroke-width="2"/>${marks}</svg>`;
}

/* ---------- screens ---------- */
function viewLog(){
  const d=selDate||today();selDate=d;
  const saved=!!entries.find(x=>x.date===d);
  const ex=entries.find(x=>x.date===d)||{periodStart:false,flow:0,pain:0,energy:6,mood:3,syms:[],notes:''};
  const moods=['😞','😕','😐','🙂','😊'];
  const recent=[...entries].sort((a,b)=>a.date<b.date?1:-1).slice(0,7);
  const lpCard=`<div class="card"><h2 class="sub">${T('ageTitle')}</h2>
    <label for="f_dob">${T('ageLabel')}</label><input type="date" id="f_dob" value="${dob}" max="${today()}">
    <p class="mute">${age?T('rAge')+': <b>'+age+'</b>. ':''}${T('ageHint')}</p>
    <label for="f_men">${T('menLabel')}</label><input type="number" id="f_men" min="8" max="20" inputmode="numeric" value="${prof.menarche||''}" ${prof.menUnknown?'disabled':''}>
    <label class="chk"><input type="checkbox" id="f_menu" ${prof.menUnknown?'checked':''} onchange="document.getElementById('f_men').disabled=this.checked"> <span>${T('menUnknown')}</span></label>
    <p class="mute">${T('menHint')}</p>
    <label id="l_cond">${T('condTitle')}</label>
    <div class="row" id="f_conds" role="group" aria-labelledby="l_cond">${['thyroid','pcos','anaemia','diabetes','endo','none','unsure'].map(c=>`<button type="button" class="chip ${prof.conds.includes(c)?'on':''}" data-c="${c}" aria-pressed="${prof.conds.includes(c)}" onclick="condToggle(this)">${T('cd_'+c)}</button>`).join('')}</div>
    <label id="l_fam">${T('famTitle')}</label>
    <div class="row seg" id="f_fam" role="group" aria-labelledby="l_fam">${['yes','no','unsure'].map(v=>`<button type="button" data-v="${v}" aria-pressed="${prof.fam===v}" class="${prof.fam===v?'on':''}" onclick="pick(this)">${T('fam_'+v)}</button>`).join('')}</div>
    <h2 class="sub">${T('baseTitle')}</h2>
    <p class="mute">${T('baseHint')}</p>
    <label for="f_len">${T('baseLen')}</label><input type="number" id="f_len" min="15" max="90" inputmode="numeric" value="${prof.base.len||''}">
    <label id="l_reg">${T('baseReg')}</label>
    <div class="row seg" id="f_reg" role="group" aria-labelledby="l_reg">${['regular','later','start','unsure'].map(v=>`<button type="button" data-v="${v}" aria-pressed="${prof.base.reg===v}" class="${prof.base.reg===v?'on':''}" onclick="pick(this);regToggle(this.dataset.v)">${T('reg_'+v)}</button>`).join('')}</div>
    <div id="f_irr" ${prof.base.reg==='later'?'':'hidden'}><label for="f_irrage">${T('irrAge')}</label><input type="number" id="f_irrage" min="8" max="80" inputmode="numeric" value="${prof.base.irrAge||''}"></div>
    <label id="l_bflow">${T('baseFlow')}</label>
    <div class="row seg" id="f_bflow" role="group" aria-labelledby="l_bflow">${['light','medium','heavy'].map(v=>`<button type="button" data-v="${v}" aria-pressed="${prof.base.flow===v}" class="${prof.base.flow===v?'on':''}" onclick="pick(this)">${T('bf_'+v)}</button>`).join('')}</div>
    <label for="f_bpain">${T('basePain')}: <span id="bpv">${prof.base.pain==null?'–':prof.base.pain}</span>/10</label><input type="range" id="f_bpain" min="0" max="10" value="${prof.base.pain==null?3:prof.base.pain}" ${prof.base.pain!=null?'data-set="1"':''} oninput="bpv.textContent=this.value;this.dataset.set=1">
    <label id="l_bsyms">${T('baseSyms')}</label>
    <div class="bsyms" role="group" aria-labelledby="l_bsyms">${Object.keys(SYMS).map(k=>`<div class="bsym"><label for="bs_${k}">${SYMS[k][lang]}</label><select id="bs_${k}">${[0,1,2].map(v=>`<option value="${v}" ${(+prof.base.syms[k]||0)===v?'selected':''}>${T('lvl_'+v)}</option>`).join('')}</select></div>`).join('')}</div>
    <h2 class="sub">${T('lpTitle')}</h2>
    <label for="f_lp">${T('lpLabel')}</label><input type="date" id="f_lp" value="${lastP}" max="${today()}">
    <p class="mute">${lastP?T('lpAgo')(diff(lastP,today())):T('lpNone')}. ${T('lpHint')}</p>${(()=>{const c=cycleInfo(analyze('all').avgCycle);return c?`<p><b>${T('cycDay')(c.day)}</b> · ${T('ph_'+c.phase)}</p>`:''})()}
    <label class="chk"><input type="checkbox" id="f_lpu" ${prof.lpUnknown?'checked':''}> <span>${T('lpUnknown')}</span></label>
    <h2 class="sub">${T('missTitle')}</h2>
    <div class="row seg" id="f_miss" role="group" aria-label="${T('missTitle')}">${[['no','missNo'],['yes','missYes'],['unsure','missUnsure']].map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${prof.miss===v}" class="${prof.miss===v?'on':''}" onclick="pick(this);missToggle(this.dataset.v)">${T(l)}</button>`).join('')}</div>
    <div id="f_months" ${prof.miss==='yes'?'':'hidden'}><label id="l_months">${T('missWhich')}</label>
      <div class="row" role="group" aria-labelledby="l_months">${lastMonths().map(m=>`<button type="button" class="chip ${prof.months.includes(m)?'on':''}" data-m="${m}" aria-pressed="${prof.months.includes(m)}" onclick="toggleChip(this)">${monthLbl(m)}</button>`).join('')}</div></div>
    <p class="mute">${T('missHint')}</p>
    <p><button class="primary" onclick="saveLP()">${T('lpSave')}</button></p></div>`;
  return lpCard+`<div class="card">
    <label for="f_date">${T('date')}</label><input type="date" id="f_date" value="${d}" max="${today()}" onchange="selDate=this.value;render()">
    <label><input type="checkbox" id="f_ps" ${ex.periodStart?'checked':''}> ${T('period')}</label>
    <label id="l_flow">${T('flow')}</label>
    <div class="row seg" id="f_flow" role="group" aria-labelledby="l_flow">${[0,1,2,3].map(i=>`<button type="button" data-v="${i}" aria-pressed="${ex.flow===i}" class="${ex.flow===i?'on':''}" onclick="pick(this);flowHint(${i})">${T('f'+i)}</button>`).join('')}</div>
    <p class="mute">${T('flowHint')}</p>
    <label for="f_pain">${T('pain')}: <span id="pv">${ex.pain}</span>/10</label><input type="range" id="f_pain" min="0" max="10" value="${ex.pain}" oninput="pv.textContent=this.value;this.dataset.touched=1" ${saved?'data-touched="1"':''}>
    <label for="f_energy">${T('energy')}: <span id="ev">${ex.energy}</span>/10</label><input type="range" id="f_energy" min="0" max="10" value="${ex.energy}" oninput="ev.textContent=this.value;this.dataset.touched=1" ${saved?'data-touched="1"':''}>
    <label id="l_mood">${T('mood')}</label>
    <div class="row mood" id="f_mood" role="group" aria-labelledby="l_mood">${moods.map((m,i)=>`<button type="button" data-v="${i+1}" aria-label="${T('mood')} ${i+1}/5" aria-pressed="${ex.mood===i+1}" class="${ex.mood===i+1?'on':''}" onclick="pick(this)">${m}</button>`).join('')}</div>
    <label id="l_syms">${T('syms')}</label>
    <div class="row" id="f_syms" role="group" aria-labelledby="l_syms">${Object.keys(SYMS).map(k=>`<button type="button" class="chip ${ex.syms.includes(k)?'on':''}" data-k="${k}" aria-pressed="${ex.syms.includes(k)}" onclick="toggleChip(this)">${SYMS[k][lang]}</button>`).join('')}</div>
    <div class="voice noprint"><button type="button" class="ghost" id="v_btn" aria-pressed="false" onclick="voiceToggle()">${T('vStart')}</button> <span id="v_status" class="mute" role="status" aria-live="polite"></span></div>
    <label for="f_notes">${T('notes')}</label><textarea id="f_notes" rows="2">${esc(ex.notes)}</textarea>
    <p><button class="primary" onclick="saveEntry()">${T('save')}</button></p>
  </div>
  <div class="card"><h2 class="sub">${T('recent')}</h2>
    ${recent.length?recent.map(r=>`<div class="recent" onclick="openDate('${r.date}')"><span>${fmt(r.date)}${r.periodStart?' 🩸':''}</span><span class="mute">${T('pain')} ${r.pain} · ${T('energy')} ${r.energy}</span></div>`).join(''):`<p class="mute">${T('noEntries')}</p>`}
    <p class="row noprint"><button class="ghost" onclick="loadDemo()">${T('demo')}</button>${hasSample()&&!(user&&user.guest)?`<button class="ghost" onclick="removeSample()">${T('removeSample')}</button>`:''}<button class="ghost danger" onclick="clearAll()">${T('clear')}</button></p>
  </div>`;
}
function voiceToggle(){
  const st=document.getElementById('v_status'),btn=document.getElementById('v_btn');
  if(!Voice.supported){st.textContent=T('vUnsupported');return}
  if(Voice.active){Voice.stop();return}
  btn.textContent=T('vStop');btn.setAttribute('aria-pressed','true');st.textContent=T('vListening');
  Voice.start(lang,txt=>{
    const found=Voice.match(txt);
    found.forEach(k=>{const c=document.querySelector('#f_syms .chip[data-k="'+k+'"]');if(c){c.classList.add('on');c.setAttribute('aria-pressed','true')}});
    const n=document.getElementById('f_notes');n.value=(n.value?n.value+' ':'')+txt;
    st.textContent=T('vHeard')+': "'+txt+'". '+(found.length?T('vFound')+': '+found.map(k=>SYMS[k][lang]).join(', '):T('vNone'));
  },()=>{btn.textContent=T('vStart');btn.setAttribute('aria-pressed','false')},()=>{st.textContent=T('vError')});
}
function saveEntry(){
  const g=id=>document.getElementById(id);
  const on=sel=>{const b=document.querySelector(sel+' button.on');return b?+b.dataset.v:0};
  const e={date:g('f_date').value||today(),periodStart:g('f_ps').checked,flow:on('#f_flow'),pain:+g('f_pain').value,energy:+g('f_energy').value,mood:on('#f_mood')||3,
    syms:[...document.querySelectorAll('#f_syms .chip.on')].map(b=>b.dataset.k),notes:g('f_notes').value.slice(0,300)};
  entries=entries.filter(x=>x.date!==e.date);entries.push(e);persist();if(e.periodStart&&e.date>lastP){lastP=e.date;persistLP()}toast(T('saved'));render();
}
const FLOWHINT=[[0,7],[2,6],[4,5],[6,4]]; // suggested [pain, energy] for none/light/medium/heavy flow
function flowHint(i){
  const p=document.getElementById('f_pain'),e=document.getElementById('f_energy');
  if(p&&!p.dataset.touched){p.value=FLOWHINT[i][0];document.getElementById('pv').textContent=p.value}
  if(e&&!e.dataset.touched){e.value=FLOWHINT[i][1];document.getElementById('ev').textContent=e.value}
}
function condToggle(b){
  toggleChip(b);const c=b.dataset.c,on=b.classList.contains('on');
  document.querySelectorAll('#f_conds .chip').forEach(x=>{const k=x.dataset.c;if(x===b||!on)return;
    if((c==='none'||c==='unsure'||k==='none'||k==='unsure')&&k!==c){x.classList.remove('on');x.setAttribute('aria-pressed','false')}})
}
function regToggle(v){const m=document.getElementById('f_irr');if(m)m.hidden=v!=='later'}
function missToggle(v){const m=document.getElementById('f_months');if(m)m.hidden=v!=='yes'}
function saveLP(){
  const v=document.getElementById('f_lp').value,raw=document.getElementById('f_dob').value,a=calcAge(raw);
  if(raw&&(!a||raw>today())){toast(T('ageBad'));return}
  lastP=v&&v<=today()?v:'';persistLP();
  const menU=document.getElementById('f_menu').checked,menV=Math.round(+document.getElementById('f_men').value);
  if(!menU&&document.getElementById('f_men').value&&(menV<8||menV>20||(a&&menV>a))){toast(T('menBad'));return}
  dob=raw;age=a;persistAge();
  const mb=document.querySelector('#f_miss button.on');
  prof={menarche:menU?0:(menV||0),menUnknown:menU||!document.getElementById('f_men').value,conds:[...document.querySelectorAll('#f_conds .chip.on')].map(b=>b.dataset.c),fam:(document.querySelector('#f_fam button.on')||{dataset:{}}).dataset.v||'',lpUnknown:!lastP&&document.getElementById('f_lpu').checked,miss:mb?mb.dataset.v:'',months:mb&&mb.dataset.v==='yes'?[...document.querySelectorAll('#f_months .chip.on')].map(b=>b.dataset.m):[]};
  const lenV=Math.round(+document.getElementById('f_len').value)||0;
  if(lenV&&(lenV<15||lenV>90)){toast(T('lenBad'));return}
  const bsy={};Object.keys(SYMS).forEach(k=>{const v=+document.getElementById('bs_'+k).value;if(v)bsy[k]=v});
  const rg=document.querySelector('#f_reg button.on'),bfl=document.querySelector('#f_bflow button.on'),bp=document.getElementById('f_bpain');
  const bpain=bp.dataset.set?+bp.value:null;
  prof.base={len:lenV,reg:rg?rg.dataset.v:'',irrAge:Math.round(+document.getElementById('f_irrage').value)||0,flow:bfl?bfl.dataset.v:'',pain:bpain,syms:bsy,done:!!(lenV||rg||bfl||bpain!==null||Object.keys(bsy).length)};
  persistProf();toast(T('lpSaved'));render()}
function clearAll(){if(confirm(T('confirmClear'))){entries=[];lastP='';age=0;dob='';prof=PROF0();persistLP();persistAge();persistProf();persist();selDate=null;toast(T('cleared'));render()}}
function loadDemo(){
  if(!user)return;
  const guest=!!user.guest;
  if(!guest&&!confirm(T('demoConfirm')))return; // real accounts: sample days are flagged, kept apart and removable
  let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
  const end=today(),begin=addDays(end,-89),starts=[addDays(end,-87),addDays(end,-49),addDays(end,-8)];
  const gen=[];
  if(guest){dob=addDays(today(),-26*365-6);age=calcAge(dob);persistAge();prof=Object.assign(PROF0(),{lpUnknown:true,miss:'no',menarche:13,conds:['none'],fam:'no'});persistProf()}
  for(let i=0;i<90;i++){
    const d=addDays(begin,i),ps=starts.includes(d);
    const sinceP=Math.min(...starts.map(p=>diff(p,d)).filter(v=>v>=0).concat([99]));
    const inP=sinceP>=0&&sinceP<6;
    const syms=[];const add=(k,p)=>{if(rnd()<p)syms.push(k)};
    add('acne',.45);add('hair',.3);add('hairloss',.3);add('weight',.28);add('fatigue',.3);add('bloat',.2);add('headache',.15);add('moodsw',.1);add('sleep',.1);add('irregular',.2);
    if(inP)add('painful',.6);
    let pain=inP?Math.round(3+rnd()*3):Math.round(rnd()*2);
    gen.push({sample:true,date:d,periodStart:ps,flow:inP?(sinceP<2?3-(rnd()<.5?1:0):sinceP<4?2:1):0,pain,energy:Math.round(4+rnd()*4),mood:Math.round(2+rnd()*3),syms,notes:''});
  }
  const real=entries.filter(x=>!x.sample),taken=new Set(real.map(x=>x.date));
  entries=real.concat(gen.filter(x=>!taken.has(x.date)));
  scope='all';persist();toast(T('demoLoaded'));go('insights');
}
function removeSample(){entries=entries.filter(x=>!x.sample);persist();toast(T('sampleRemoved'));render()}
const hasSample=()=>entries.some(x=>x.sample);

function ageGate(){return`<div class="card"><p>${T('profNeed')}</p><p><button class="primary" onclick="go('log')">${T('tLog')}</button></p></div>`}
function cycleStory(a){
  const B=a.prof.base,r=B.reg==='irregular'?'start':B.reg;
  const lenTxt=B.len?(lang==='kn'?` ಸಾಮಾನ್ಯ ಅವಧಿ ${B.len} ದಿನ.`:` Your usual cycle is ${B.len} days.`):'';
  const yrs=a.yrs;const since=yrs!==null?(lang==='kn'?`ಮೊದಲ ಮುಟ್ಟಿನಿಂದ ${yrs} ವರ್ಷ`:`${yrs} years since your first period`):'';
  const k=r==='regular'&&a.missedN>=2?'mixed':r;
  if(!['regular','later','start','mixed'].includes(k))return'';
  const ctx=a.age>=45?'meno':(yrs!==null?yrs<=2:a.age<18)?'teen':'';
  return`<div class="card flag"><h2 class="sub">${T('storyTitle')}</h2>
    <p><b>${T('story_'+k)}</b>${since?' · '+since:''}</p>
    <p>${T('storyTxt_'+k)(B.irrAge)}${lenTxt}${ctx&&k!=='regular'?' '+T('storyCtx_'+ctx):''}</p></div>`;
}
function viewInsights(){
  if(!profDone())return ageGate();
  const a=analyze();
  if(a.n<1&&!prof.base.done)return`<div class="card"><p>${T('need')}</p><p><button class="ghost" onclick="go('log')">${T('tLog')}</button> <button class="ghost" onclick="loadDemo()">${T('demo')}</button></p></div>`;
  const flagged=a.pats.filter(p=>p.flagged),rest=a.pats.filter(p=>!p.flagged);
  const card=(p,cls)=>`<div class="card ${cls}"><span class="pill ${p.flagged?'':'g'}">${p.matched}/${p.total} ${T('match')}</span>
    <h3 style="margin-top:8px">${PATTERNS[p.id].name[lang]}</h3>
    <div class="bar"><i style="width:${p.matched/p.total*100}%"></i></div>
    ${p.flagged?`<p>${PATTERNS[p.id].desc[lang]}</p>`:''}
    ${p.known?`<div class="warn">${T('knownNote')}</div>`:''}
    ${p.flagged?`<p class="why"><b>${T('whyTitle')}</b> ${esc(T('whyTxt')(a.age,a.menarche,a.yrs,a.missedN,p.matched,p.total,p.crit.filter(c=>c.met).map(c=>c.text[lang])))}</p>`:''}
    <ul class="cr">${p.crit.map(c=>`<li class="${c.met?'y':'n'}">${esc(c.text[lang])}</li>`).join('')}</ul>
    ${p.flagged?`<b>${T('tests')}</b><ul>${PATTERNS[p.id].tests[lang].map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
  </div>`;
  const condLbl=prof.conds.filter(c=>c!=='none'&&c!=='unsure').map(c=>T('cd_'+c)).join(', ')||(prof.conds.includes('unsure')?T('cd_unsure'):T('cd_none'));
  const profCard=`<div class="card"><h2 class="sub">${T('yourProfile')}</h2><ul class="cr">
    <li>${T('rAge')}: <b>${a.age}</b></li>
    <li>${T('menShort')}: <b>${a.menarche?a.menarche+(a.yrs!==null?' ('+T('yrsAgo')(a.yrs)+')':''):T('cd_unsure')}</b></li>
    <li>${T('condShort')}: <b>${esc(condLbl)}</b></li>
    <li>${T('famShort')}: <b>${prof.fam?T('fam_'+prof.fam):T('cd_unsure')}</b></li></ul></div>`;
  const ci=cycleInfo(a.avgCycle);
  const scopeBtn=(v,l)=>`<button type="button" class="ghost sm ${a.scope===v?'on':''}" aria-pressed="${a.scope===v}" onclick="setScope('${v}')">${T(l)}</button>`;
  return`${profCard}${cycleStory(a)}${ci?`<div class="card"><b>${T('cycDay')(ci.day)}</b> · ${T('ph_'+ci.phase)}<p class="mute">${T('cycFrom')(fmt(ci.start))} ${T('phNote')}</p>
    <div class="row noprint" role="group" aria-label="${T('scopeLbl')}">${scopeBtn('cycle','scCycle')}${scopeBtn('all','scAll')}</div></div>`:`<div class="warn">${T('noCycStart')}</div>`}
  <div class="stats">
    <div class="stat"><b>${a.n}</b><span>${T('days')}</span></div>
    <div class="stat"><b>${a.avgCycle?Math.round(a.avgCycle):'–'}</b><span>${T('avgCycle')}</span></div>
    <div class="stat"><b>${r1(a.avgPain)}</b><span>${T('avgPain')}</span></div>
    <div class="stat"><b>${r1(a.avgEnergy)}</b><span>${T('avgEnergy')}</span></div></div>
  <div class="card">${chart(a)}<p class="mute">${T('trend')}</p></div>
  ${a.n<7?`<div class="warn">${T(prof.base.done?'earlyBase':'early')(a.n)}</div>`:''}
  <h2 class="sub">${T('flagged')}</h2>
  ${flagged.length?flagged.map(p=>card(p,'flag')).join(''):(()=>{const c=[...a.pats].sort((x,y)=>y.matched/y.total-x.matched/x.total)[0];return`<div class="card"><p>${T('noFlag')}</p><p class="why"><b>${T('closest')}</b> ${esc(PATTERNS[c.id].name[lang])}: ${c.matched}/${c.total} ${T('match')}. ${T('noFlagTip')}</p></div>`})()}
  <div class="warn">${T('urgent')}</div>
  ${rest.length?`<h2 class="sub">${T('others')}</h2>`+rest.map(p=>card(p,'low')).join(''):''}
  <p class="row"><button class="primary" onclick="go('report')">${T('tRep')} →</button></p>
  <p class="mute center">${T('disc')}</p>`;
}

function reportText(a){
  const ci=cycleInfo(a.avgCycle);
  const fl=a.pats.filter(p=>p.flagged);
  let t=`*${T('rTitle')}* (${T('rAge')}: ${a.age})\n${T('rGen')}: ${fmt(today())}\n${a.n?`${T('rPeriod')}: ${fmt(a.e[0].date)} - ${fmt(a.e[a.n-1].date)} (${a.n} ${T('days').toLowerCase()})`:T('baseOnly')}\n\n`;
  t+=a.cycles.length?T('rCycleTxt')(a.cycles.length,Math.round(a.avgCycle),Math.min(...a.cycles),Math.max(...a.cycles)):T('rNoCycles');
  t+=`\n${T('rPainTxt')(r1(a.avgPain),a.maxPain,a.highPainDays)}\n`;
  const top=Object.keys(SYMS).filter(k=>a.freq[k]>0).sort((x,y)=>a.freq[y]-a.freq[x]).slice(0,6);
  t+=`\n${T('rSymp')}:\n`+top.map(k=>`- ${SYMS[k][lang]}: ${a.pc(k)}%`).join('\n');
  if(fl.length)t+=`\n\n${T('flagged')}:\n`+fl.map(p=>`- ${PATTERNS[p.id].name[lang]}`).join('\n');
  if(ci)t+=`\n\n${T('cycDay')(ci.day)} (${T('ph_'+ci.phase)})`;
  return t+`\n\n${T('disc')}`;
}
function viewReport(){
  if(!profDone())return ageGate();
  const a=analyze('all'),ci=cycleInfo(a.avgCycle);
  if(a.n<1&&!prof.base.done)return`<div class="card"><p>${T('need')}</p></div>`;
  const fl=a.pats.filter(p=>p.flagged);
  const top=Object.keys(SYMS).filter(k=>a.freq[k]>0).sort((x,y)=>a.freq[y]-a.freq[x]).slice(0,8);
  const qs=[...new Set(fl.flatMap(p=>PATTERNS[p.id].qs[lang]))],tests=[...new Set(fl.flatMap(p=>PATTERNS[p.id].tests[lang]))];
  return`<div class="card"><h2>${T('rTitle')}</h2>${user&&!user.guest?`<p><b>${esc(user.name)}</b> · ${T('rAge')}: ${age}</p>`:`<p>${T('rAge')}: ${age}</p>`}
    <p class="mute">${T('rGen')}: ${fmt(today())} · ${a.n?`${T('rPeriod')}: ${fmt(a.e[0].date)} – ${fmt(a.e[a.n-1].date)} (${a.n} ${T('days').toLowerCase()})`:T('baseOnly')}</p>
    <h3>${T('rCycles')}</h3>
    <p>${T('menShort')}: ${prof.menarche?prof.menarche:T('cd_unsure')} · ${T('condShort')}: ${esc(prof.conds.filter(c=>c!=='none'&&c!=='unsure').map(c=>T('cd_'+c)).join(', ')||(prof.conds.includes('unsure')?T('cd_unsure'):T('cd_none')))} · ${T('famShort')}: ${prof.fam?T('fam_'+prof.fam):T('cd_unsure')}</p>
    <p>${T('storyTitle')}: ${prof.base.reg&&prof.base.reg!=='unsure'?T('story_'+(prof.base.reg==='irregular'?'start':prof.base.reg)):T('cd_unsure')}</p>
    <p>${T('rMissed')}: ${prof.miss==='yes'?prof.months.map(monthLbl).join(', ')||'-':prof.miss==='no'?T('missNo'):T('missUnsure')}</p>
    ${ci?`<p>${T('cycDay')(ci.day)} · ${T('ph_'+ci.phase)} (${T('cycFrom')(fmt(ci.start))})</p>`:''}
    <p>${a.cycles.length?T('rCycleTxt')(a.cycles.length,Math.round(a.avgCycle),Math.min(...a.cycles),Math.max(...a.cycles)):T('rNoCycles')}</p>
    <p>${T('rPainTxt')(r1(a.avgPain),a.maxPain,a.highPainDays)} ${T('rHeavy')}: ${a.heavyDays}.</p>
    <h3>${T('rSymp')}</h3>
    <table><tr><th>${T('rSympCol')}</th><th>${T('rPct')}</th></tr>${top.map(k=>`<tr><td>${SYMS[k][lang]}</td><td>${a.pc(k)}%</td></tr>`).join('')}</table>
    ${fl.length?`<h3>${T('flagged')}</h3><ul>${fl.map(p=>`<li><b>${PATTERNS[p.id].name[lang]}</b> (${p.matched}/${p.total})</li>`).join('')}</ul>
    <h3>${T('tests')}</h3><ul>${tests.map(t=>`<li>${t}</li>`).join('')}</ul>
    <h3>${T('ask')}</h3><ul>${qs.map(q=>`<li>${q}</li>`).join('')}</ul>`:`<p>${T('noFlag')}</p>`}
    ${hasSample()?`<div class="warn"><b>${T('sampleBanner')}</b> ${T('sampleBannerTxt')}</div>`:''}
    ${a.n<7?`<div class="warn">${T(prof.base.done?'earlyBase':'early')(a.n)}</div>`:''}
    <div class="warn">${T('disc')}</div>
  </div>
  <p class="row noprint"><button class="primary" onclick="window.print()">${T('print')}</button><button class="ghost" onclick="shareWA()">${T('wa')}</button></p>`;
}
function shareWA(){window.open('https://wa.me/?text='+encodeURIComponent(reportText(analyze('all'))),'_blank')}

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
function startSession(u){user=u;entries=load();lastP=loadLP();age=loadAge();prof=loadProf();tab='log';selDate=null;render();toast(T('aWelcome')+', '+u.name);window.scrollTo(0,0)}
function loadExample(k){
  const base=(len,reg,flow,pain,syms)=>({done:true,len,reg,flow,pain,syms});
  const E={
    pcos:{age:24,men:13,fam:'yes',miss:'yes',months:2,lp:62,base:base(48,'start','medium',3,{acne:2,hair:1,hairloss:2,weight:2,moodsw:1})},
    iron:{age:30,men:12,fam:'no',miss:'no',months:0,lp:12,base:base(26,'regular','heavy',5,{fatigue:2,dizzy:2,pale:1,hairloss:1,headache:1})},
    peri:{age:47,men:12,fam:'no',miss:'yes',months:2,lp:70,base:base(40,'later','medium',2,{hot:2,sleep:2,moodsw:2,palp:1,fatigue:1})}
  }[k];
  startSession(Auth.guest().user);
  entries=[];age=E.age;dob=addDays(today(),-Math.round(E.age*365.25)-20);lastP=addDays(today(),-E.lp);
  const ms=lastMonths().slice(1,1+E.months);
  prof=Object.assign(PROF0(),{menarche:E.men,conds:['none'],fam:E.fam,miss:E.miss,months:E.miss==='yes'?ms:[],base:E.base});
  persist();persistLP();persistAge();persistProf();go('insights');
}
function guestLogin(){startSession(Auth.guest().user)}
function logout(){if(user&&user.guest){try{localStorage.removeItem(Auth.dataKey(user));localStorage.removeItem(LPK(user));localStorage.removeItem(AGEK(user));localStorage.removeItem(PROFK(user))}catch(e){}} // guest data never outlives the guest session
  Auth.logout();user=null;entries=[];lastP='';age=0;dob='';prof=PROF0();selDate=null;authMode='login';render();window.scrollTo(0,0)}
function deleteAccount(){if(confirm(T('aConfirmDelete'))){Auth.remove(user.email);try{localStorage.removeItem(LPK(user));localStorage.removeItem(AGEK(user));localStorage.removeItem(PROFK(user))}catch(e){}user=null;entries=[];lastP='';age=0;dob='';prof=PROF0();authMode='register';render();window.scrollTo(0,0)}}
function accountCard(){
  if(!user)return'';
  return`<div class="card"><h3>👤 ${T('aAccount')}</h3><p><b>${esc(user.name)}</b><br><span class="mute">${user.guest?T('aGuestNote'):esc(user.email)}</span></p>
    <p class="row noprint"><button class="ghost" onclick="logout()">${T('aLogout')}</button>${user.guest?'':`<button class="ghost danger" onclick="deleteAccount()">${T('aDelete')}</button>`}</p></div>`;
}

function render(){
  document.documentElement.lang=lang;
  document.getElementById('tagline').textContent=T('tagline');
  document.getElementById('langBtn').textContent=lang==='en'?'ಕನ್ನಡ':'English';
  document.getElementById('fsBtn').setAttribute('aria-label','A+ '+T('textSize'));
  document.getElementById('skipLink').textContent=T('skip');
  document.getElementById('userBox').innerHTML=user?`<span class="uname">👤 ${esc(user.name)}</span><button class="ghost sm" onclick="logout()">${T('aLogout')}</button>`:'';
  if(!user){document.getElementById('tabs').innerHTML='';document.getElementById('app').innerHTML=viewAuth();return}
  const tabs=[['log','tLog'],['insights','tIns'],['report','tRep'],['privacy','tPriv']];
  document.getElementById('tabs').innerHTML=tabs.map(([k,l])=>`<button class="${tab===k?'on':''}" ${tab===k?'aria-current="page"':''} onclick="go('${k}')">${T(l)}</button>`).join('');
  const v={log:viewLog,insights:viewInsights,report:viewReport,privacy:viewPrivacy}[tab];
  document.getElementById('app').innerHTML=v()+(tab==='privacy'?accountCard():'');
}
applyFont();
render();
