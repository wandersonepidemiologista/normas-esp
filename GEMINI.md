# Diretrizes e Regras do Workspace — Normas ESP (Legislação)

Este repositório gerencia o catálogo digital de legislações em Vigilância Epidemiológica e Gestão de Emergências em Saúde Pública do portal [wandersonepidemiologista.com](https://www.wandersonepidemiologista.com), publicado via GitHub Pages e incorporado via iframe.

Todas as interações do agente neste workspace devem seguir estritamente as regras abaixo.

---

## 1. Estrutura de Dados e Leitura Obrigatória de `legislacoes.js`

* **Sempre leia `legislacoes.js` antes de qualquer modificação:** Nunca faça suposições sobre os IDs existentes ou o formato atual. Leia o arquivo para manter a consistência com o array `window.LEGISLACOES`.
* **Preservação da Estrutura:** As normas residem no array global `window.LEGISLACOES = [ ... ];`. Ao inserir uma nova norma:
  * Adicione um novo objeto JSON/JS ao array com vírgula separadora adequada.
  * Mantenha a indentação de 2 espaços e escape corretamente as aspas duplas (`\"`) ou quebras de linha (`\n`) no texto.
  * O código JavaScript deve permanecer sintaticamente válido.

---

## 2. Metadados Obrigatórios de Cada Norma

Cada item do array `window.LEGISLACOES` deve conter exatamente estes 7 campos:

| Campo | Tipo / Formato | Descrição e Regras |
| :--- | :--- | :--- |
| `id` | `string` (kebab-case) | Slug identificador único. Ex.: `"lei-6259-1975"`, `"decreto-7616-2011"`, `"portaria-gm-ms-110-2020"`. |
| `tipo` | `string` | Categoria jurídica padronizada. Deve ser exatamente um de: `"Lei"`, `"Decreto"`, `"Portaria"` ou `"Resolução"`. |
| `titulo` | `string` | Título padronizado com número e data. Ex.: `"Lei nº 6.259, de 30/10/1975"`. |
| `orgao` | `string` | Órgão emissor oficial. Ex.: `"Presidência da República"`, `"Ministério da Saúde"`, `"ANVISA"`. |
| `ementa` | `string` | Texto oficial da ementa (objeto e síntese da norma). |
| `fonteUrl` | `string` | URL da publicação oficial (Planalto, Imprensa Nacional/DOU, Ministério da Saúde, Anvisa, etc.). |
| `conteudoHtml` | `string` | Texto integral da norma em HTML, formatado estritamente com as classes CSS do projeto. |

---

## 3. Formatação do `conteudoHtml` e Classes CSS Permitidas

O texto deve ser transcrito de forma **100% integral**, **sem resumos**, **sem omissões** e **sem supressões de artigos**. Utilize **apenas** as tags e classes CSS previstas pelo design system do projeto:

| Tag / Classe | Finalidade | Exemplo de Aplicação |
| :--- | :--- | :--- |
| `<p class="doc-meta">` | Cabeçalho institucional do documento | `<p class="doc-meta">Presidência da República &bull; Casa Civil &bull; Subchefia para Assuntos Jurídicos</p>` |
| `<h2 class="doc-official-title">` | Título oficial da norma | `<h2 class="doc-official-title">LEI Nº 6.259, DE 30 DE OUTUBRO DE 1975</h2>` |
| `<p class="doc-ementa">` | Ementa destacada (usar com `<em>`) | `<p class="doc-ementa"><em>Dispõe sobre a organização das ações de Vigilância Epidemiológica...</em></p>` |
| `<p class="doc-preambulo">` | Preâmbulo e ordem de execução | `<p class="doc-preambulo">O PRESIDENTE DA REPÚBLICA, faço saber que o CONGRESSO NACIONAL decreta e eu sanciono a seguinte Lei:</p>` |
| `<h3 id="...">` | Divisões estruturais (Títulos, Capítulos, Seções). **Obrigatório conter `id` único** para alimentar automaticamente a navegação/sumário interno | `<h3 id="sec-6259-titulo-1">TÍTULO I — Da Ação de Vigilância Epidemiológica</h3>` |
| `<p class="artigo">` | Cabeçalho de artigos (destacar com `<strong>`) | `<p class="artigo"><strong>Art. 1º</strong> Consoante as atribuições...</em></p>` |
| `<p class="paragrafo">` | Parágrafos normativos ou Parágrafo único | `<p class="paragrafo">§ 1º Compete ao Ministério da Saúde...</em></p>` ou `<p class="paragrafo">Parágrafo único. ...</p>` |
| `<p class="inciso">` | Incisos (`I`, `II`), alíneas (`a)`) e itens | `<p class="inciso">I - de doenças que podem implicar medidas...</p>` |
| `<p class="doc-footer">` | Fecho, local, data e assinaturas | `<p class="doc-footer">Brasília, 30 de outubro de 1975...<br><strong>ERNESTO GEISEL</strong> &bull; José Carlos Seixas</p>` |

* **Penalidades e Destaques em Incisos:** Para incisos de penalidades, utilize o padrão visual do projeto:
  `<p class="inciso" style="margin-left: 40px; color: #B91C1C;"><em>pena - advertência, interdição e/ou multa.</em></p>`
* **Alterações de Redação:** Manter indicações como `<em>(Redação dada pela Lei nº ...)</em>` ao final dos dispositivos alterados.

---

## 4. Preservação Obrigatória dos Termos-Chave de Epidemiologia

O motor de busca e navegação rápida por temas no `index.html` depende do rastreamento de radicais em tempo real no `conteudoHtml`. **Nunca altere ou parafraseie** os seguintes termos e suas derivações:

1. **Prevenir** (radical `preven`)
2. **Proteger** (radical `prote`)
3. **Mitigar** (radical `mitig`)
4. **Preparar** (radical `prepar`)
5. **Detectar** (radical `detect`)
6. **Verificar** (radical `verific`)
7. **Notificar** (radical `notific`)
8. **Ativar** (radical `ativ`)
9. **Responder** (radical `respond`)
10. **Controlar** (radical `control`)
11. **Conter** (radical `cont`)
12. **Desativar** (radical `desativ`)
13. **Desmobilizar** (radical `desmobiliz`)
14. **Recuperar** (radical `recuper`)
15. **Aprender** (radical `aprend`)
16. **Risco** (radical `risco`)
17. **Comunicação** (radical `comunica`)
18. **Lições aprendidas** (radical `licoes aprendidas`)
19. **emergências** (radical `emergencia`)
20. **surtos** (radical `surto`)
21. **epidemias** (radical `epidemia`)

---

## 5. Rotina Git Obrigatória e Limpeza do Google Drive (`desktop.ini`)

Este projeto está localizado em um volume sincronizado com o Google Drive (`Meu Drive`), onde o sistema operacional cria frequentemente arquivos ocultos `desktop.ini` dentro da árvore `.git`.

**Antes de executar qualquer comando `git` (status, add, commit, push):**

1. **Remoção de `desktop.ini`:**
   ```powershell
   Get-ChildItem -Path .git -Filter desktop.ini -Recurse -Force | Remove-Item -Force
   ```
2. **Adição dos arquivos alterados:**
   ```powershell
   git add legislacoes.js
   ```
3. **Commit com o nome da norma:**
   ```powershell
   git commit -m "feat(norma): adiciona [Nome da Norma]"
   ```
4. **Push para origin main:**
   ```powershell
   git push origin main
   ```
