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

### `getSession(): Session | null`
- **O que faz:** Retorna a sessão ativa ou null
- **Tabelas:** `auth.users`
- **Usada em:** RootNavigator (verificação inicial)

## Regras de negócio
- Erros tratados com `mapAuthError()` — traduz para PT-BR via [AppError](../decisoes/adr-002-error-handling.md)
- Se o erro não está mapeado, usa a mensagem original do Supabase como fallback
- Nome é enviado como `user_metadata.name` no signUp
- Sem confirmação de email (desabilitado no dashboard Supabase)
