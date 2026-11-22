---
trigger: always_on
description: Regras permanentes para adição e manutenção de normas no catálogo legislacoes.js
---

# Regras Permanentes do Workspace — Catálogo de Legislação

Siga sempre as diretrizes abaixo ao manipular legislações ou operar o repositório `normas-esp`:

## 1. Leitura Prévia de `legislacoes.js`
- Antes de adicionar qualquer legislação, leia `legislacoes.js` para manter a paridade com a estrutura do array `window.LEGISLACOES`.
- Assegure sintaxe JavaScript válida com vírgula de separação entre os objetos.

## 2. Metadados Obrigatórios
Cada norma deve possuir os seguintes campos:
- `id`: slug único em kebab-case (ex: `lei-6259-1975`, `decreto-7616-2011`).
- `tipo`: Deve ser rigorosamente um de: `"Lei"`, `"Decreto"`, `"Portaria"` ou `"Resolução"`.
- `titulo`: Nome oficial formatado (ex: `"Lei nº 6.259, de 30/10/1975"`).
- `orgao`: Órgão expedidor oficial (ex: `"Presidência da República"`, `"Ministério da Saúde"`).
- `ementa`: Ementa integral oficial.
- `fonteUrl`: Link de acesso público e oficial da norma.
- `conteudoHtml`: HTML integral da norma.

## 3. Texto Integral e Classes CSS Restritas
- **Sem resumos:** Não sintetize nem corte artigos, parágrafos ou incisos.
- Use exclusivamente as classes CSS do design system:
  - `<p class="doc-meta">`: Metadados institucionais no topo.
  - `<h2 class="doc-official-title">`: Título oficial em destaque.
  - `<p class="doc-ementa">`: Ementa formatada com `<em>`.
  - `<p class="doc-preambulo">`: Preâmbulo do ato normativo.
  - `<h3 id="...">`: Divisões da norma (Livros, Títulos, Capítulos, Seções). **Obrigatório `id` único** para o sumário ("Estrutura da Norma").
  - `<p class="artigo">`: Artigos com número em negrito `<strong>Art. Xº</strong>`.
  - `<p class="paragrafo">`: Parágrafos (§ 1º, Parágrafo único).
  - `<p class="inciso">`: Incisos e alíneas.
  - `<p class="doc-footer">`: Fecho, data e signatários.

## 4. Preservação dos Termos-Chave de Epidemiologia
Preserve fielmente no texto os 20 termos e conceitos de gestão de riscos e emergências:
*Prevenir, Proteger, Mitigar, Preparar, Detectar, Verificar, Notificar, Ativar, Responder, Controlar, Conter, Desativar, Desmobilizar, Recuperar, Aprender, Risco, Comunicação, Lições aprendidas, emergências, surtos, epidemias*.

## 5. Rotina Git e Limpeza Prévia de `desktop.ini`
Em qualquer operação Git:
1. Executar:
   ```powershell
   Get-ChildItem -Path .git -Filter desktop.ini -Recurse -Force | Remove-Item -Force
   ```
2. Fazer `git add` dos arquivos alterados.
3. Fazer `git commit` com o nome da norma.
4. Fazer `git push origin main`.
