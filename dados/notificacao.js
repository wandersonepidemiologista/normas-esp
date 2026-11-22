// Lista Nacional de Notificação Compulsória (Anexo 1 do Anexo V da Portaria de Consolidação GM/MS nº 4/2017)
// Colunas de cada linha: número ~ doença ou agravo ~ imediata MS ~ imediata SES ~ imediata SMS ~ semanal
window.NOTIFICACAO = {
 fonte: "Portaria de Consolidação GM/MS nº 4, de 28/09/2017, Anexo 1 do Anexo V, redação dada pela Portaria GM/MS nº 11.211, de 13/05/2026 (página da BVS lida em 22/11/2026).",
 url: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0004_03_10_2017.html",
 futura: "A Portaria GM/MS nº 12.508/2026 (DOU de 17/11/2026) inclui a brucelose humana, altera nomenclaturas e renumera a lista; entra em vigor 45 dias após a publicação.",
 // Marcação da relação com o conceito de ESP. 'definicao' = o próprio item; 'proposta' = nome do item coincide com os termos da definição (proposta a validar).
 esp: {
  "22": ["definicao", "O próprio item remete ao conceito de evento de saúde pública (art. 2º, V)."],
  "17": ["proposta", "Suspeita de disseminação intencional: potencial ameaça à saúde pública."],
  "18": ["proposta", "Doenças emergentes e reemergentes: alteração do quadro conhecido."],
  "39": ["proposta", "Novo subtipo viral: alteração do padrão clínico-epidemiológico."],
  "59": ["proposta", "Síndrome respiratória aguda grave por coronavírus de importância em saúde pública."]
 },
 linhas: `1~a. Acidente de trabalho com exposição a material biológico~0~0~0~1
1~b. Acidente de trabalho~0~0~1~0
2~Acidente por animal peçonhento~0~0~1~0
3~Acidente por animal potencialmente transmissor da raiva~0~0~1~0
4~Anomalias congênitas~0~0~0~1
5~Botulismo~1~1~1~0
6~Câncer relacionado ao trabalho~0~0~0~1
7~Cólera~1~1~1~0
8~Coqueluche~0~1~1~0
9~a. Dengue - Casos~0~0~0~1
9~b. Dengue - Óbitos~1~1~1~0
10~Dermatose ocupacionais~0~0~0~1
11~Difteria~1~1~1~0
12~Distúrbio de voz relacionado ao trabalho~0~0~0~1
13~a. Doença de Chagas Aguda~0~1~1~0
13~b. Doença de Chagas Crônica~0~0~0~1
14~Doença de Creutzfeldt-Jakob (DCJ)~0~0~0~1
15~Doença Falciforme~0~0~0~1
16~a. Doença Invasiva por "Haemophilus Influenzae"~0~1~1~0
16~b. Doença Meningocócica e outras meningites~0~1~1~0
17~Doenças com suspeita de disseminação intencional: a. Antraz pneumônico b. Tularemia c. Varíola~1~1~1~0
18~Doenças febris hemorrágicas emergentes/ reemergentes: a. Arenavírus b. Ebola c. Marburg d. Lassa e. Febre purpúrica brasileira~1~1~1~0
19~a. Doença aguda pelo vírus Zika~0~0~0~1
19~b. Doença aguda pelo vírus Zika em gestante~0~1~1~0
19~c. Óbito com suspeita de doença pelo vírus Zika~1~1~1~0
19~d. Síndrome congênita associada à infecção pelo vírus Zika~0~0~0~1
20~Esporotricose humana~0~0~0~1
21~Esquistossomose~0~0~0~1
22~Evento de Saúde Pública (ESP) que se constitua ameaça à saúde pública (ver definição no art. 2º desta portaria)~1~1~1~0
23~Evento supostamente atribuível à vacinação ou imunização (ESAVI)~1~1~1~0
24~Febre Amarela~1~1~1~0
25~a. Febre de Chikungunya~0~0~0~1
25~b. Febre de Chikungunya em áreas sem transmissão~1~1~1~0
25~c. Óbito com suspeita de Febre de Chikungunya~1~1~1~0
26~Febre do Nilo Ocidental e outras arboviroses de importância em saúde pública~1~1~1~0
27~a. Febre do Oropouche - casos~0~0~0~1
27~b. Febre do Oropouche - óbitos e óbitos fetais~1~1~1~0
27~c. Febre do Oropouche em gestante~1~1~1~0
27~d. Febre do Oropouche - Anomalias congênitas~1~1~1~0
28~Febre Maculosa e outras Riquetsioses~1~1~1~0
29~Febre Tifóide~0~1~1~0
30~Hanseníase~0~0~0~1
31~Hantavirose~1~1~1~0
32~Hepatites virais~0~0~0~1
33~Infecção pelo vírus da hepatite B em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical da hepatite B~0~0~0~1
34~HIV/AIDS - Infecção pelo Vírus da Imunodeficiência Humana ou Síndrome da Imunodeficiência Adquirida~0~0~0~1
35~Infecção pelo HIV em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical do HIV~0~0~0~1
36~Infecção pelo Vírus da Imunodeficiência Humana (HIV)~0~0~0~1
37~Infecção pelo Vírus Linfotrópico de Células T Humanas (HTLV)~0~0~0~1
38~Infecção pelo HTLV em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical do HTLV~0~0~0~1
39~Influenza humana produzida por novo subtipo viral~1~1~1~0
40~Intoxicação Exógena (por substâncias químicas, incluindo agrotóxicos, gases tóxicos e metais pesados)~0~0~0~1
41~Leishmaniose Tegumentar Americana~0~0~0~1
42~Leishmaniose Visceral~0~0~0~1
43~Leptospirose~0~0~1~0
44~Lesões por Esforços Repetitivos/ Distúrbios Osteomusculares Relacionados ao Trabalho (LER/DORT)~0~0~0~1
45~a. Malária na região amazônica~0~0~0~1
45~b. Malária na região extra-Amazônica~1~1~1~0
46~Monkeypox (varíola dos macacos)~1~1~1~0
47~Óbito: a. Infantil b. Materno~0~0~0~1
48~Parotidite (Caxumba)~0~0~0~1
49~Perda Auditiva relacionada ao trabalho~0~0~0~1
50~Pneumoconioses relacionadas ao trabalho~0~0~0~1
51~Peste~1~1~1~0
52~Poliomielite/ Paralisia flácida aguda (PFA)~1~1~1~0
53~Raiva humana~1~1~1~0
54~Síndrome da Rubéola Congênita~1~1~1~0
55~Doenças Exantemáticas: a. Sarampo b. Rubéola~1~1~1~0
56~Sífilis: a. Adquirida b. Congênita c. Em gestante~0~0~0~1
57~Síndrome Inflamatória Multissistêmica em Adultos (SIM-A) associada à covid-19~1~1~1~0
58~Síndrome Inflamatória Multissistêmica Pediátrica (SIM-P) associada à covid-19~1~1~1~0
59~Síndrome Respiratória Aguda Grave (SRAG) associada a Coronavírus a. SARSCoV b. MERS- CoV c. Síndrome Respiratória Aguda Grave (Srag) hospitalizado ou óbito por Srag~1~1~1~0
60~Síndrome Gripal por covid-19 confirmada~1~1~1~0
61~a. Tétano Acidental~0~1~1~0
61~b. Tétano Neonatal~1~1~1~0
62~Toxoplasmose gestacional e congênita~0~0~0~1
63~Transtornos mentais relacionados ao trabalho~0~0~0~1
64~Tuberculose~0~0~0~1
65~Varicela~0~1~1~0
66~a. Violência doméstica e/ou outras violências~0~0~0~1
66~b. Violência sexual e tentativa de suicídio~0~0~1~0`
};

