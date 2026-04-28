# Tabela: workout_session_feedback

**Status:** Integrada (2026-04-27) — migration `002_workout_session_feedback.sql`

## Descrição

Feedback subjetivo do usuário ao finalizar uma sessão de treino: intensidade percebida, exercícios em que sentiu dificuldade e um comentário livre. Relacionamento 1:1 com `workout_sessions` — cada sessão pode ter no máximo um feedback.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `session_id` | `uuid` | NOT NULL | — | FK → `workout_sessions.id` ON DELETE CASCADE. UNIQUE (1:1) |
| `intensity` | `text` | NOT NULL | — | Intensidade percebida. CHECK: `light` \| `moderate` \| `intense` |
| `difficult_exercises` | `text[]` | NOT NULL | `'{}'` | Nomes dos exercícios marcados como difíceis. Array vazio = não teve dificuldade |
| `comment` | `text` | NULL | — | Comentário livre do usuário (opcional) |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação do registro |

## Constraints

- `workout_session_feedback_session_id_unique`: UNIQUE em `session_id` (garante 1:1)
- CHECK: `intensity in ('light', 'moderate', 'intense')`

## Índices

- PK: `id`
- INDEX: `session_id`

## RLS

- Via JOIN: `session_id → workout_sessions.user_id = auth.uid()`

## Relacionamentos

- `workout_sessions` ← (session_id) — sessão pai (1:1)

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `session_id` | `WorkoutFeedback.sessionId` | `src/types/workout.ts` (a criar) |
| `intensity` | `WorkoutFeedback.intensity` | `src/types/workout.ts` (a criar) |
| `difficult_exercises` | `WorkoutFeedback.difficultExercises` | `src/types/workout.ts` (a criar) |
| `comment` | `WorkoutFeedback.comment` | `src/types/workout.ts` (a criar) |

Os valores de `intensity` no banco (`light` / `moderate` / `intense`) são exibidos na UI em PT-BR como `Leve` / `Moderado` / `Intenso`.

`difficult_exercises` segue o mesmo padrão de `workout_session_weights.exercise_name` — texto livre, não FK, para preservar o histórico mesmo se o exercício for renomeado ou removido do plano.

## Decisões de design

- **Tabela única (não normalizada):** `difficult_exercises` é `text[]` em vez de tabela filha 1:N. Os dados são atômicos com o feedback (nunca consultados isoladamente) e o projeto já usa `text[]` em casos análogos (`workout_session_weights.weights`, `profiles.fitness_goals`). Para queries agregadas futuras (ex: "qual exercício é mais marcado como difícil"), usar `unnest(difficult_exercises)`.
- **Sem coluna boolean `had_difficulty`:** seria redundante com o array — array vazio já indica que não houve dificuldade.

## Telas que dependem

- WorkoutFeedbackScreen (a criar) — insere o registro ao finalizar o treino
