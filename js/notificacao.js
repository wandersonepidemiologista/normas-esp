(function(){
 var D=window.NOTIFICACAO, T=window.TRECHOS||[];
 var embed=/[?&]embed=1/.test(location.search);
 if(embed){document.body.classList.add('embed'); document.getElementById('voltar').href='semaforo.html?embed=1';}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 // Conceito (texto dos trechos da PC 4)
 var def=T.filter(function(t){return t.id==='prc4_2017-a5-art2-v'})[0];
 var nc=T.filter(function(t){return t.id==='prc4_2017-a5-art2-vi-ix'})[0];
 var box='<h2>Evento de saúde pública (ESP) e notificação compulsória</h2>';
 if(def){var ps=def.texto.split('\n'); box+='<p class="art">'+esc(ps[0])+'</p>'; box+='<p>'+esc(ps[1]).replace(/(surto ou epidemia|causa desconhecida|alteração no padrão clínico\s?epidemiológico|epizootias ou agravos decorrentes de desastres ou acidentes)/gi,'<mark>$1</mark>')+'</p>';}
 if(nc){nc.texto.split('\n').slice(1).forEach(function(p){box+='<p>'+esc(p)+'</p>'});}
 box+='<p class="art">Fonte: Portaria de Consolidação GM/MS nº 4/2017, Anexo V, art. 2º.</p>';
 document.getElementById('conceito').innerHTML=box;
 // Linhas
 function parse(s){return s.split('\n').map(function(l){var a=l.split('~');return {n:a[0],nome:a[1],ms:+a[2],ses:+a[3],sms:+a[4],sem:+a[5]}})}
 var LV=parse(D.linhas), LN=D.linhasNova?parse(D.linhasNova):null;
 var L=LV, ESP=D.esp, st={f:'todas',q:'',v:'vig'};
 function norm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
 function ok(r){
  if(st.q && norm(r.nome).indexOf(norm(st.q))<0) return false;
  if(st.f==='ims') return !!r.ms;
  if(st.f==='sem') return !r.ms;
  if(st.f==='esp') return !!ESP[r.n];
  return true;
 }
 function x(v,s){return v?'<span class="x'+(s?' xs':'')+'">X</span>':''}
 function draw(){
  var vis=L.filter(ok), h='', ult='';
  vis.forEach(function(r){
   var e=ESP[r.n], b='', dn=(st.v==='nova'&&D.novaDestaque)?D.novaDestaque[r.n]:'';
   if(e){b='<span class="espb'+(e[0]==='definicao'?' def':'')+'" title="'+esc(e[1])+'">'+(e[0]==='definicao'?'Definição do conceito':'Relação proposta')+'</span>';}
   h+='<tr class="'+(r.ms?'im':'')+(dn?' nova':'')+'"><td class="n">'+(r.n===ult?'':esc(r.n))+'</td><td>'+esc(r.nome)+(dn&&r.nome.indexOf('a. ')!==0&&r.nome.indexOf('b. ')!==0?'<span class="nv">'+esc(dn)+'</span>':'')+'</td><td class="c">'+x(r.ms)+'</td><td class="c">'+x(r.ses)+'</td><td class="c">'+x(r.sms)+'</td><td class="c">'+x(r.sem,1)+'</td><td>'+b+'</td></tr>';
   ult=r.n;
  });
  if(!h) h='<tr><td colspan="7">Nenhum item encontrado.</td></tr>';
  document.getElementById('corpo').innerHTML=h;
  var ims=L.filter(function(r){return r.ms}).length;
  document.getElementById('cont').textContent=vis.length+' de '+L.length+' linhas; '+ims+' com notificação imediata ao MS';
 }
 document.getElementById('q').addEventListener('input',function(e){st.q=e.target.value;draw()});
 [].forEach.call(document.querySelectorAll('.ff'),function(b){b.addEventListener('click',function(){
  st.f=b.getAttribute('data-f'); [].forEach.call(document.querySelectorAll('.ff'),function(o){o.setAttribute('aria-pressed',o===b?'true':'false')}); draw();});});
 document.getElementById('futura').textContent=D.futura;
 var f=document.getElementById('fonteNot'); f.innerHTML='Fonte: '+esc(D.fonte)+' <a href="'+esc(D.url)+'" target="_blank" rel="noopener">Abrir na BVS</a>.';
 function drawSent(){
  var S=(st.v==='nova'&&D.sentinelaNova)?D.sentinelaNova:D.sentinela, h='';
  S.forEach(function(g,gi){
   h+='<div class="sent"><div class="gr">'+esc(g[0])+'. '+esc(g[1])+'</div>';
   if(g[2].length){h+='<ol>'+g[2].map(function(it,ii){var m=(st.v==='nova'&&D.sentinelaMudou)?D.sentinelaMudou[(gi+1)+'.'+(ii+1)]:'';return '<li>'+esc(it)+(m?'<span class="nv">'+esc(m)+'</span>':'')+'</li>'}).join('')+'</ol>';}
   h+='</div>';
  });
  document.getElementById('sentinela').innerHTML=h;
 }
 function setV(v){
  st.v=v; L=(v==='nova'&&LN)?LN:LV; ESP=(v==='nova')?D.espNova:D.esp;
  document.getElementById('vVig').setAttribute('aria-pressed',v==='vig'?'true':'false');
  document.getElementById('vNova').setAttribute('aria-pressed',v==='nova'?'true':'false');
  var av=document.getElementById('avNova'); av.hidden=(v!=='nova'); av.textContent=D.novaAviso||'';
  f.innerHTML=(v==='nova'?'Fonte: '+esc(D.novaFonte)+' <a href="'+esc(D.novaUrl)+'" target="_blank" rel="noopener">Abrir no DOU</a>.':'Fonte: '+esc(D.fonte)+' <a href="'+esc(D.url)+'" target="_blank" rel="noopener">Abrir na BVS</a>.');
  draw(); drawSent();
 }
 document.getElementById('vVig').addEventListener('click',function(){setV('vig')});
 document.getElementById('vNova').addEventListener('click',function(){setV('nova')});
 if(!LN) document.getElementById('vNova').style.display='none';
 draw(); drawSent();
})();
