# Auth Store

**Arquivo:** `src/stores/authStore.ts`
**Data:** 2026-04-07

## Estado

| Campo     | Tipo             | Descrição                              |
|-----------|------------------|----------------------------------------|
| `user`    | `User \| null`   | Usuário autenticado do Supabase        |
| `session` | `Session \| null`| Sessão ativa (token, refresh, expiry)  |
| `isLoading` | `boolean`      | Indica operação de auth em andamento   |
| `isRecoveryFlow` | `boolean`  | Indica que o app está no fluxo de recuperação de senha |
| `error`   | `string \| null` | Mensagem de erro em PT-BR para a UI    |

## Actions

### `signIn(email, password): Promise<void>`
- **O que faz:** Autentica o usuário via `authService.signIn`
- **Erros:** Captura `AppError` e expõe `message` no state; erros desconhecidos viram `AppError('UNKNOWN')`
- **Usada em:** LoginScreen

### `signUp(email, password, name): Promise<void>`
- **O que faz:** Cria conta via `authService.signUp`
- **Erros:** Mesmo padrão de `signIn`
- **Usada em:** RegisterScreen

### `resetPassword(email): Promise<boolean>`
- **O que faz:** Solicita e-mail de recuperação via `authService.resetPassword`
- **Erros:** Mesmo padrão de `signIn`
- **Usada em:** RecoverPasswordScreen

### `updatePassword(newPassword): Promise<boolean>`
- **O que faz:** Atualiza senha da sessão de recuperação via `authService.updatePassword`
- **Erros:** Mesmo padrão de `signIn`
- **Usada em:** ResetPasswordScreen

### `signOut(): Promise<void>`
- **O que faz:** Encerra sessão via `authService.signOut` e limpa `user`/`session`
- **Erros:** Mesmo padrão de `signIn`
- **Usada em:** HomeScreen (botão sair)

### `setSession(session): void`
- **O que faz:** Atualiza sessão e extrai `user` dela — usado pelo RootNavigator ao detectar mudança de auth
- **Usada em:** RootNavigator (listener `onAuthStateChange`)

### `setRecoveryFlow(isRecoveryFlow): void`
- **O que faz:** Liga/desliga o estado de fluxo de recuperação de senha
- **Usada em:** App.tsx, ResetPasswordScreen

### `clearError(): void`
- **O que faz:** Limpa o campo `error` do state
- **Usada em:** LoginScreen, RegisterScreen (ao remontar ou limpar form)

## Dependências

- `authService` — todas as chamadas de auth passam pelo service
- `AppError` — tratamento padronizado de erros com mensagens em PT-BR
