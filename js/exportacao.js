/* Exportação para o Zotero (tipo "Legislação" = Bill).
   RIS (TY - BILL) preenche todos os campos estruturados. BibTeX/biblatex (@legislation) leva o essencial;
   o tradutor nativo do Zotero ignora Código, Volume, Seção, Páginas, Corpo legislativo, Sessão e Histórico,
   por isso esses campos também seguem na nota. */
(function (root) {
  var MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  var MES3 = ['jan.','fev.','mar.','abr.','maio','jun.','jul.','ago.','set.','out.','nov.','dez.'];
  function p(iso) { var a = iso.split('-'); return { y: +a[0], m: +a[1], d: +a[2] }; }
  function longa(iso) { var x = p(iso); return x.d + ' de ' + MESES[x.m - 1] + ' de ' + x.y; }
  function curta(iso) { var x = p(iso); return x.d + ' ' + MES3[x.m - 1] + ' ' + x.y; }
  function ris1(s) { return String(s).replace(/\s*\n\s*/g, ' ').trim(); }
  function nomeComp(ids, comps) { return ids.map(function (i) { return comps[i] || i; }); }
  function tagsDe(n, trs, comps) {
    var set = {}; trs.forEach(function (t) { t.componentes.forEach(function (c) { set[c] = 1; }); });
    return ['Semáforo ESP'].concat(nomeComp(Object.keys(set), comps));
  }
  function extras(n) {
    var l = ['Citation Key: ' + n.chave];
    return l;
  }
  function nota1(k, v) { return (v === null || v === undefined || String(v).trim() === '') ? null : k + ': ' + v; }
  function notaCampos(n) {
    return [
      nota1('Número da lei', n.numero + '/' + n.ano), nota1('Código', n.codigo), nota1('Volume do código', n.volumeCodigo),
      nota1('Seção', n.secao), nota1('Páginas do código', n.paginas), nota1('Corpo legislativo', n.corpoLegislativo),
      nota1('Sessão', n.sessao), nota1('Histórico', n.historico),
      nota1('Vigência', n.vigencia.situacao + (n.vigencia.verificadoEm ? ' (verificada em ' + n.vigencia.verificadoEm + ')' : ' (a reconferir)')),
      nota1('Publicação no DOU', n.douData ? curta(n.douData) : (n.codigo ? 'a conferir' : null))
    ].filter(Boolean);
  }
  function bibtex(n, trs, comps) {
    var a = p(n.data);
    var f = [
      ['title', n.titulo], ['shorttitle', n.tituloCurto], ['author', '{' + n.propositor + '}'],
      ['number', n.numero], ['date', n.data], ['year', String(a.y)],
      ['url', n.url], ['urldate', n.dataAcesso], ['language', n.idioma], ['copyright', n.licenca],
      ['abstract', n.ementa], ['keywords', tagsDe(n, trs, comps).join(', ')],
      ['note', extras(n).concat(notaCampos(n)).join('\n')], ['doi', n.doi]
    ].filter(function (x) { return x[1] !== null && x[1] !== undefined && String(x[1]).trim() !== ''; });
    return '@legislation{' + n.chave + ',\n' + f.map(function (x) { return '  ' + x[0] + ' = {' + x[1] + '}'; }).join(',\n') + '\n}\n';
  }
  function risData(iso) { var x = p(iso); return x.y + '/' + ('0' + x.m).slice(-2) + '/' + ('0' + x.d).slice(-2) + '/'; }
  function ris(n, trs, comps) {
    var L = [];
    function add(t, v) { if (v !== null && v !== undefined && String(v).trim() !== '') L.push(t + '  - ' + ris1(v)); }
    add('TY', 'BILL'); add('TI', n.titulo); add('A2', n.propositor);
    add('M1', n.numero); add('T2', n.codigo); add('VL', n.volumeCodigo); add('SE', n.secao); add('SP', n.paginas);
    add('T3', n.corpoLegislativo); add('ET', n.sessao); add('OP', n.historico);
    add('DA', risData(n.data)); add('PY', String(p(n.data).y)); add('ST', n.tituloCurto);
    add('AB', n.ementa); add('UR', n.url); add('Y2', risData(n.dataAcesso)); add('LA', n.idioma);
    add('CR', n.licenca); add('DO', n.doi); add('M2', 'Citation Key: ' + n.chave);
    tagsDe(n, trs, comps).forEach(function (k) { add('KW', k); });
    add('N1', notaCampos(n).join(' | '));
    L.push('ER  - ');
    return L.join('\r\n') + '\r\n';
  }
  function citacao(n) {
    if (n.citacaoManual) return n.citacaoManual + (n.url ? ' Disponível em: ' + n.url + '. Acesso em: ' + curta(n.dataAcesso) + '.' : '');
    return 'BRASIL. ' + n.tipo + ' nº ' + n.numero + ', de ' + longa(n.data) + '. ' + n.ementa + ' ' +
      (n.orgao ? n.orgao + '. ' : '') + 'Diário Oficial da União: ' + (n.secao || 'seção 1').toLowerCase().replace(/^s/, 'S') +
      (n.douData ? ', Brasília, DF, ' + curta(n.douData) : ', Brasília, DF') + (n.paginas ? ', p. ' + n.paginas : '') +
      (n.url ? '. Disponível em: ' + n.url + '. Acesso em: ' + curta(n.dataAcesso) : '') + '.';
  }
  function citarTrecho(t, n) {
    return '"' + t.texto.replace(/\n/g, ' ') + '"\n(' + (n.citacaoManual ? n.tipo + ' nº ' + n.numero + '/' + n.ano + ', ' + t.dispositivo + '. ' + n.propositor + '.' :
      'BRASIL. ' + n.tipo + ' nº ' + n.numero + ', de ' + longa(n.data) + ', ' + t.dispositivo + (n.url ? '. Disponível em: ' + n.url + '. Acesso em: ' + curta(n.dataAcesso) : '') + '.') + ')';
  }
  var api = { bibtex: bibtex, ris: ris, citacao: citacao, citarTrecho: citarTrecho, longa: longa };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Exportacao = api;
})(typeof window !== 'undefined' ? window : globalThis);