// Lista conforme a Portaria GM/MS nº 12.508/2026, Anexo I (publicada em 17/11/2026, ainda não em vigor).
// Texto e numeração do DOU.
// Conferido linha a linha contra o PDF do DOU (cópia de 22/11/2026): as 82 linhas e as colunas coincidem. Brucelose humana: semanal.
window.NOTIFICACAO.novaFonte = "Portaria GM/MS nº 12.508, de 16/11/2026 (DOU de 17/11/2026, Seção 1, p. 75), Anexo I. Entra em vigor 45 dias após a publicação.";
window.NOTIFICACAO.novaUrl = "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-12.508-de-16-de-novembro-de-2026-744731818";
window.NOTIFICACAO.novaAviso = "Esta versão ainda não está em vigor. Até a vigência, vale a lista da Portaria de Consolidação GM/MS nº 4/2017. Texto, numeração e colunas conferidos com o Anexo I da portaria publicada no DOU de 17/11/2026.";
window.NOTIFICACAO.novaDestaque = {"6": "Inclusão da portaria (art. 1º)", "8": "Nome alterado: Caxumba (parotidite epidêmica)", "26": "Nome alterado: ESAVI grave", "60": "Nome alterado: SRAG hospitalizado ou óbito", "66": "Nome alterado: varicela (casos leve, grave internado ou óbito)"};
window.NOTIFICACAO.espNova = {
  "25": ["definicao", "O próprio item remete ao conceito de evento de saúde pública (art. 2º, V)."],
  "19": ["proposta", "Suspeita de disseminação intencional: potencial ameaça à saúde pública."],
  "20": ["proposta", "Doenças emergentes e reemergentes: alteração do quadro conhecido."],
  "42": ["proposta", "Novo subtipo viral: alteração do padrão clínico-epidemiológico."]
};
window.NOTIFICACAO.linhasNova = `1~a. Acidente de trabalho com exposição a material biológico~0~0~0~1
1~b. Acidente de trabalho~0~0~1~0
2~Acidente por animal peçonhento~0~0~1~0
3~Acidente por animal potencialmente transmissor da raiva~0~0~1~0
4~Anomalias congênitas~0~0~0~1
5~Botulismo~1~1~1~0
6~Brucelose humana~0~0~0~1
7~Câncer relacionado ao trabalho~0~0~0~1
8~Caxumba (parotidite epidêmica)~0~0~0~1
9~Cólera~1~1~1~0
10~Coqueluche~0~1~1~0
11~a. Dengue - Casos~0~0~0~1
11~b. Dengue - Óbitos~1~1~1~0
12~Dermatose ocupacionais~0~0~0~1
13~Difteria~1~1~1~0
14~Distúrbio de voz relacionado ao trabalho~0~0~0~1
15~a. Doença de Chagas Aguda~0~1~1~0
15~b. Doença de Chagas Crônica~0~0~0~1
16~Doença de Creutzfeldt-Jakob (DCJ)~0~0~0~1
17~Doença Falciforme~0~0~0~1
18~a. Doença Invasiva por "Haemophilus influenzae"~0~1~1~0
18~b. Doença Meningocócica e outras meningites~0~1~1~0
19~Doenças com suspeita de disseminação intencional: a. Antraz pneumônico b. Tularemia c. Varíola~1~1~1~0
20~Doenças febris hemorrágicas emergentes/ reemergentes: a. Arenavírus b. Ebola c. Marburg d. Lassa e. Febre purpúrica brasileira~1~1~1~0
21~a. Doença aguda pelo vírus Zika~0~0~0~1
21~b. Doença aguda pelo vírus Zika em gestante~0~1~1~0
21~c. Óbito com suspeita de doença pelo vírus Zika~1~1~1~0
21~d. Síndrome congênita associada à infecção pelo vírus Zika~0~0~0~1
22~Doenças Exantemáticas: a. Sarampo b. Rubéola~1~1~1~0
23~Esporotricose humana~0~0~0~1
24~Esquistossomose~0~0~0~1
25~Evento de Saúde Pública (ESP) que se constitua ameaça à saúde pública (ver definição no art. 2º desta portaria)~1~1~1~0
26~Evento supostamente atribuível à vacinação ou imunização (ESAVI) grave.~1~1~1~0
27~Febre Amarela~1~1~1~0
28~a. Febre de Chikungunya~0~0~0~1
28~b. Febre de Chikungunya em áreas sem transmissão~1~1~1~0
28~c. Óbito com suspeita de Febre de Chikungunya~1~1~1~0
29~Febre do Nilo Ocidental e outras arboviroses de importância em saúde pública~1~1~1~0
30~a. Febre do Oropouche - Casos~0~0~0~1
30~b. Febre do Oropouche - Óbitos e óbitos fetais~1~1~1~0
30~c. Febre do Oropouche em gestante~1~1~1~0
30~d. Febre do Oropouche - Anomalias congênitas~1~1~1~0
31~Febre Maculosa e outras Riquetsioses~1~1~1~0
32~Febre Tifóide~0~1~1~0
33~Hanseníase~0~0~0~1
34~Hantavirose~1~1~1~0
35~Hepatites virais~0~0~0~1
36~Infecção pelo vírus da hepatite B em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical da hepatite B~0~0~0~1
37~HIV/AIDS - Infecção pelo Vírus da Imunodeficiência Humana ou Síndrome da Imunodeficiência Adquirida~0~0~0~1
38~Infecção pelo HIV em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical do HIV~0~0~0~1
39~Infecção pelo Vírus da Imunodeficiência Humana (HIV)~0~0~0~1
40~Infecção pelo Vírus Linfotrópico de Células T Humanas (HTLV)~0~0~0~1
41~Infecção pelo HTLV em gestante, parturiente ou puérpera e Criança exposta ao risco de transmissão vertical do HTLV~0~0~0~1
42~Influenza humana produzida por novo subtipo viral~1~1~1~0
43~Intoxicação Exógena (por substâncias químicas, incluindo agrotóxicos, gases tóxicos e metais pesados)~0~0~0~1
44~Leishmaniose Tegumentar Americana~0~0~0~1
45~Leishmaniose Visceral~0~0~0~1
46~Leptospirose~0~0~1~0
47~Lesões por Esforços Repetitivos/ Distúrbios Osteomusculares Relacionados ao Trabalho (LER/DORT)~0~0~0~1
48~a. Malária na região amazônica~0~0~0~1
48~b. Malária na região extra-Amazônica~1~1~1~0
49~Monkeypox (varíola dos macacos)~1~1~1~0
50~Óbito: a. Infantil b. Materno~0~0~0~1
51~Perda Auditiva relacionada ao trabalho~0~0~0~1
52~Pneumoconioses relacionadas ao trabalho~0~0~0~1
53~Peste~1~1~1~0
54~Poliomielite/ Paralisia flácida aguda (PFA)~1~1~1~0
55~Raiva humana~1~1~1~0
56~Sífilis: a. Adquirida b. Congênita c. Em gestante~0~0~0~1
57~Síndrome da Rubéola Congênita~1~1~1~0
58~Síndrome Inflamatória Multissistêmica em Adultos (SIM-A) associada à covid-19~1~1~1~0
59~Síndrome Inflamatória Multissistêmica Pediátrica (SIM-P) associada à covid-19~1~1~1~0
60~Síndrome Respiratória Aguda Grave (Srag) hospitalizado ou óbito por Srag~1~1~1~0
61~Síndrome Gripal por covid-19 confirmada~1~1~1~0
62~a. Tétano Acidental~0~1~1~0
62~b. Tétano Neonatal~1~1~1~0
63~Toxoplasmose gestacional e congênita~0~0~0~1
64~Transtornos mentais relacionados ao trabalho~0~0~0~1
65~Tuberculose~0~0~0~1
66~Varicela (casos leve, grave internado ou óbito)~0~1~1~0
67~a. Violência doméstica e/ou outras violências~0~0~0~1
67~b. Violência sexual e tentativa de suicídio~0~0~1~0`;

