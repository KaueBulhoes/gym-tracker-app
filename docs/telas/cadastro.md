# Tela: Cadastro

**Arquivo:** `src/screens/Auth/RegisterScreen/RegisterScreen.tsx`
**Data:** 2026-04-12

## O que o usuário faz

Preenche nome, e-mail, senha e confirmação de senha para criar uma conta. Validação de senhas iguais em tempo real. Após cadastro bem-sucedido, um modal informa que é necessário confirmar o e-mail antes de fazer login.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signUp` | Store | Cria conta via Supabase Auth, retorna `boolean` de sucesso |
| `useAuthStore.error` | Store | Exibe mensagem de erro |
| `auth.users` | Tabela | Autenticação gerenciada pelo Supabase |

## Componentes usados

- `Button` — "Cadastrar" (primary), "Já tenho conta" (outline), "Ok" (modal)
- `Input` — campos de nome, e-mail, senha e confirmação (com toggle)
- `Modal` (React Native) — aviso de confirmação de e-mail após cadastro

## Navegação

- **Vem de:** LoginScreen
- **Vai para:** LoginScreen (após confirmar modal de verificação de e-mail ou botão "Já tenho conta")
