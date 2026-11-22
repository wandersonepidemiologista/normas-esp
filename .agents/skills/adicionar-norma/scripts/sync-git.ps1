<#
.SYNOPSIS
    Script auxiliar para sincronização Git segura no Google Drive para o repositório normas-esp.

.DESCRIPTION
    Remove os arquivos ocultos desktop.ini gerados pelo Google Drive dentro do diretório .git,
    adiciona os arquivos modificados (legislacoes.js), realiza o commit com o nome da norma
    e envia as alterações para a branch main do repositório remoto.

.PARAMETER NormaNome
    Nome ou título identificador da norma adicionada (ex: "Lei nº 8.080/1990").

.EXAMPLE
    .\scripts\sync-git.ps1 -NormaNome "Lei nº 8.080, de 19/09/1990"
#>

param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$NormaNome
)

$ErrorActionPreference = "Stop"

Write-Host "==> [1/4] Removendo arquivos desktop.ini de dentro de .git..." -ForegroundColor Cyan
Get-ChildItem -Path .git -Filter desktop.ini -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

Write-Host "==> [2/4] Executando git add..." -ForegroundColor Cyan
git add legislacoes.js

Write-Host "==> [3/4] Criando commit para: $NormaNome..." -ForegroundColor Cyan
git commit -m "feat(norma): adiciona $NormaNome"

Write-Host "==> [4/4] Enviando para origin main..." -ForegroundColor Cyan
git push origin main

Write-Host "==> Sincronização concluída com sucesso!" -ForegroundColor Green
