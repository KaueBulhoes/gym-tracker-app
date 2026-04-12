# Profile Store

**Arquivo:** `src/stores/profileStore.ts`
**Data:** 2026-04-12

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `profile` | `UserProfile \| null` | Dados do perfil do usuário |
| `isOnboardingComplete` | `boolean` | Se o onboarding foi concluído |

## Actions

### `saveProfile(data): void`
- **O que faz:** Salva os dados do perfil, define `onboardingCompletedAt` com a data atual e marca `isOnboardingComplete = true`
- **Usada em:** OnboardingScreen

## Dependências

- `UserProfile`, `FitnessGoal` — tipos de `src/types/profile.ts`

## Persistência

Mock in-memory via Zustand. Integração com Supabase (tabela `profiles`) pendente.
