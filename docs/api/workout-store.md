# Workout Store

**Arquivo:** `src/stores/workoutStore.ts`
**Data:** 2026-04-13

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `plans` | `WorkoutPlan[]` | Planos de treino salvos |
| `draft` | `WorkoutPlan \| null` | Plano em criação (rascunho, local apenas) |
| `lastCompleted` | `{ planId, dayName } \| null` | Último dia de treino feito |
| `sessions` | `WorkoutSession[]` | Sessões de treino finalizadas |
| `isLoading` | `boolean` | Se há operação em andamento |
| `error` | `string \| null` | Mensagem de erro da última operação |

## Ações Async (Supabase)

### `loadPlans(): Promise<void>`
- **O que faz:** Carrega todos os planos do usuário do Supabase (com dias, exercícios e rep schemes)
- **Service:** [workoutService](workout-service.md).getPlans()
- **Usada em:** AppNavigator (startup)

### `loadSessions(): Promise<void>`
- **O que faz:** Carrega todas as sessões de treino do Supabase
- **Service:** [workoutService](workout-service.md).getSessions()
- **Usada em:** AppNavigator (startup)

### `saveDraft(): Promise<boolean>`
- **O que faz:** Persiste o draft no Supabase (inserção multi-tabela), retorna `true` se sucesso. O draft não é descartado em caso de erro
- **Service:** [workoutService](workout-service.md).savePlan()
- **Usada em:** [AddWorkoutExercisesScreen](../telas/add-workout-exercises.md)

### `finishWorkout(session): Promise<boolean>`
- **O que faz:** Salva sessão de treino e cargas no Supabase, atualiza `lastCompleted`
- **Service:** [workoutService](workout-service.md).saveSession()
- **Usada em:** [ActiveWorkoutScreen](../telas/active-workout.md)

## Ações Sync (local)

### `startDraft(dayNames): void`
- **O que faz:** Inicializa rascunho com dias vazios
- **Usada em:** [AddWorkoutPlanScreen](../telas/add-workout-plan.md)

### `updateDraftDay(dayName, updater): void`
- **O que faz:** Atualiza um dia do rascunho via função updater
- **Usada em:** [WorkoutDayScreen](../telas/workout-day.md)

### `discardDraft(): void`
- **O que faz:** Descarta o rascunho sem salvar

### `startLastWorkout(): void`
- **O que faz:** Marca o primeiro dia do último plano como `lastCompleted`

### `reset(): void`
- **O que faz:** Limpa todo o estado (usado no sign out)
- **Usada em:** [authStore](auth-store.md) (signOut)

## Persistência

Integrado com Supabase via [workoutService](workout-service.md). O `draft` permanece local (in-memory).