// Lista Nacional de Doenças e Agravos a serem Monitorados pela Estratégia de Vigilância Sentinela (Anexo XLIII da Portaria de Consolidação GM/MS nº 5/2017)
// Vigente: redação da PRT GM/MS 11.211/2026 (BVS, lida em 22/11/2026). Nova: Anexo II da Portaria GM/MS 12.508/2026 (DOU de 17/11/2026), ainda não em vigor.
window.NOTIFICACAO.sentinela = [
 ["I", "Vigilância sentinela de doenças bacterianas de transmissão respiratória", ["Doença invasiva por Haemophilus influenzae (DIH)", "Doença pneumocócica invasiva (DPI)"]],
 ["II", "Vigilância sentinela de vírus respiratórios de importância em saúde pública", ["Síndrome Gripal (SG)"]],
 ["III", "Vigilância de doenças de transmissão hídrica e/ou alimentar", ["Rotavírus", "Doença Diarreica Aguda", "Síndrome Hemolítica Urêmica"]],
 ["IV", "Vigilância de doenças sexualmente transmissíveis", ["Síndrome de Corrimento Uretral Masculino"]],
 ["V", "Síndrome neurológica pós infecção febril exantemática", []]
];
window.NOTIFICACAO.sentinelaNova = [
 ["I", "Vigilância sentinela de doenças bacterianas de transmissão respiratória", ["Doença invasiva por Haemophilus influenzae (DIHi)", "Doença invasiva por Streptococcus pneumoniae (Doença pneumocócica invasiva - DPI)"]],
 ["II", "Vigilância sentinela de vírus respiratórios de importância em saúde pública", ["Síndrome Gripal (SG)"]],
 ["III", "Vigilância de doenças de transmissão hídrica e/ou alimentar", ["Rotavírus", "Doença Diarreica Aguda", "Síndrome Hemolítica Urêmica"]],
 ["IV", "Vigilância de doenças sexualmente transmissíveis", ["Síndrome de Corrimento Uretral Masculino"]],
 ["V", "Síndrome neurológica pós infecção febril exantemática", []]
];
window.NOTIFICACAO.sentinelaMudou = {"1.1": "Sigla alterada: DIHi", "1.2": "Nome alterado: doença invasiva por Streptococcus pneumoniae"};
