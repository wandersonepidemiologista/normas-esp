---
name: adicionar-norma
description: >-
  Use esta skill sempre que o usuário fornecer um link ou texto de legislação (Lei, Decreto, Portaria ou Resolução)
  para adicionar ao catálogo legislacoes.js do projeto Normas ESP. Ela assegura a extração integral do texto,
  a formatação HTML rigorosa com as classes CSS do projeto, a preservação dos termos-chave de epidemiologia
  e a sincronização Git segura com limpeza prévia de arquivos desktop.ini no Google Drive.
---

# Procedimento Operacional: Adição de Norma Jurídica ao Catálogo

Este procedimento orienta a inclusão padronizada de atos normativos (Leis, Decretos, Portarias ou Resoluções) no catálogo editorial `legislacoes.js`, utilizado na plataforma de legislação de emergências em saúde pública ([wandersonepidemiologista.com](https://www.wandersonepidemiologista.com)).

---

## Fluxo de Execução em 6 Etapas

### Etapa 1: Leitura Prévia de `legislacoes.js`
1. Leia o arquivo [legislacoes.js](file:///c:/Users/wko/Meu%20Drive%20(wanderson@epidemiologista.com)/vscode-drive/legislacao/legislacoes.js) antes de qualquer ação.
2. Identifique os IDs já cadastrados para evitar duplicidades e compreenda a pontuação e estrutura do array `window.LEGISLACOES = [ ... ];`.

---

### Etapa 2: Coleta e Preenchimento dos Metadados

Preencha com exatidão os 7 campos obrigatórios do objeto:

| Campo | Regra de Preenchimento | Exemplo |
| :--- | :--- | :--- |
| **`id`** | Slug único em minúsculas (kebab-case) combinando tipo, número e ano. | `"lei-8080-1990"`, `"decreto-7616-2011"` |
| **`tipo`** | Categoria normativa padronizada. Deve ser rigorosamente um de: `"Lei"`, `"Decreto"`, `"Portaria"` ou `"Resolução"`. | `"Lei"` |
| **`titulo`** | Nome amigável com número da norma e data no formato `DD/MM/AAAA`. | `"Lei nº 8.080, de 19/09/1990"` |
| **`orgao`** | Órgão ou entidade oficial emissora da norma. | `"Presidência da República"` ou `"Ministério da Saúde"` |
| **`ementa`** | Texto literal da ementa oficial, sem cortes. | `"Dispõe sobre as condições para a promoção, proteção e recuperação da saúde..."` |
| **`fonteUrl`** | URL pública oficial da norma (ex.: Planalto, Imprensa Nacional/DOU). | `"https://www.planalto.gov.br/ccivil_03/leis/l8080.htm"` |
| **`conteudoHtml`** | String HTML com o texto integral formatado (veja Etapa 3). | `"<p class=\"doc-meta\">...</p>..."` |

---

### Etapa 3: Extração Integral e Formatação do `conteudoHtml`

> [!IMPORTANT]
> **NUNCA RESUMA O TEXTO.** Extraia todos os artigos, parágrafos, incisos e alíneas na íntegra. Qualquer corte ou simplificação de texto desfigura o valor jurídico da plataforma.

Utilize **exclusivamente** as classes CSS do design system do projeto:

```html
<!-- 1. Cabeçalho institucional -->
<p class="doc-meta">Presidência da República &bull; Casa Civil &bull; Subchefia para Assuntos Jurídicos</p>

<!-- 2. Título oficial -->
<h2 class="doc-official-title">LEI Nº 8.080, DE 19 DE SETEMBRO DE 1990</h2>

<!-- 3. Ementa (itálico com <em>) -->
<p class="doc-ementa"><em>Dispõe sobre as condições para a promoção, proteção e recuperação da saúde...</em></p>

<!-- 4. Preâmbulo -->
<p class="doc-preambulo">O PRESIDENTE DA REPÚBLICA, faço saber que o Congresso Nacional decreta e eu sanciono a seguinte lei:</p>

<!-- 5. Títulos, Capítulos e Seções (OBRIGATÓRIO id único para o sumário/TOC) -->
<h3 id="sec-slug-titulo-1">TÍTULO I — Das Disposições Gerais</h3>

<!-- 6. Artigos (com <strong>Art. Xº</strong>) -->
<p class="artigo"><strong>Art. 1º</strong> Esta lei regula, em todo o território nacional, as ações e serviços de saúde...</p>

<!-- 7. Parágrafos -->
<p class="paragrafo">§ 1º Estão compreendidas no disposto neste artigo as ações destinadas a garantir...</p>
<p class="paragrafo">Parágrafo único. O dever do Estado não exclui o das pessoas, da família, das empresas e da sociedade.</p>

<!-- 8. Incisos e Alíneas -->
<p class="inciso">I - a universalidade de acesso aos serviços de saúde em todos os níveis de assistência;</p>
<p class="inciso">a) vigilância sanitária;</p>

<!-- 9. Penalidades ou destaques (se aplicável) -->
<p class="inciso" style="margin-left: 40px; color: #B91C1C;"><em>pena - advertência, interdição e/ou multa.</em></p>

<!-- 10. Fecho e signatários -->
<p class="doc-footer">Brasília, 19 de setembro de 1990; 169º da Independência e 102º da República.<br><strong>FERNANDO COLLOR</strong> &bull; Alceni Guerra</p>
```

#### Regras de HTML:
- Cada `<h3>` **deve obrigatoriamente** ter um atributo `id` único (ex.: `id="sec-slug-nome"`). A função `buildTableOfContents()` do `index.html` vasculha as tags `<h3>` do `#legis-content` e constrói dinamicamente a barra de navegação "Estrutura da Norma".
- Escape aspas duplas no valor do JSON com `\"`.
- Represente quebras de linha no HTML como `\n` na string JSON.

---

### Etapa 4: Auditoria de Termos-Chave de Epidemiologia

O mecanismo de busca em tempo real do portal indexa as seguintes 20 raízes conceituais. Certifique-se de que nenhum destes termos foi suprimido ou modificado:

* **Prevenir** (`preven`)
* **Proteger** (`prote`)
* **Mitigar** (`mitig`)
* **Preparar** (`prepar`)
* **Detectar** (`detect`)
* **Verificar** (`verific`)
* **Notificar** (`notific`)
* **Ativar** (`ativ`)
* **Responder** (`respond`)
* **Controlar** (`control`)
* **Conter** (`cont`)
* **Desativar** (`desativ`)
* **Desmobilizar** (`desmobiliz`)
* **Recuperar** (`recuper`)
* **Aprender** (`aprend`)
* **Risco** (`risco`)
* **Comunicação** (`comunica`)
* **Lições aprendidas** (`licoes aprendidas`)
* **emergências** (`emergencia`)
* **surtos** (`surto`)
* **epidemias** (`epidemia`)

---

### Etapa 5: Inserção no Arquivo `legislacoes.js`

1. Edite `legislacoes.js` adicionando o novo objeto no final do array `window.LEGISLACOES = [ ... ];` (ou na ordem editorial desejada).
2. Valide se a vírgula separadora está presente entre o item anterior e o novo item.
3. Certifique-se de que o fechamento `];` do array não foi corrompido.

---

### Etapa 6: Sincronização Git com Limpeza de `desktop.ini`

Como o projeto está em pasta sincronizada pelo Google Drive, o Windows cria arquivos ocultos `desktop.ini` dentro do diretório `.git`, impedindo commits ou pushes limpos.

Execute a rotina abaixo no PowerShell antes de qualquer operação Git:

```powershell
# 1. Limpeza de arquivos desktop.ini dentro de .git
Get-ChildItem -Path .git -Filter desktop.ini -Recurse -Force | Remove-Item -Force

# 2. Adição dos arquivos
git add legislacoes.js

# 3. Commit padronizado com o nome da norma
git commit -m "feat(norma): adiciona [Nome da Norma]"

# 4. Envio para a branch main
git push origin main
```

*(Opcional)* Você também pode executar diretamente o script auxiliar do repositório:
```powershell
.\.agents\skills\adicionar-norma\scripts\sync-git.ps1 -NormaNome "[Nome da Norma]"
```

---

## Verificação Final
Após a execução:
1. Abra ou teste a sintaxe do `legislacoes.js`.
2. Verifique o status do repositório com `git status` para confirmar que a árvore de trabalho está limpa e sincronizada com `origin/main`.
