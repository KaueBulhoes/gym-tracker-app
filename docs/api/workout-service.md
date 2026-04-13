# Workout Service

**Arquivo:** `src/services/workoutService.ts`
**Data:** 2026-04-13

## Funções

### `getPlans(): Promise<WorkoutPlan[]>`
- **O que faz:** Busca todos os planos do usuário com dias, exercícios e rep schemes aninhados
- **Tabelas:** `workout_plans`, `workout_plan_days`, `workout_plan_exercises`, `exercise_rep_schemes` (SELECT com nested select)
- **Usada em:** [workoutStore](workout-store.md) (`loadPlans`)

### `savePlan(draft: WorkoutPlan): Promise<WorkoutPlan>`
- **O que faz:** Persiste um plano completo no banco em inserções sequenciais
- **Tabelas:** `workout_plans` (INSERT), `workout_plan_days` (INSERT), `workout_plan_exercises` (INSERT + UPDATE para conjugated_id), `exercise_rep_schemes` (INSERT)
- **Fluxo:**
  1. INSERT plan → UUID
  2. INSERT days com plan_id → UUIDs
  3. INSERT exercises com day_id (conjugated_id=null) → UUIDs
  4. UPDATE exercises que possuem conjugatedId (mapa localId → UUID)
  5. INSERT rep_schemes com exercise_id
  6. Re-fetch completo do plano para retornar dados consistentes
- **Usada em:** [workoutStore](workout-store.md) (`saveDraft`)

### `getSessions(): Promise<WorkoutSession[]>`
- **O que faz:** Busca todas as sessões de treino do usuário com cargas
- **Tabelas:** `workout_sessions`, `workout_session_weights` (SELECT com nested select)
- **Usada em:** [workoutStore](workout-store.md) (`loadSessions`)

### `saveSession(session: WorkoutSession): Promise<WorkoutSession>`
- **O que faz:** Salva uma sessão de treino finalizada com as cargas de cada exercício
- **Tabelas:** `workout_sessions` (INSERT), `workout_session_weights` (INSERT)
- **Usada em:** [workoutStore](workout-store.md) (`finishWorkout`)

## Regras de negócio

- Obtém `user_id` do usuário autenticado via `supabase.auth.getUser()`
- RLS garante isolamento por usuário em todas as tabelas
- O draft não é descartado em caso de erro na persistência (o usuário pode tentar novamente)
- Supabase JS não suporta transações; se falhar no meio, dados órfãos ficam no banco (inofensivos)
- Conversão snake_case/camelCase via [caseMapper](case-mapper.md)
- Erros mapeados via `mapDatabaseError`
