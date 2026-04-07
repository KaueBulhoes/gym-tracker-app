# Tela: Cadastro

**Arquivo:** `src/screens/Auth/RegisterScreen.tsx`
**Data:** 2026-04-07

## O que o usuário faz

Preenche nome, e-mail, senha e confirmação de senha para criar uma conta. Validação de senhas iguais em tempo real.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signUp` | Store | Cria conta via Supabase Auth |
| `useAuthStore.error` | Store | Exibe mensagem de erro |
| `auth.users` | Tabela | Autenticação gerenciada pelo Supabase |

## Componentes usados

- `Button` — "Cadastrar" (primary) e "Já tenho conta" (outline)
- `Input` — campos de nome, e-mail, senha e confirmação (com toggle)

## Navegação

- **Vem de:** LoginScreen
- **Vai para:** HomeScreen (após cadastro), LoginScreen (voltar)
