# Normas ESP — Legislação em Vigilância Epidemiológica e Emergências em Saúde Pública

Repositório editorial interativo de **Leis, Decretos, Portarias e Resoluções** aplicadas à Vigilância Epidemiológica, Resposta a Surtos e Gestão de Emergências em Saúde Pública, desenvolvido para publicação via **GitHub Pages** e incorporação no portal **[wandersonepidemiologista.com](https://www.wandersonepidemiologista.com)**.

## Estrutura do Repositório

```text
normas-esp/
├── index.html        # Interface web, tipografia jurídica e motor de busca/destaque
├── legislacoes.js    # Catálogo estruturado das normas sanitárias (Leis, Decretos, Portarias, Resoluções)
└── README.md         # Documentação editorial e guia de publicação
```

## Funcionalidades Editoriais

- **Filtro por Espécie Normativa:** Alternância rápida entre *Todas*, *Leis*, *Decretos*, *Portarias* e *Resoluções*.
- **Navegação Rápida por Termos-Chave:** Localização instantânea de trechos relacionados aos eixos de gestão de emergências (*Prevenir, Proteger, Mitigar, Preparar, Detectar, Verificar, Notificar, Ativar, Responder, Controlar, Conter, Desativar, Desmobilizar, Recuperar, Aprender, Risco, Comunicação, Lições aprendidas, emergências, surtos, epidemias*).
- **Navegação entre Ocorrências:** Controles `◀` / `▶` (e atalho `Enter`) para percorrer cada artigo ou parágrafo onde o tema aparece.
- **Sumário Estrutural e Impressão:** Índice automático de Títulos/Capítulos da norma aberta e botão dedicado para impressão ou geração de PDF limpo.
- **Modo Embed (`?embed=1`):** Oculta automaticamente o cabeçalho institucional externo quando incorporado via `iframe` no Wix.

## Publicação no GitHub Pages e Incorporação no Wix

1. Faça o upload dos arquivos `index.html`, `legislacoes.js` e `README.md` para a branch `main` deste repositório.
2. No GitHub, acesse **Settings > Pages**, selecione **Deploy from a branch** (`main` / `/root`) e clique em **Save**.
3. O endereço público ficará disponível em:
   `https://wandersonepidemiologista.github.io/normas-esp/`
4. No editor do Wix (página **Legislação**), escolha **Adicionar Elementos > Incorporar Código > Incorpore um site** e insira:
   `https://wandersonepidemiologista.github.io/normas-esp/?embed=1`
