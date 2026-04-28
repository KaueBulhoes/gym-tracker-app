# Tabela: workout_sessions

**Status:** Integrada (2026-04-13)

## Descrição

Registro de cada sessão de treino finalizada pelo usuário. Guarda quando começou, terminou e quanto durou.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NOT NULL | — | FK → `auth.users.id` |
| `plan_id` | `uuid` | NOT NULL | — | FK → `workout_plans.id` |
| `day_name` | `text` | NOT NULL | — | Nome do dia treinado (desnormalizado para queries rápidas) |
| `started_at` | `timestamptz` | NOT NULL | — | Início da sessão |
| `finished_at` | `timestamptz` | NOT NULL | — | Fim da sessão |
| `duration_seconds` | `integer` | NOT NULL | — | Duração total em segundos |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação do registro |

## Índices

- PK: `id`
- INDEX: `user_id`
- INDEX: `plan_id`
- INDEX: `finished_at` (para queries de "treinos desta semana")

## RLS

- `SELECT / INSERT / UPDATE / DELETE`: `auth.uid() = user_id`

## Relacionamentos

- `auth.users` ← (user_id) — proprietário
- `workout_plans` ← (plan_id) — plano usado
- `workout_session_weights` → (session_id) — cargas por exercício (1:N)
- `workout_session_feedback` → (session_id) — feedback da sessão (1:1)

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `id` | `WorkoutSession.id` | `src/types/workout.ts` |
| `plan_id` | `WorkoutSession.planId` | `src/types/workout.ts` |
| `day_name` | `WorkoutSession.dayName` | `src/types/workout.ts` |
| `started_at` | `WorkoutSession.startedAt` | `src/types/workout.ts` |
| `finished_at` | `WorkoutSession.finishedAt` | `src/types/workout.ts` |
| `duration_seconds` | `WorkoutSession.durationSeconds` | `src/types/workout.ts` |

## Telas que dependem

- ActiveWorkoutScreen (insert via finishWorkout)
- HomeScreen (select — contagem semanal, último treino)
