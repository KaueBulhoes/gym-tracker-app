# Tabela: exercise_rep_schemes

**Status:** Integrada (2026-04-13)

## Descrição

Blocos de séries/repetições para exercícios com repetições variáveis (drop sets). Cada bloco define quantas séries e quantas reps naquele bloco.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `exercise_id` | `uuid` | NOT NULL | — | FK → `workout_plan_exercises.id` ON DELETE CASCADE |
| `sets` | `text` | NOT NULL | — | Número de séries deste bloco |
| `reps` | `text` | NOT NULL | — | Repetições deste bloco |
| `sort_order` | `integer` | NOT NULL | `0` | Ordem do bloco |

## Índices

- PK: `id`
- INDEX: `exercise_id`

## RLS

- Via JOIN: `exercise_id → workout_plan_exercises.day_id → ... → workout_plans.user_id = auth.uid()`

## Relacionamentos

- `workout_plan_exercises` ← (exercise_id) — exercício pai

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `sets` | `RepScheme.sets` | `src/types/workout.ts` |
| `reps` | `RepScheme.reps` | `src/types/workout.ts` |

## Exemplo

Exercício com drop set "3x12 + 2x8":
- Bloco 1: sets=3, reps=12, sort_order=0
- Bloco 2: sets=2, reps=8, sort_order=1
