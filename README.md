# Amanda D'Angelis Botanical Platform

Plataforma educacional e e-commerce para pesquisa botânica e compostos bioativos do Brasil.

## 🌿 Funcionalidades

- **Gestão de Cursos**: Sistema completo para cursos online com descrições ricas
- **Catálogo de Produtos**: E-commerce integrado com carrinho de compras
- **Publicações Científicas**: Showcase de pesquisas e artigos científicos
- **Painel Administrativo**: Interface completa para gerenciamento de conteúdo
- **Busca Inteligente**: Sistema de busca com autocomplete em tempo real
- **Autenticação Segura**: Sistema de login com Google OAuth

## 🚀 Deploy no Vercel

### Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório no GitHub
3. Banco de dados PostgreSQL (recomendo [Neon](https://neon.tech) ou [Supabase](https://supabase.com))

### Configuração do Deploy

1. **Fork/Clone este repositório no GitHub**

2. **Conecte no Vercel**:
   - Vá para [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub

3. **Configure as variáveis de ambiente no Vercel**:
   ```
   DATABASE_URL=sua_url_do_postgres
   NODE_ENV=production
   ```

4. **Configure o Build**:
   - Framework: `Vite`
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o build completar

### Configuração do Banco de Dados

1. **Crie um banco PostgreSQL** (Neon, Supabase, etc.)

2. **Configure a URL do banco** nas variáveis de ambiente do Vercel

3. **Execute as migrações** (opcional):
   ```bash
   npm run db:push
   ```

## 🛠️ Desenvolvimento Local

1. **Clone o repositório**:
   ```bash
   git clone <seu-repositorio>
   cd botanical-platform
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o desenvolvimento**:
   ```bash
   npm run dev
   ```

## 📁 Estrutura do Projeto

```
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilitários e configurações
├── server/                 # Backend Express.js
│   ├── db.ts              # Configuração do banco
│   ├── storage.ts         # Operações de banco de dados
│   └── routes.ts          # Rotas da API
├── api/                   # Serverless functions para Vercel
├── shared/                # Código compartilhado
│   └── schema.ts          # Schema do banco Drizzle
└── vercel.json           # Configuração do Vercel
```

## 🔧 Tecnologias

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Banco de Dados**: PostgreSQL, Drizzle ORM
- **Autenticação**: Google OAuth, Passport.js
- **Deploy**: Vercel Serverless Functions
- **Roteamento**: Wouter
- **Estado**: React Query, Context API

## 🔐 Autenticação

O sistema possui duas opções de autenticação:

1. **Google OAuth** (Produção):
   - Configure `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`
   - Adicione domínios autorizados no Google Cloud Console

2. **Login Simples** (Desenvolvimento):
   - Usuário: `admin`
   - Senha: `admin123`

## 📧 Contato

Para dúvidas sobre o projeto, entre em contato com sergio.vscf@gmail.com

## 📄 Licença

Este projeto está sob a licença MIT.