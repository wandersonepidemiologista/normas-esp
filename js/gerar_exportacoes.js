/* Uso: node js/gerar_exportacoes.js   (gera exportacao/normas.bib e exportacao/normas.ris) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const raiz = path.join(__dirname, '..');
const ctx = { window: {} }; vm.createContext(ctx);
['semaforo', 'normas', 'trechos'].forEach(f => vm.runInContext(fs.readFileSync(path.join(raiz, 'dados', f + '.js'), 'utf8'), ctx));
const E = require('./exportacao.js');
const comps = {}; ctx.window.SEMAFORO.grupos.forEach(g => g.itens.forEach(i => comps[i.id] = i.nome));
let bib = '', ris = '';
ctx.window.NORMAS.forEach(n => {
  const trs = ctx.window.TRECHOS.filter(t => t.normaId === n.id);
  bib += E.bibtex(n, trs, comps) + '\n'; ris += E.ris(n, trs, comps);
});
fs.mkdirSync(path.join(raiz, 'exportacao'), { recursive: true });
fs.writeFileSync(path.join(raiz, 'exportacao', 'normas.bib'), bib, 'utf8');
fs.writeFileSync(path.join(raiz, 'exportacao', 'normas.ris'), ris, 'utf8');
console.log('ok:', ctx.window.NORMAS.length, 'normas');
