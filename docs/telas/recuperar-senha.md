# Tela: Recuperar senha

**Arquivo:** `src/screens/Auth/RecoverPasswordScreen/RecoverPasswordScreen.tsx`
**Data:** 2026-04-13

## O que o usuário faz

Informa o e-mail para solicitar o envio do link de recuperação de senha.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.resetPassword` | Store | Solicita recuperação via Supabase Auth |
| `useAuthStore.error` | Store | Exibe mensagem de erro |
| `auth.users` | Tabela | Recuperação gerenciada pelo Supabase |

## Componentes usados

- `Input` — e-mail
- `Button` — "Enviar link" e "Voltar para login"

## Navegação

- **Vem de:** LoginScreen (link "Esqueceu sua senha?")
- **Vai para:** LoginScreen
