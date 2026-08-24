function esc(s){return (s+'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

function renderMapSVG(branches){
  var n=branches.length; if(!n) return '';
  var H=Math.max(200,n*78+40), W=640;
  var rootY=H/2, best=0;
  branches.forEach(function(b,i){ if((b.p||0)>(branches[best].p||0)) best=i; });
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Decision map">';
  branches.forEach(function(b,i){
    var y=40+i*((H-80)/(Math.max(n-1,1)));
    var cls='branchline'+(i===best?' win':((b.p||0)<=0.05?' faint':''));
    s+='<path class="'+cls+'" d="M70,'+rootY+' C210,'+rootY+' 240,'+y+' 380,'+y+'"/>';
  });
  s+='<circle cx="70" cy="'+rootY+'" r="7" fill="#1C1A15"/>';
  branches.forEach(function(b,i){
    var y=40+i*((H-80)/(Math.max(n-1,1)));
    var p=Math.round((b.p||0)*100);
    var r=(i===best)?9:(p<=5?4:6);
    var fill=(i===best)?'#E8B62A':(p<=5?'#C9C3B2':'#1C1A15');
    var stroke=(i===best)?' stroke="#1C1A15" stroke-width="1.5"':'';
    s+='<circle cx="380" cy="'+y+'" r="'+r+'" fill="'+fill+'"'+stroke+'/>';
    s+='<text class="node-label'+(i===best?' strong':'')+'" x="396" y="'+(y-4)+'">'+esc((b.name||'').toUpperCase())+' · '+p+'%</text>';
    s+='<text class="node-label" x="396" y="'+(y+12)+'" style="font-size:9px">'+esc((b.desc||'').slice(0,42))+'</text>';
  });
  s+='<text class="node-label" x="60" y="'+(rootY-16)+'">THE CLAIM</text>';
  s+='</svg>';
  return s;
}

function renderTree(t, fallbackInput){
  var h='';
  h+='<div class="claimbox"><p>'+esc(t.claim||fallbackInput||'')+'</p></div>';
  h+='<div class="mapcard">'+renderMapSVG(t.branches||[])+'</div>';
  if((t.signposts||[]).length){
    h+='<p class="lbl">Signposts — what to watch</p><ul style="list-style:none;padding:0;max-width:56em">';
    t.signposts.forEach(function(s){
      h+='<li style="margin:0 0 12px;padding-left:24px;position:relative;font-size:15px;line-height:1.6"><span style="position:absolute;left:0;top:.62em;width:12px;height:2px;background:var(--acc)"></span>'+esc(s.watch||'')+' <span class="mono" style="font-size:10.5px;color:var(--mut);text-transform:uppercase;letter-spacing:.05em">'+esc(s.discriminates||'')+(s.by?' · by '+esc(s.by):'')+'</span></li>';
    });
    h+='</ul>';
  }
  if(t.kill){ h+='<p class="lbl" style="color:var(--red)">Kill condition</p><p style="font-size:15.5px;max-width:44em">'+esc(t.kill)+'</p>'; }
  if(t.caveat){ h+='<p class="treenote" style="margin-top:20px"><b>Caveat:</b> '+esc(t.caveat)+'</p>'; }
  h+='<p class="treenote" style="margin-top:24px"><b>Want this watched?</b> Mission Watch turns a one-shot map into a standing watch — base rates attached, signposts monitored, a ping when reality moves. <a href="/daemon" class="yl">The daemon</a>.</p>';
  return h;
}

async function compute(){
  var input=document.getElementById('input').value.trim();
  var code=document.getElementById('code').value.trim();
  var st=document.getElementById('status'), btn=document.getElementById('go'), out=document.getElementById('result');
  out.style.display='none'; out.innerHTML='';
  st.classList.remove('err'); st.innerHTML='The daemon is drawing the map<span class="cursor"></span>'; st.style.display='block';
  btn.disabled=true;
  try{
    var r=await fetch('/api/tree',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({input:input,code:code})});
    var d=await r.json();
    if(!r.ok){ throw new Error(d.error||('Error '+r.status)); }
    out.innerHTML=renderTree(d.tree||{},input); out.style.display='block'; st.style.display='none';
  }catch(e){
    st.classList.add('err'); st.textContent=e.message||'Something failed — try again.';
  }finally{ btn.disabled=false; }
}
