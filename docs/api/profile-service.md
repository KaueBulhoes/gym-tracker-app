# Profile Service

**Arquivo:** `src/services/profileService.ts`
**Data:** 2026-04-13

## Funções

### `getProfile(): Promise<UserProfile | null>`
- **O que faz:** Busca o perfil do usuário autenticado no Supabase
- **Tabelas:** `profiles` (SELECT)
- **Retorno:** `UserProfile` se encontrado, `null` se ainda não criou perfil
- **Usada em:** [profileStore](profile-store.md) (`loadProfile`)

### `createProfile(data: ProfileData): Promise<UserProfile>`
- **O que faz:** Cria o perfil do usuário no banco (onboarding)
- **Tabelas:** `profiles` (INSERT)
- **Usada em:** [profileStore](profile-store.md) (`saveProfile`)

### `updateProfile(data: Partial<ProfileData>): Promise<UserProfile>`
- **O que faz:** Atualiza campos do perfil (edição nas configurações)
- **Tabelas:** `profiles` (UPDATE)
- **Usada em:** [profileStore](profile-store.md) (`updateProfile`)

## Regras de negócio

- Obtém `user_id` do usuário autenticado via `supabase.auth.getUser()`
- RLS garante que cada usuário só acessa seu próprio perfil
- Conversão de data: `DD/MM/YYYY` (app) ↔ `YYYY-MM-DD` (banco) via [caseMapper](case-mapper.md)
- Erros mapeados via `mapDatabaseError`
