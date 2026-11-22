(function () {
  'use strict';
  var S = window.SEMAFORO, NORMAS = window.NORMAS, TR = window.TRECHOS, LT = window.LINHA_TEMPO, E = window.Exportacao;
  var $ = function (s) { return document.querySelector(s); };
  var state = { v: 'semaforo', comp: null, q: '', cat: 'all', tl: null };
  var comps = {}, compNome = {};
  S.grupos.forEach(function (g) { g.itens.forEach(function (i) { comps[i.id] = i; i.grupo = g.id; compNome[i.id] = i.nome; }); });
  function norma(id) { return NORMAS.filter(function (n) { return n.id === id; })[0]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function plain(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function palavras() { return plain(state.q).split(/\s+/).filter(Boolean); }
  function hl(text) {
    var ws = palavras(); if (!ws.length) return esc(text);
    var t = plain(text), mask = new Array(text.length + 1).join('0').split('');
    ws.forEach(function (w) { var i = 0, j; while ((j = t.indexOf(w, i)) >= 0) { for (var k = j; k < j + w.length; k++) mask[k] = '1'; i = j + w.length; } });
    var out = '', run = '', on = false;
    for (var i = 0; i <= text.length; i++) {
      var m = i < text.length ? mask[i] === '1' : !on;
      if (i === text.length || m !== on) { out += on ? '<mark>' + esc(run) + '</mark>' : esc(run); run = ''; on = m; }
      if (i < text.length) run += text[i];
    }
    return out;
  }
  function conta(c) { return TR.filter(function (t) { return t.componentes.indexOf(c) >= 0; }).length; }
  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('on'); }, 2200); }
  function copiar(txt) {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(function () { toast('Copiado'); }, fb); } else fb();
    function fb() { var a = document.createElement('textarea'); a.value = txt; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); toast('Copiado'); } catch (e) { toast('Não foi possível copiar'); } a.remove(); }
  }
  function baixar(nome, txt, mime) {
    var b = new Blob([txt], { type: mime + ';charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = nome; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function trsDe(id) { return TR.filter(function (t) { return t.normaId === id; }); }
  function exportar(ids, fmt) {
    var txt = '';
    ids.forEach(function (id) { var n = norma(id), t = trsDe(id); txt += fmt === 'ris' ? E.ris(n, t, compNome) : E.bibtex(n, t, compNome) + '\n'; });
    var nome = ids.length === 1 ? ids[0] : 'normas_esp';
    baixar(nome + (fmt === 'ris' ? '.ris' : '.bib'), txt, fmt === 'ris' ? 'application/x-research-info-systems' : 'application/x-bibtex');
  }
  function rotuloNorma(n) { return n.tipo + ' nº ' + n.numero + '/' + n.ano; }

  /* ---------- semáforo ---------- */
  function btnComp(i) {
    var n = conta(i.id);
    return '<button class="comp' + (n ? '' : ' vazio') + '" data-comp="' + i.id + '" aria-pressed="' + (state.comp === i.id) + '" style="--bd:' + i.cor.bd + ';--bg2:' + i.cor.bg + ';--tx:' + i.cor.tx + '">' +
      '<span class="n" title="Trechos catalogados">' + n + '</span><b>' + esc(i.nome) + '</b><small>' + esc(i.sub) + '</small></button>';
  }
  function renderMapa() {
    var g = {}; S.grupos.forEach(function (x) { g[x.id] = x; });
    function bloco(x, cls) {
      return '<div class="grupo ' + (cls || '') + '" style="--gbd:' + (x.cor && x.cor.bd ? x.cor.bd : '#94A3B8') + '"><h2>' + esc(x.nome) + '</h2><div class="itens">' +
        x.itens.map(btnComp).join('') + '</div></div>';
    }
    $('#mapa').innerHTML = bloco(g.transversais, 'col-trans') + '<div class="faixas">' + bloco(g.antes) + bloco(g.durante) + bloco(g.depois) + '</div>';
  }
  function filtrados() {
    var ws = palavras();
    var lista = TR.filter(function (t) {
      if (state.comp && t.componentes.indexOf(state.comp) < 0) return false;
      if (!ws.length) return true;
      var n = norma(t.normaId);
      var hay = plain([t.texto, t.dispositivo, n.titulo, n.tituloCurto, t.componentes.map(function (c) { return compNome[c]; }).join(' ')].join(' '));
      return ws.every(function (w) { return hay.indexOf(w) >= 0; });
    });
    return lista.sort(function (a, b) { return norma(a.normaId).data < norma(b.normaId).data ? -1 : norma(a.normaId).data > norma(b.normaId).data ? 1 : 0; });
  }
  function cartaoTrecho(t) {
    var n = norma(t.normaId);
    var tags = t.componentes.map(function (c) { var i = comps[c]; return '<button class="tag" data-comp="' + c + '" style="--bd:' + i.cor.bd + ';--bg2:' + i.cor.bg + ';--tx:' + i.cor.tx + '">' + esc(i.nome) + '</button>'; }).join('');
    return '<article class="trecho"><header><div><a class="nl" data-ficha="' + n.id + '">' + esc(rotuloNorma(n)) + '</a> <span class="disp">' + esc(t.dispositivo) + '</span></div>' +
      '<span class="ver" title="' + esc(t.verificacao) + '">texto literal</span></header>' +
      '<div class="texto">' + hl(t.texto) + '</div>' + (t.nota ? '<p class="nota"><b>Nota:</b> ' + esc(t.nota) + '</p>' : '') +
      '<div class="rodape">' + tags + '<span class="sp"></span><button class="btn" data-copy="' + t.id + '">Copiar com citação</button>' + (t.fonteUrl ? '<a class="btn" href="' + esc(t.fonteUrl) + '" target="_blank" rel="noopener">Fonte oficial ↗</a>' : '') + '</div></article>';
  }
  function renderPainel() {
    var el = $('#painel');
    if (!state.comp && !state.q) {
      el.innerHTML = '<p class="dica">Escolha um componente do semáforo para ver os dispositivos de cada norma que tratam dele, ou use a busca. Os números nos cartões indicam quantos trechos já estão catalogados.</p>';
      return;
    }
    var l = filtrados(), c = state.comp ? comps[state.comp] : null;
    var cab = '<div class="cab"><h2>' + (c ? esc(c.nome) + ' <span class="dica">(' + esc(c.sub) + ')</span>' : 'Resultados da busca') + '</h2><span class="dica">' + l.length + ' trecho' + (l.length === 1 ? '' : 's') + '</span>' +
      ((state.comp || state.q) ? '<button class="btn" data-limpar="1">Limpar seleção</button>' : '') + '</div>';
    if (!l.length) { el.innerHTML = cab + '<div class="vazio-msg">Ainda não há trecho vinculado a ' + (c ? 'este componente' : 'esta busca') + ' nas normas já catalogadas. O catálogo está em fase piloto.</div>'; return; }
    el.innerHTML = cab + l.map(cartaoTrecho).join('');
  }

  /* ---------- linha do tempo ---------- */
  function renderTempo() {
    var cats = LT.cats, ch = [['all', 'Todas'], ['fm', 'Fora da matriz']].concat(Object.keys(cats).map(function (k) { return [k, cats[k].rotulo]; }));
    $('#chips').innerHTML = ch.map(function (x) { return '<button class="chip' + (state.cat === x[0] ? ' on' : '') + '" data-cat="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('');
    var h = '', ult = '';
    LT.itens.forEach(function (it) {
      var ok = state.cat === 'all' || (state.cat === 'fm' ? it.foraMatriz : it.cat === state.cat);
      if (!ok) return;
      var dec = it.ano < 2000 ? '1970 a 1999' : it.ano < 2010 ? '2000 a 2009' : it.ano < 2020 ? '2010 a 2019' : '2020 em diante';
      if (state.cat === 'all' && dec !== ult) { h += '<div class="dec">' + dec + '</div>'; ult = dec; }
      var c = cats[it.cat], f = it.fichaId ? norma(it.fichaId) : null;
      h += '<div class="row"><div class="yr">' + it.ano + '</div><div class="dot" style="background:' + c.cor + '"></div><div><div class="nm">' + esc(it.nome) + '</div><div class="ds">' + esc(it.desc) + '</div>' +
        '<span class="tg" style="background:' + c.bg + ';color:' + c.tx + '">' + esc(c.rotulo) + '</span>' + (it.foraMatriz ? '<span class="tg fm">fora da matriz</span>' : '') +
        (f ? ' <button class="btn" data-ficha="' + f.id + '">Ficha e ' + trsDe(f.id).length + ' trechos</button>' : ' <span class="pend">ficha pendente</span>') + '</div></div>';
    });
    $('#linha').innerHTML = h; $('#fonteTempo').textContent = 'Fonte: ' + LT.fonte;
  }


  /* ---------- linha do tempo visual ---------- */
  function curtoNome(s) {
    s = s.replace('Lei Complementar nº', 'LC').replace(/\s*nº\s*/g, ' ').replace('Portarias de Consolidação', 'Port. Consolid.').replace('Regulamento Sanitário Internacional', 'RSI');
    return s.length > 21 ? s.slice(0, 20) + '…' : s;
  }
  function compsDaNorma(id) { var o = {}; trsDe(id).forEach(function (t) { t.componentes.forEach(function (c) { o[c] = 1; }); }); return Object.keys(o); }
  function renderTL() {
    var cats = LT.cats, y0 = 1974, y1 = 2032, LAB = 112, SW = 126, H = 24;
    var cv = $('#tlcanvas'), wrap = $('#tlwrap'), sl = wrap ? wrap.scrollLeft : 0;
    var W = Math.max(18, Math.floor((wrap.clientWidth - LAB - 12) / (y1 - y0)));
    var comp = state.comp, hiIds = {};
    if (comp) TR.forEach(function (t) { if (t.componentes.indexOf(comp) >= 0) hiIds[t.normaId] = 1; });
    var h = '<div class="axis" style="width:' + (LAB + (y1 - y0) * W) + 'px">';
    for (var y = 1975; y <= 2025; y += 5) h += '<span style="left:' + (LAB + (y - y0) * W) + 'px">' + y + '</span>';
    h += '</div>';
    var grade = '';
    for (var g = 1975; g <= 2025; g += 5) grade += '<i class="gl" style="left:' + (LAB + (g - y0) * W) + 'px"></i>';
    var lanes = '';
    Object.keys(cats).forEach(function (k) {
      var c = cats[k], its = [];
      LT.itens.forEach(function (it, i) { if (it.cat === k) its.push({ it: it, i: i }); });
      if (!its.length) return;
      its.sort(function (a, b) { return (a.it.data || a.it.ano + '-07-01') < (b.it.data || b.it.ano + '-07-01') ? -1 : 1; });
      var placed = [], maxS = 0, pts = '';
      its.forEach(function (o) {
        var d = o.it.data ? o.it.data.split('-') : null, fr = d ? (+d[1] - 1) / 12 : 0.5, x = LAB + (o.it.ano + fr - y0) * W, s = 0;
        while (placed.some(function (p) { return p.s === s && Math.abs(p.x - x) < SW; })) s++;
        placed.push({ x: x, s: s }); if (s > maxS) maxS = s;
        var f = o.it.fichaId, cls = 'pt' + (f ? ' ok' : '') + (o.it.foraMatriz ? ' fm' : '') + (state.tl === o.i ? ' sel' : '') + (comp ? (f && hiIds[f] ? ' hi' : ' dim') : '');
        pts += '<button class="' + cls + '" data-tl="' + (o.i + 1) + '" style="left:' + (x - 7) + 'px;top:' + (8 + s * H) + 'px;--c:' + c.cor + ';--bg:' + c.bg + ';--tx:' + c.tx + '" title="' + esc(o.it.nome + ' (' + o.it.ano + ')') + '"><i></i><span>' + esc(curtoNome(o.it.nome)) + '</span></button>';
      });
      lanes += '<div class="lane" style="height:' + (16 + (maxS + 1) * H) + 'px"><div class="ll" style="color:' + c.tx + ';background:' + c.bg + ';border-color:' + c.cor + '">' + esc(c.rotulo) + '</div>' + pts + '</div>';
    });
    cv.style.width = (LAB + (y1 - y0) * W) + 'px';
    cv.innerHTML = h + '<div class="lanes">' + grade + lanes + '</div>';
    if (wrap) wrap.scrollLeft = sl;
    var dt = $('#tlDet'), it = state.tl !== null ? LT.itens[state.tl] : null;
    $('#tlDica').textContent = comp ? 'Em destaque: normas com trechos em "' + compNome[comp] + '"' : 'Clique em uma norma para ver os detalhes';
    if (!it) { dt.innerHTML = ''; return; }
    var c2 = cats[it.cat], f2 = it.fichaId ? norma(it.fichaId) : null, cs = f2 ? compsDaNorma(f2.id) : [];
    dt.innerHTML = '<div class="tldet" style="border-color:' + c2.cor + '"><div class="cab"><h3>' + esc(it.nome) + '</h3><span class="tg" style="background:' + c2.bg + ';color:' + c2.tx + '">' + esc(c2.rotulo) + '</span>' + (it.foraMatriz ? '<span class="tg fm">fora da matriz</span>' : '') + '<span class="dica">' + (it.data ? it.data.split('-').reverse().join('/') : it.ano) + '</span></div><p>' + esc(it.desc) + '</p>' +
      (f2 ? '<div class="rodape"><button class="btn pri" data-ficha="' + f2.id + '">Ficha e ' + trsDe(f2.id).length + ' trechos</button>' + cs.map(function (c) { var i = comps[c]; return '<button class="tag" data-comp="' + c + '" style="--bd:' + i.cor.bd + ';--bg2:' + i.cor.bg + ';--tx:' + i.cor.tx + '">' + esc(i.nome) + '</button>'; }).join('') + '</div>' : '<p class="pend">Ficha ainda não elaborada para esta norma.</p>') + '</div>';
  }

  /* ---------- normas ---------- */
  function renderNormas() {
    $('#acoesNormas').innerHTML = '<button class="btn pri" data-expall="ris">Baixar todas (.ris)</button><button class="btn" data-expall="bib">Baixar todas (.bib)</button>';
    $('#listaNormas').innerHTML = NORMAS.map(function (n) {
      return '<div class="ncard"><h3>' + esc(rotuloNorma(n)) + ' <span class="vig">' + esc(n.vigencia.situacao) + '</span></h3><p>' + esc(n.tituloCurto) + '</p><p class="dica">' + esc(n.ementa) + '</p>' +
        '<div class="rodape"><button class="btn" data-ficha="' + n.id + '">Ficha (' + trsDe(n.id).length + ' trechos)</button><button class="btn" data-exp="ris" data-id="' + n.id + '">.ris</button><button class="btn" data-exp="bib" data-id="' + n.id + '">.bib</button></div></div>';
    }).join('');
  }
  function linha(k, v, link) { return '<tr><th>' + esc(k) + '</th><td>' + ((v === null || v === undefined || v === '') ? '<span class="vz">vazio</span>' : link ? '<a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(v) + '</a>' : esc(v)) + '</td></tr>'; }
  function abrirFicha(id) {
    var n = norma(id), f = $('#ficha');
    var dataBr = n.data.split('-').reverse().join('/'), ac = n.dataAcesso.split('-').reverse().join('/');
    f.innerHTML = '<button class="fx" data-fechar="1" aria-label="Fechar">×</button><h2>' + esc(n.titulo) + '</h2>' +
      '<div class="rodape"><button class="btn pri" data-exp="ris" data-id="' + id + '">Baixar .ris</button><button class="btn" data-exp="bib" data-id="' + id + '">Baixar .bib</button><button class="btn" data-cit="' + id + '">Copiar citação</button>' + (n.url ? '<a class="btn" href="' + esc(n.url) + '" target="_blank" rel="noopener">Fonte oficial ↗</a>' : '') + '</div>' + (n.aviso ? '<div class="aviso" style="margin-top:10px"><b>Atenção:</b> ' + esc(n.aviso) + '</div>' : '') +
      '<table class="meta"><tbody>' + linha('Tipo do item', 'Legislação') + linha('Título', n.titulo) + linha('Propositor', n.propositor) + linha('Número da lei', n.numero) + linha('Código', n.codigo) + linha('Volume do código', n.volumeCodigo) +
      linha('Seção', n.secao) + linha('Páginas do código', n.paginas) + linha('Corpo legislativo', n.corpoLegislativo) + linha('Sessão', n.sessao) + linha('Histórico', n.historico) + linha('Data', dataBr) + linha('DOI', n.doi) +
      linha('Chave de citação', n.chave) + linha('URL', n.url, true) + linha('Data de acesso', ac) + linha('Título curto', n.tituloCurto) + linha('Idioma', n.idioma) + linha('Licença', n.licenca) + '</tbody></table>' +
      '<h3>Controle editorial</h3><table class="meta"><tbody>' + linha('Vigência', n.vigencia.situacao + (n.vigencia.verificadoEm ? ' (verificada em ' + n.vigencia.verificadoEm.split('-').reverse().join('/') + ')' : ' (a reconferir)')) + linha('Observação', n.vigencia.obs) + linha('Signatários (controle, fora do Zotero)', n.signatarios) +
      linha('Publicação no DOU', n.douData ? n.douData.split('-').reverse().join('/') : null) + linha('Pendências', n.pendencias.join('; ')) + '</tbody></table>' +
      '<h3>Trechos catalogados (' + trsDe(id).length + ')</h3>' + trsDe(id).map(cartaoTrecho).join('');
    f.hidden = false; f.scrollTop = 0;
  }
  function fechar() { $('#ficha').hidden = true; }

  /* ---------- navegação ---------- */
  function vista(v) {
    state.v = v;
    ['semaforo', 'tempo', 'normas'].forEach(function (x) { $('#v-' + x).hidden = x !== v; });
    Array.prototype.forEach.call(document.querySelectorAll('.abas button'), function (b) { b.setAttribute('aria-selected', b.dataset.v === v); });
    if (v === 'tempo') renderTempo(); if (v === 'normas') renderNormas();
  }
  function tudo() { renderMapa(); renderTL(); renderPainel(); gravaHash(); }
  function gravaHash() { var p = []; if (state.comp) p.push('c=' + state.comp); try { history.replaceState(null, '', '#' + p.join('&')); } catch (e) { } }
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('button,a'); if (!el) return;
    var d = el.dataset;
    if (d.inicio) { state.comp = null; state.q = ''; state.cat = 'all'; state.tl = null; $('#q').value = ''; fechar(); vista('semaforo'); tudo(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (d.v) return vista(d.v);
    if (d.comp) { state.comp = (state.comp === d.comp && el.classList.contains('comp')) ? null : d.comp; if (state.v !== 'semaforo') vista('semaforo'); fechar(); tudo(); if (state.comp) $('#painel').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (d.limpar) { state.comp = null; state.q = ''; $('#q').value = ''; return tudo(); }
    if (d.ficha) { ev.preventDefault(); return abrirFicha(d.ficha); }
    if (d.fechar) return fechar();
    if (d.copy) { var t = TR.filter(function (x) { return x.id === d.copy; })[0]; return copiar(E.citarTrecho(t, norma(t.normaId))); }
    if (d.cit) return copiar(E.citacao(norma(d.cit)));
    if (d.exp) return exportar([d.id], d.exp);
    if (d.expall) return exportar(NORMAS.map(function (n) { return n.id; }), d.expall);
    if (d.cat) { state.cat = d.cat; return renderTempo(); }
    if (d.tl) { state.tl = state.tl === +d.tl - 1 ? null : +d.tl - 1; return renderTL(); }
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim(); if (state.v !== 'semaforo') vista('semaforo'); renderPainel(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(renderTL, 150); });
  (function () { var d = NORMAS.map(function (n) { return n.dataAcesso; }).sort().pop(); if (d) $('#rodData').textContent = 'Dados conferidos em ' + d.split('-').reverse().join('/') + '.'; })();
  if (/[?&]embed=1/.test(location.search)) document.body.classList.add('embed');
  var m = /c=([a-z_]+)/.exec(location.hash); if (m && comps[m[1]]) state.comp = m[1];
  renderMapa(); renderTL(); renderPainel();
})();
