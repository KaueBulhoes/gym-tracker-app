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
- **O que faz:** Busca todas as sessões de treino do usuário com cargas e feedback
- **Tabelas:** `workout_sessions`, `workout_session_weights`, `workout_session_feedback` (SELECT com nested select)
- **Usada em:** [workoutStore](workout-store.md) (`loadSessions`)

### `setActivePlan(planId: string): Promise<WorkoutPlan[]>`
- **O que faz:** Desativa o plano ativo atual e ativa o plano alvo. Re-fetch todos os planos
- **Tabelas:** `workout_plans` (UPDATE)
- **Usada em:** [workoutStore](workout-store.md) (`setActivePlan`)

### `renewPlan(planId: string, days: number): Promise<void>`
- **O que faz:** Renova a ficha com nova duração e data de expiração
- **Tabelas:** `workout_plans` (UPDATE: duration_days, expires_at, expiry_dismissed)
- **Usada em:** [workoutStore](workout-store.md) (`renewPlan`)

### `dismissExpiry(planId: string): Promise<void>`
- **O que faz:** Marca o aviso de vencimento como dispensado
- **Tabelas:** `workout_plans` (UPDATE: expiry_dismissed)
- **Usada em:** [workoutStore](workout-store.md) (`dismissExpiry`)

### `saveSession(session: WorkoutSession): Promise<WorkoutSession>`
- **O que faz:** Salva uma sessão de treino finalizada com cargas e feedback opcional
- **Tabelas:** `workout_sessions` (INSERT), `workout_session_weights` (INSERT), `workout_session_feedback` (INSERT — quando `session.feedback` está presente)
- **Fluxo:**
  1. INSERT session → UUID
  2. INSERT weights vinculados ao session_id
  3. INSERT feedback vinculado ao session_id (apenas se `session.feedback != null`)
  4. Re-fetch da sessão com weights + feedback aninhados
- **Usada em:** [workoutStore](workout-store.md) (`finishWorkout`), invocada a partir de [WorkoutFeedbackScreen](../telas/workout-feedback.md)

## Regras de negócio

- Obtém `user_id` do usuário autenticado via `supabase.auth.getUser()`
- RLS garante isolamento por usuário em todas as tabelas
- O draft não é descartado em caso de erro na persistência (o usuário pode tentar novamente)
- Supabase JS não suporta transações; se falhar no meio, dados órfãos ficam no banco (inofensivos)
- Ao salvar novo plano, desativa o plano ativo anterior automaticamente (finished_at = NOW)
- `savePlan` agora inclui `name`, `is_active`, `duration_days`, `expires_at`
- Conversão snake_case/camelCase via [caseMapper](case-mapper.md)
- Erros mapeados via `mapDatabaseError`
