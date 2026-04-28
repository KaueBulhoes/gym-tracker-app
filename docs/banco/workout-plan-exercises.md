# Tabela: workout_plan_exercises

**Status:** Integrada (2026-04-13)

## Descrição

Exercícios configurados em cada dia de treino. Guarda séries, repetições, descanso individual e notas.

Observação de implementação atual:

- A carga do exercício em kg (`Exercise.loadKg`) é persistida no campo `notes` com token interno no formato `[load_kg:VALOR]`.
- O mapper remove/adiciona esse token automaticamente para exibir apenas a observação limpa na UI.

## Colunas

| Coluna          | Tipo          | Nullable | Default             | Descrição                                              |
| --------------- | ------------- | -------- | ------------------- | ------------------------------------------------------ |
| `id`            | `uuid`        | NOT NULL | `gen_random_uuid()` | PK                                                     |
| `day_id`        | `uuid`        | NOT NULL | —                   | FK → `workout_plan_days.id` ON DELETE CASCADE          |
| `name`          | `text`        | NOT NULL | —                   | Nome do exercício                                      |
| `sets`          | `text`        | NOT NULL | `'3'`               | Número de séries (para reps fixas)                     |
| `reps`          | `text`        | NOT NULL | `'12'`              | Repetições por série (para reps fixas)                 |
| `fixed_reps`    | `boolean`     | NOT NULL | `true`              | Se false, usa rep_schemes (drop set)                   |
| `rest_seconds`  | `integer`     | NULL     | —                   | Descanso individual (override do dia)                  |
| `notes`         | `text`        | NULL     | —                   | Observações do exercício                               |
| `conjugated_id` | `uuid`        | NULL     | —                   | FK → `workout_plan_exercises.id` (exercício conjugado) |
| `sort_order`    | `integer`     | NOT NULL | `0`                 | Ordem do exercício no dia                              |
| `created_at`    | `timestamptz` | NOT NULL | `now()`             | Criação                                                |

## Índices

- PK: `id`
- INDEX: `day_id`

## RLS

- Via JOIN: `day_id → workout_plan_days.plan_id → workout_plans.user_id = auth.uid()`

## Relacionamentos

- `workout_plan_days` ← (day_id) — dia pai
- `exercise_rep_schemes` → (exercise_id) — blocos de reps para drop sets (1:N)
- `workout_plan_exercises` ← (conjugated_id) — auto-referência para conjugados

## Mapeamento com o código

| Coluna DB                           | Campo TypeScript        | Arquivo                |
| ----------------------------------- | ----------------------- | ---------------------- |
| `id`                                | `Exercise.id`           | `src/types/workout.ts` |
| `name`                              | `Exercise.name`         | `src/types/workout.ts` |
| `sets`                              | `Exercise.sets`         | `src/types/workout.ts` |
| `reps`                              | `Exercise.reps`         | `src/types/workout.ts` |
| `fixed_reps`                        | `Exercise.fixedReps`    | `src/types/workout.ts` |
| `rest_seconds`                      | `Exercise.restSeconds`  | `src/types/workout.ts` |
| `notes`                             | `Exercise.notes`        | `src/types/workout.ts` |
| `notes` (token interno `[load_kg]`) | `Exercise.loadKg`       | `src/types/workout.ts` |
| `conjugated_id`                     | `Exercise.conjugatedId` | `src/types/workout.ts` |
