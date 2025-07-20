# 🚀 Migração Manual para Supabase

## ⚠️ Problema de Conectividade Detectado

Não conseguimos conectar automaticamente ao Supabase devido a um problema de DNS/conectividade. Mas não se preocupe! Exportei todos os dados para você migrar manualmente.

## 📊 Dados Exportados

✅ **3 Cursos**: Fitoterapia Amazônica, Cosméticos Naturais, Aromaterapia Brasileira
✅ **3 Produtos**: Óleo de Copaíba, Máscara Purificante, Leave-in Capilar  
✅ **3 Publicações**: Artigos científicos sobre compostos brasileiros
✅ **2 Admin Users**: Usuários administrativos com permissões

## 📁 Arquivos Gerados

1. **`database-export.json`** - Dados em formato JSON
2. **`database-export.sql`** - Comandos SQL prontos para executar

## 🔧 Como Migrar para o Supabase

### Opção 1: Via Interface Web do Supabase

1. **Acesse seu projeto Supabase**
   - Vá para [supabase.com](https://supabase.com)
   - Entre no seu projeto "botanical-platform"

2. **Vá para o SQL Editor**
   - No menu lateral, clique em "SQL Editor"

3. **Criar as tabelas** (se não existirem):
   ```sql
   -- Cole este código no SQL Editor e execute:
   
   -- Tabela de cursos
   CREATE TABLE IF NOT EXISTS courses (
     id VARCHAR PRIMARY KEY,
     title VARCHAR NOT NULL,
     subtitle VARCHAR,
     type VARCHAR,
     description TEXT,
     image VARCHAR,
     payment_link VARCHAR,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabela de produtos
   CREATE TABLE IF NOT EXISTS products (
     id VARCHAR PRIMARY KEY,
     name VARCHAR NOT NULL,
     price DECIMAL(10,2),
     category VARCHAR,
     description TEXT,
     image VARCHAR,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabela de publicações
   CREATE TABLE IF NOT EXISTS publications (
     id SERIAL PRIMARY KEY,
     title VARCHAR NOT NULL,
     journal VARCHAR,
     year INTEGER,
     abstract TEXT,
     link VARCHAR,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabela de usuários admin
   CREATE TABLE IF NOT EXISTS admin_users (
     id VARCHAR PRIMARY KEY,
     email VARCHAR UNIQUE NOT NULL,
     password_hash VARCHAR,
     is_admin BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabela de sessões (para autenticação)
   CREATE TABLE IF NOT EXISTS sessions (
     sid VARCHAR PRIMARY KEY,
     sess JSONB NOT NULL,
     expire TIMESTAMP NOT NULL
   );
   ```

4. **Inserir os dados**
   - Abra o arquivo `database-export.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor do Supabase
   - Execute

### Opção 2: Via psql (Linha de Comando)

Se você tem acesso ao psql:

```bash
# Conectar ao Supabase
psql "sua_url_do_supabase_aqui"

# Executar o arquivo SQL
\i database-export.sql
```

### Opção 3: Via Ferramenta de Cliente SQL

Use ferramentas como:
- **DBeaver** (recomendado)
- **pgAdmin**
- **TablePlus**

1. Conecte à sua instância Supabase
2. Execute o arquivo `database-export.sql`

## ✅ Verificação da Migração

Após executar a migração, verifique se os dados foram inseridos:

```sql
-- Verificar cursos
SELECT COUNT(*) FROM courses;
SELECT title FROM courses;

-- Verificar produtos  
SELECT COUNT(*) FROM products;
SELECT name, price FROM products;

-- Verificar publicações
SELECT COUNT(*) FROM publications;
SELECT title, year FROM publications;

-- Verificar admin users
SELECT COUNT(*) FROM admin_users;
SELECT email, is_admin FROM admin_users;
```

Você deve ver:
- 3 cursos
- 3 produtos
- 3 publicações
- 2 usuários admin

## 🔄 Após a Migração

1. **Teste a URL do Supabase**:
   ```bash
   # Teste se consegue conectar
   psql "sua_url_supabase" -c "SELECT COUNT(*) FROM courses;"
   ```

2. **Configure no Vercel**:
   - Variável: `SUPABASE_DATABASE_URL`
   - Valor: sua URL do Supabase

3. **Deploy no Vercel**:
   - O projeto está configurado para usar Supabase em produção
   - As serverless functions já estão prontas

## 🚨 Possíveis Problemas e Soluções

### URL do Supabase Incorreta
- Verifique se copiou a URL completa
- Certifique-se de substituir `[YOUR-PASSWORD]` pela senha real

### Projeto Supabase Inativo
- Verifique se o projeto está ativo no dashboard
- Confirme se não excedeu limites do plano gratuito

### Problema de Conectividade
- Tente de outro local/rede
- Use VPN se necessário
- Teste em algumas horas (pode ser temporário)

## 📞 Próximos Passos

1. **Execute a migração manual** usando uma das opções acima
2. **Confirme se os dados foram migrados** com as queries de verificação
3. **Teste a conectividade** do Replit ao Supabase
4. **Deploy no Vercel** com a URL do Supabase configurada

A configuração híbrida já está pronta - só precisamos que o Supabase esteja acessível e com os dados migrados!