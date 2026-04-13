# Auth Service

**Arquivo:** `src/services/authService.ts`
**Data:** 2026-04-07

## Funções

### `signIn(email, password): AuthResponse`
- **O que faz:** Login com email e senha
- **Tabelas:** `auth.users`
- **Usada em:** [authStore](../funcionalidades/autenticacao.md), [LoginScreen](../telas/login.md)

### `signUp(email, password, name): AuthResponse`
- **O que faz:** Cria conta com email, senha e nome (via user_metadata)
- **Tabelas:** `auth.users`
- **Usada em:** [authStore](../funcionalidades/autenticacao.md), [RegisterScreen](../telas/cadastro.md)

### `signOut(): void`
- **O que faz:** Encerra a sessão do usuário
- **Tabelas:** `auth.users`
- **Usada em:** [authStore](../funcionalidades/autenticacao.md), [HomeScreen](../telas/home.md)

### `resetPassword(email): void`
- **O que faz:** Envia e-mail de recuperação de senha com `redirectTo` para o app
- **Tabelas:** `auth.users`
- **Usada em:** [RecoverPassword](../telas/recuperar-senha.md)

### `handleAuthDeepLink(url): boolean`
- **O que faz:** Processa o retorno do link de recuperação e cria sessão de recovery
- **Suporta:** `code` (`exchangeCodeForSession`), `token_hash` (`verifyOtp`) e `access_token`/`refresh_token` (`setSession`)
- **Usada em:** `App.tsx` (bootstrap e listener de deep link)

### `updatePassword(newPassword): void`
- **O que faz:** Atualiza a senha do usuário autenticado na sessão de recovery
- **Tabelas:** `auth.users`
- **Usada em:** [ResetPassword](../telas/redefinir-senha.md)

### `getSession(): Session | null`
- **O que faz:** Retorna a sessão ativa ou null
- **Tabelas:** `auth.users`
- **Usada em:** RootNavigator (verificação inicial)

## Regras de negócio
- Erros tratados com `mapAuthError()` — traduz para PT-BR via [AppError](../decisoes/adr-002-error-handling.md)
- Se o erro não está mapeado, usa a mensagem original do Supabase como fallback
- Nome é enviado como `user_metadata.name` no signUp
- Sem confirmação de email (desabilitado no dashboard Supabase)
- Recuperação usa deep link do app: `gymtracker://reset-password`
