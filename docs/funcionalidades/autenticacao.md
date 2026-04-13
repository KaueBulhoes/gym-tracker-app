# Autenticação (Login + Cadastro)

**Status:** Implementada
**Data:** 2026-04-07

## O que faz

Permite que o usuário crie uma conta e faça login com e-mail e senha. A sessão é persistida no dispositivo — ao reabrir o app, o usuário continua logado.

## Composição

| Camada    | Arquivo                               | Descrição                                                     |
| --------- | ------------------------------------- | ------------------------------------------------------------- |
| Tela      | `src/screens/Auth/LoginScreen/LoginScreen.tsx`    | Formulário de e-mail e senha + botão de login                 |
| Tela      | `src/screens/Auth/RegisterScreen/RegisterScreen.tsx` | Formulário de cadastro com e-mail e senha                     |
| Tela      | `src/screens/Auth/RecoverPasswordScreen/RecoverPasswordScreen.tsx` | Solicitação de recuperação de senha por e-mail |
| Tela      | `src/screens/Auth/ResetPasswordScreen/ResetPasswordScreen.tsx` | Definição da nova senha após abrir o link de recuperação |
| Service   | `src/services/supabase.ts`            | Client base com sessão persistida                             |
| Service   | `src/services/authService.ts`         | `signIn`, `signUp`, `signOut`, recuperação e troca de senha via Supabase Auth |
| Store     | `src/stores/authStore.ts`             | Estado global: `user`, `session`, `isLoading`, `error`, estado de recuperação |
| Componente| `src/components/Button.tsx`           | Botão com variantes primary/outline e estado loading           |
| Componente| `src/components/Input.tsx`            | Input com label, erro e toggle de senha                       |
| Navegação | `src/navigation/AuthNavigator.tsx`    | Stack com rotas Login, Register, RecoverPassword e ResetPassword |
| Navegação | `src/navigation/RootNavigator.tsx`    | Troca entre fluxo Auth/App com base na sessão e modo recovery |

## Recuperação de senha (2026-04-13)

- Login agora exibe o link "Esqueceu sua senha?" para abrir a tela de recuperação.
- `RecoverPasswordScreen` envia e-mail de recuperação com redirect deep link do app (`gymtracker://reset-password`).
- `ResetPasswordScreen` recebe o usuário pelo deep link e conclui a troca com `updateUser`.
- Deep linking configurado no app (`NavigationContainer` + `linking`) e nativo:
	- Android: intent-filter em `AndroidManifest.xml`
	- iOS: URL Scheme em `Info.plist`
- `authService.handleAuthDeepLink` trata cenários de retorno com `code`, `token_hash` e `access_token`/`refresh_token`.

## Tabelas Supabase envolvidas

- `auth.users` — gerenciada automaticamente pelo Supabase Auth

## Fases de implementação

- [x] Fase 1: Dependências e configuração do client
- [x] Fase 2: Tipos e navegação
- [x] Fase 3: authService + authStore (Zustand)
- [x] Fase 4: Componentes base (Button, Input)
- [x] Fase 5: Telas LoginScreen e RegisterScreen
- [x] Fase 6: Wiring no App.tsx
