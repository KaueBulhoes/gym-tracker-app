# Tabela: workout_plan_days

**Status:** Integrada (2026-04-13)

## Descrição

Dias de treino dentro de um plano. Cada dia tem um nome (A, B, C, Segunda, etc.) e configuração de descanso padrão.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `plan_id` | `uuid` | NOT NULL | — | FK → `workout_plans.id` ON DELETE CASCADE |
| `day_name` | `text` | NOT NULL | — | Nome do dia (A, B, Segunda, etc.) |
| `description` | `text` | NULL | — | Descrição do dia (ex: "Peito e Bíceps") |
| `default_rest` | `boolean` | NOT NULL | `true` | Usar descanso padrão global |
| `default_rest_seconds` | `integer` | NOT NULL | `90` | Segundos de descanso padrão |
| `sort_order` | `integer` | NOT NULL | `0` | Ordem do dia dentro do plano |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação |

## Índices

- PK: `id`
- INDEX: `plan_id`

## RLS

- Via JOIN: `plan_id → workout_plans.user_id = auth.uid()`

## Relacionamentos

- `workout_plans` ← (plan_id) — plano pai
- `workout_plan_exercises` → (day_id) — exercícios deste dia (1:N)

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `day_name` | `WorkoutDay.name` | `src/types/workout.ts` |
| `default_rest` | `WorkoutDay.defaultRest` | `src/types/workout.ts` |
| `default_rest_seconds` | `WorkoutDay.defaultRestSeconds` | `src/types/workout.ts` |
