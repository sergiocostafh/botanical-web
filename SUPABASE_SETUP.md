# 🗄️ Configuração Híbrida: PostgreSQL + Supabase

## Arquitetura Implementada

- **Desenvolvimento (Replit)**: PostgreSQL local
- **Produção (Vercel)**: Supabase (PostgreSQL managed)
- **Migração automática**: Script para sincronizar dados

## Dados Atuais no PostgreSQL

Identifiquei os seguintes dados no banco atual:

### Cursos (3):
1. **Aromaterapia Brasileira** - 15 Óleos Essenciais da Flora Nativa
2. **Fitoterapia Amazônica** - Plantas Medicinais da Floresta
3. **Cosméticos Naturais** - Formulação com Ativos Brasileiros

### Produtos (3):
1. **Óleo Essencial de Copaíba** - R$ 65,00
2. **Máscara Facial Purificante** - R$ 79,00
3. **Leave-in Fortalecedor Capilar** - R$ 85,00

### Publicações (3):
1. **Bioatividade de Óleos Essenciais da Flora Brasileira** (2024)
2. **Compostos Fenólicos em Plantas Amazônicas** (2023)
3. **Atividade Antimicrobiana de Extratos Vegetais** (2024)

## Como Configurar o Supabase

### 1. Criar Projeto no Supabase

1. **Acesse [supabase.com](https://supabase.com)**
2. **Crie uma conta ou faça login**
3. **Clique em "New Project"**
4. **Configure:**
   - Project name: `botanical-platform`
   - Database password: (escolha uma senha forte)
   - Region: escolha mais próximo do Brasil

### 2. Obter Connection String

1. **Vá em Settings > Database**
2. **Copie a "Connection string"**
3. **Substitua `[YOUR-PASSWORD]` pela senha que você definiu**

Exemplo:
```
postgresql://postgres:sua_senha@db.projeto.supabase.co:5432/postgres
```

### 3. Configurar Variáveis de Ambiente

**Para desenvolvimento (Replit):**
```bash
# .env
DATABASE_URL=postgresql://replit_postgres_url
SUPABASE_DATABASE_URL=postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres
```

**Para produção (Vercel):**
```bash
# Vercel Environment Variables
SUPABASE_DATABASE_URL=postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres
NODE_ENV=production
```

## Script de Migração

Criei um script para migrar os dados atuais para o Supabase:

```bash
# Execute no Replit para migrar dados
npx tsx scripts/migrate-to-supabase.ts
```

## Como Testar

### 1. Desenvolvimento (Replit)
- Dados ficam no PostgreSQL local
- Use `npm run dev` normalmente

### 2. Produção (Vercel)
- Dados vêm do Supabase
- Deploy no Vercel com `SUPABASE_DATABASE_URL`

## Comandos Úteis

```bash
# Migrar dados do PostgreSQL para Supabase
npx tsx scripts/migrate-to-supabase.ts

# Push schema para Supabase (se necessário)
npm run db:push

# Verificar dados no Supabase
psql "postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres"
```

## Vantagens desta Configuração

✅ **Desenvolvimento rápido**: PostgreSQL local no Replit
✅ **Produção escalável**: Supabase managed
✅ **Dados preservados**: Migração automática
✅ **Flexibilidade**: Pode alternar entre ambientes
✅ **Backup automático**: Supabase tem backup integrado

## Próximos Passos

1. **Configure o Supabase** (5 minutos)
2. **Configure a variável `SUPABASE_DATABASE_URL`**
3. **Execute a migração** com o script
4. **Deploy no Vercel** com a nova configuração

Após isso, seu projeto funcionará perfeitamente em ambos os ambientes!