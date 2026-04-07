# Autenticação (Login + Cadastro)

**Status:** Em desenvolvimento
**Data:** 2026-04-07

## O que faz

Permite que o usuário crie uma conta e faça login com e-mail e senha. A sessão é persistida no dispositivo — ao reabrir o app, o usuário continua logado.

## Composição

| Camada    | Arquivo                               | Descrição                                                     |
| --------- | ------------------------------------- | ------------------------------------------------------------- |
| Tela      | `src/screens/Auth/LoginScreen.tsx`    | Formulário de e-mail e senha + botão de login                 |
| Tela      | `src/screens/Auth/RegisterScreen.tsx` | Formulário de cadastro com e-mail e senha                     |
| Service   | `src/services/supabase.ts`            | Client base com sessão persistida                             |
| Service   | `src/services/authService.ts`         | `signIn`, `signUp`, `signOut` (a implementar)                 |
| Store     | `src/stores/authStore.ts`             | Estado global: `user`, `session`, `isLoading` (a implementar) |
| Navegação | `src/navigation/AuthNavigator.tsx`    | Stack com rotas Login e Register                              |
| Navegação | `src/navigation/RootNavigator.tsx`    | Troca entre fluxo Auth/App com base na sessão                 |

## Tabelas Supabase envolvidas

- `auth.users` — gerenciada automaticamente pelo Supabase Auth

## Fases de implementação

- [x] Fase 1: Dependências e configuração do client
- [x] Fase 2: Tipos e navegação
- [ ] Fase 3: authService + authStore (Zustand)
- [ ] Fase 4: Componentes base (Button, Input)
- [ ] Fase 5: Telas LoginScreen e RegisterScreen
- [ ] Fase 6: Wiring no App.tsx
