# Tabela: workout_plans

**Status:** Integrada (2026-04-13)

## Descrição

Planos de treino criados pelo usuário. Cada plano agrupa um conjunto de dias (A/B/C, Seg/Qua/Sex, etc.).

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NOT NULL | — | FK → `auth.users.id` |
| `name` | `text` | NOT NULL | `'Meu Treino'` | Nome do plano (ex: "Treino ABCDE") |
| `is_active` | `boolean` | NOT NULL | `false` | Se é a ficha ativa |
| `finished_at` | `timestamptz` | NULL | — | Quando foi desativado |
| `duration_days` | `integer` | NULL | — | Duração da ficha em dias |
| `expires_at` | `timestamptz` | NULL | — | Data de expiração |
| `expiry_dismissed` | `boolean` | NOT NULL | `false` | Se o aviso de vencimento foi dispensado |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação do plano |

## Índices

- PK: `id`
- INDEX: `user_id`

## RLS

- `SELECT / INSERT / UPDATE / DELETE`: `auth.uid() = user_id`

## Relacionamentos

- `auth.users` ← (user_id) — proprietário
- `workout_plan_days` → (plan_id) — dias do plano (1:N)
- `workout_sessions` → (plan_id) — sessões que usaram este plano (1:N)

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `id` | `WorkoutPlan.id` | `src/types/workout.ts` |
| `name` | `WorkoutPlan.name` | `src/types/workout.ts` |
| `is_active` | `WorkoutPlan.isActive` | `src/types/workout.ts` |
| `finished_at` | `WorkoutPlan.finishedAt` | `src/types/workout.ts` |
| `duration_days` | `WorkoutPlan.durationDays` | `src/types/workout.ts` |
| `expires_at` | `WorkoutPlan.expiresAt` | `src/types/workout.ts` |
| `expiry_dismissed` | `WorkoutPlan.expiryDismissed` | `src/types/workout.ts` |
| `created_at` | `WorkoutPlan.createdAt` | `src/types/workout.ts` |

## Services que usam

- `workoutService.ts` (a criar) — CRUD de planos

## Telas que dependem

- AddWorkoutExercisesScreen (insert via saveDraft)
- HomeScreen (select — lista de planos)
- ActiveWorkoutScreen (select — exercícios do dia)
