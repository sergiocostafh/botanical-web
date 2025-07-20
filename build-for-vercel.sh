#!/bin/bash

# Script para preparar o projeto para deploy no Vercel

echo "🚀 Preparando projeto para deploy no Vercel..."

# 1. Backup do package.json original
echo "📦 Fazendo backup do package.json original..."
cp package.json package.json.backup

# 2. Usar package.json simplificado para Vercel
echo "🔧 Configurando package.json para Vercel..."
cp package.json.vercel package.json

# 3. Criar diretório de build se não existir
echo "📁 Criando diretório de build..."
mkdir -p dist

# 4. Verificar se as variáveis de ambiente estão configuradas
echo "🔍 Verificando configuração..."
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado. Copie .env.example para .env e configure suas variáveis."
    cp .env.example .env
fi

# 5. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 6. Build do projeto
echo "🏗️  Fazendo build do projeto..."
npm run build

# 7. Verificar se o build foi bem-sucedido
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em: ./dist"
    
    echo ""
    echo "🌐 Próximos passos para deploy no Vercel:"
    echo "1. Faça commit das alterações no GitHub"
    echo "2. Acesse vercel.com e importe seu repositório"
    echo "3. Configure as variáveis de ambiente:"
    echo "   - DATABASE_URL=sua_url_do_postgresql"
    echo "   - NODE_ENV=production"
    echo "4. Clique em Deploy"
    echo ""
    echo "📖 Para mais detalhes, consulte DEPLOY_VERCEL.md"
else
    echo "❌ Erro no build. Verifique os logs acima."
    # Restaurar package.json original em caso de erro
    cp package.json.backup package.json
    exit 1
fi

# 8. Restaurar package.json original
echo "🔄 Restaurando package.json original..."
cp package.json.backup package.json
rm package.json.backup

echo "✨ Preparação para Vercel concluída!"