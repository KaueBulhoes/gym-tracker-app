# Tabela: workout_session_weights

**Status:** A criar

## Descrição

Cargas utilizadas em cada exercício de uma sessão de treino. Permite rastrear evolução de carga ao longo do tempo.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `session_id` | `uuid` | NOT NULL | — | FK → `workout_sessions.id` ON DELETE CASCADE |
| `exercise_name` | `text` | NOT NULL | — | Nome do exercício (desnormalizado para queries de progressão) |
| `uniform` | `boolean` | NOT NULL | `true` | Mesmo peso em todas as séries? |
| `weights` | `text[]` | NOT NULL | — | Array de pesos em kg por série |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação |

## Índices

- PK: `id`
- INDEX: `session_id`
- INDEX: `exercise_name` (para queries de progressão)

## RLS

- Via JOIN: `session_id → workout_sessions.user_id = auth.uid()`

## Relacionamentos

- `workout_sessions` ← (session_id) — sessão pai

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `exercise_name` | `ExerciseWeight.exerciseId` (atualmente usa id, mas será nome) | `src/types/workout.ts` |
| `uniform` | `ExerciseWeight.uniform` | `src/types/workout.ts` |
| `weights` | `ExerciseWeight.weights` | `src/types/workout.ts` |

## Uso futuro

- Gráficos de evolução de carga (Fase 2 do backlog)
- Sugestão automática de peso baseada na última sessão
