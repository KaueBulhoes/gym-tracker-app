# Tela: Redefinir senha

**Arquivo:** `src/screens/Auth/ResetPasswordScreen/ResetPasswordScreen.tsx`
**Data:** 2026-04-13

## O que o usuário faz

Define uma nova senha após abrir o link de recuperação recebido por e-mail.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.updatePassword` | Store | Atualiza senha do usuário autenticado na sessão de recovery |
| `useAuthStore.setRecoveryFlow` | Store | Controla modo de recuperação no app |
| `auth.users` | Tabela | Alteração de senha no Supabase Auth |

## Componentes usados

- `Input` — nova senha e confirmação
- `Button` — "Atualizar senha" e "Cancelar/Ir para login"

## Navegação

- **Vem de:** deep link `gymtracker://reset-password`
- **Vai para:** LoginScreen (após sucesso ou cancelamento)
