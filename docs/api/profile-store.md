# Profile Store

**Arquivo:** `src/stores/profileStore.ts`
**Data:** 2026-04-13

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `profile` | `UserProfile \| null` | Dados do perfil do usuário |
| `isOnboardingComplete` | `boolean` | Se o onboarding foi concluído |
| `isProfileLoaded` | `boolean` | Se o perfil já foi carregado do Supabase |
| `isLoading` | `boolean` | Se há operação em andamento |
| `error` | `string \| null` | Mensagem de erro da última operação |

## Actions

### `loadProfile(): Promise<void>`
- **O que faz:** Carrega o perfil do usuário do Supabase. Define `isOnboardingComplete` e `isProfileLoaded`
- **Service:** [profileService](profile-service.md).getProfile()
- **Usada em:** [AppNavigator](../telas/app-navigator.md) (startup)

### `saveProfile(data): Promise<boolean>`
- **O que faz:** Cria o perfil no Supabase (onboarding). Retorna `true` se sucesso
- **Service:** [profileService](profile-service.md).createProfile()
- **Usada em:** [OnboardingScreen](../telas/onboarding.md)

### `updateProfile(data): Promise<boolean>`
- **O que faz:** Atualiza campos do perfil no Supabase. Retorna `true` se sucesso
- **Service:** [profileService](profile-service.md).updateProfile()
- **Usada em:** [SettingsScreen](../telas/settings.md)

### `reset(): void`
- **O que faz:** Limpa todo o estado (usado no sign out)
- **Usada em:** [authStore](auth-store.md) (signOut)

## Persistência

Integrado com Supabase via [profileService](profile-service.md). Tabela: `profiles`.
