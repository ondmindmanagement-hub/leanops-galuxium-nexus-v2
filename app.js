const $=s=>document.querySelector(s);let current=null;
const rules=[
['24/7 support',/24\s*\/?\s*7|round[- ]the[- ]clock|always[- ]on/i,24,42,'External on-call coverage','Continuous availability requested'],
['On-site work',/on[- ]?site|onsite|in person/i,18,28,'Local field specialist','Physical presence may be required'],
['Security review',/penetration|security review|iso\s*27001|soc\s*2|security assessment|audit/i,14,32,'Security specialist','Specialist assurance work detected'],
['Multiple integrations',/two systems|three systems|multiple systems|erp|crm|sap|salesforce|api integration/i,12,36,'Integration contractor','External systems increase uncertainty'],
['SLA',/sla|service level|response time|uptime|availability/i,13,20,'Support coverage','Response commitments should be priced'],
['Weekly reporting',/weekly report|weekly reporting|status report|steering committee/i,6,12,'Delivery support','Recurring governance overhead'],
['Data migration',/migration|migrate data|legacy data|historical data/i,12,30,'Data specialist','Migration scope can expand quickly'],
['Compliance',/gdpr|regulatory|compliance|financial regulation|banking regulation/i,14,26,'Compliance advisor','Regulated context detected']
];
function analyze(){
 const text=$('#brief').value.trim();if(!text)return $('#brief').focus();
 const value=Math.max(0,+$('#value').value||0),hourly=Math.max(1,+$('#hourly').value||45);
 const m=text.match(/(\d+)\s*[- ]?(week|weeks|month|months)/i);const weeks=m?(/month/i.test(m[2])?+m[1]*4:+m[1]):8;
 let risk=18,hours=55+weeks*5;const found=[],triggers=[];
 rules.forEach(r=>{if(r[1].test(text)){found.push(r[0]);risk+=r[2];hours+=r[3];if(!triggers.some(t=>t.name===r[4]))triggers.push({name:r[4],why:r[5]})}});
 risk=Math.min(100,risk);const cost=hours*hourly;const margin=value?Math.round((value-cost)/value*100):0;
 const verdict=risk>=70||margin<25?'Renegotiate':risk>=45||margin<40?'Proceed with guardrails':'Good pilot';
 const tone=verdict==='Good pilot'?'good':verdict==='Proceed with guardrails'?'warn':'bad';
 const core=Math.round(hours*.58),integration=Math.round(hours*.22),assurance=hours-core-integration;
 const plan='Core delivery: ~'+core+'h\nIntegration & testing: ~'+integration+'h\nAssurance / reporting: ~'+assurance+'h\n\n'+(triggers.length?'Keep core engineering founder-led. Subcontract only the specialist triggers above after the client accepts scope and budget.':'No specialist trigger detected. Keep delivery founder-led until scope changes.');
 current={text,value,hourly,weeks,risk,hours,cost,margin,verdict,obligations:found,triggers,plan,generatedAt:new Date().toISOString()};
 $('#risk').textContent=risk+'/100';$('#effort').textContent=hours+'h';$('#margin').textContent=margin+'%';
 const b=$('#verdict');b.textContent=verdict;b.className='badge '+tone;
 $('#obligations').innerHTML=found.length?found.map(x=>'<span class="chip">'+x+'</span>').join(''):'<span class="chip">No exceptional obligation detected</span>';
 $('#triggers').innerHTML=triggers.length?triggers.map(t=>'<div class="trigger"><span>'+t.why+'</span><b>'+t.name+'</b></div>').join(''):'<div class="trigger"><span>No specialist staffing required.</span><b>Founder-led</b></div>';
 $('#plan').textContent=plan;$('#copy').disabled=false;$('#download').disabled=false;
}
$('#analyze').onclick=analyze;
$('#demo').onclick=()=>{$('#brief').value='12-week paid pilot for a regulated financial-services team. Integrate with two internal systems and provide weekly reporting. Business-hours support is included. The client asks for an optional 24/7 incident response add-on, an SLA with response targets, and a security assessment before production.';$('#value').value=35000;analyze()};
$('#copy').onclick=async()=>{if(!current)return;await navigator.clipboard.writeText('LeanOps review\nVerdict: '+current.verdict+'\nScope risk: '+current.risk+'/100\nEstimated effort: '+current.hours+'h\nProjected margin: '+current.margin+'%\nObligations: '+(current.obligations.join(', ')||'None')+'\n\n'+current.plan)};
$('#download').onclick=()=>{if(!current)return;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(current,null,2)],{type:'application/json'}));a.download='leanops-review.json';a.click()};