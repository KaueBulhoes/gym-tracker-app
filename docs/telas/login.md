# Tela: Login

**Arquivo:** `src/screens/Auth/LoginScreen/LoginScreen.tsx`
**Data:** 2026-04-07

## O que o usuário faz

Informa e-mail e senha para entrar no app. Pode navegar para a tela de cadastro.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signIn` | Store | Faz login via Supabase Auth |
| `useAuthStore.error` | Store | Exibe mensagem de erro |
| `auth.users` | Tabela | Autenticação gerenciada pelo Supabase |

## Componentes usados

- `Button` — "Entrar" (primary) e "Criar conta" (outline)
- `Input` — campos de e-mail e senha (com toggle de visibilidade)

## Navegação

- **Vem de:** RootNavigator (quando não há sessão)
- **Vai para:** RegisterScreen, HomeScreen (após login)
