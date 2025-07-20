# 🚀 Guia de Deploy no Vercel

## Passo a Passo Completo

### 1. Preparação do Repositório

1. **Certifique-se que todos os arquivos estão no GitHub**:
   - `vercel.json` (configuração do Vercel)
   - `api/` (serverless functions)
   - `.env.example` (template de variáveis)

### 2. Configuração do Supabase (Recomendado)

**Este projeto usa configuração híbrida:**
- **Desenvolvimento**: PostgreSQL (Replit)
- **Produção**: Supabase

**Configure o Supabase:**
1. Vá para [supabase.com](https://supabase.com)
2. Crie um projeto: `botanical-platform`
3. Vá em Settings > Database
4. Copie a connection string
5. Execute a migração de dados (veja SUPABASE_SETUP.md)

### 3. Deploy no Vercel

1. **Acesse [vercel.com](https://vercel.com)**

2. **Clique em "New Project"**

3. **Importe seu repositório do GitHub**

4. **Configure as seguintes opções**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `.` (raiz)
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Adicione as variáveis de ambiente**:
   ```
   SUPABASE_DATABASE_URL=sua_url_do_supabase_aqui
   NODE_ENV=production
   ```

6. **Clique em "Deploy"**

### 4. Após o Deploy

1. **Acesse sua URL do Vercel** (algo como `https://seu-projeto.vercel.app`)

2. **Teste as funcionalidades**:
   - Site principal deve carregar
   - Acesse `/admin/login` para o painel administrativo
   - Use `admin` / `admin123` para entrar

3. **Configure o domínio personalizado** (opcional):
   - Vá em Project Settings > Domains
   - Adicione seu domínio customizado

### 5. Configuração Avançada (Opcional)

**Para Google OAuth em produção**:
1. Configure as variáveis:
   ```
   GOOGLE_CLIENT_ID=seu_client_id
   GOOGLE_CLIENT_SECRET=seu_client_secret
   SESSION_SECRET=uma_chave_secreta_aleatoria
   ```

2. No Google Cloud Console:
   - Adicione seu domínio Vercel nas origens autorizadas
   - Configure a URI de callback: `https://seu-dominio.vercel.app/api/auth/google/callback`

## ⚠️ Problemas Comuns

### Build falha
- **Erro**: Dependências não encontradas
- **Solução**: Certifique-se que todas as dependências estão no `package.json`

### API não funciona
- **Erro**: 404 nas rotas `/api/*`
- **Solução**: Verifique se os arquivos em `/api/` estão corretos

### Banco de dados não conecta
- **Erro**: Connection refused
- **Solução**: Verifique a `DATABASE_URL` nas variáveis de ambiente

### Páginas admin não carregam
- **Erro**: Rota não encontrada
- **Solução**: Certifique-se que o `vercel.json` está configurado corretamente

## 📞 Suporte

Se você tiver problemas:

1. **Verifique os logs do Vercel**:
   - Vá em seu projeto no Vercel
   - Clique na aba "Functions"
   - Verifique os logs de erro

2. **Teste localmente primeiro**:
   ```bash
   npm run build
   npm run start
   ```

3. **Verifique as variáveis de ambiente** no painel do Vercel

## ✅ Checklist Final

- [ ] Repositório no GitHub atualizado
- [ ] Banco PostgreSQL criado e configurado
- [ ] Projeto criado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build completado com sucesso
- [ ] Site acessível e funcionando
- [ ] Admin panel acessível (`/admin/login`)
- [ ] APIs funcionando (`/api/courses`, `/api/products`, etc.)

Após completar todos os itens, seu projeto estará rodando no Vercel! 🎉