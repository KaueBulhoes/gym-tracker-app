# Workout Store

**Arquivo:** `src/stores/workoutStore.ts`
**Data:** 2026-04-11

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `plans` | `WorkoutPlan[]` | Planos de treino salvos (mock in-memory) |
| `draft` | `WorkoutPlan \| null` | Plano em criação (rascunho) |
| `lastCompleted` | `{ planId, dayName } \| null` | Último dia de treino marcado como feito |
| `sessions` | `WorkoutSession[]` | Sessões de treino finalizadas com duração e cargas |

## Ações

### `startDraft(dayNames: string[]): void`
- **O que faz:** Inicializa um rascunho de plano com os dias informados (exercícios vazios)
- **Usada em:** [AddWorkoutPlanScreen](../telas/add-workout-plan.md)

### `updateDraftDay(dayName, updater): void`
- **O que faz:** Atualiza um dia do rascunho via função updater (exercícios, descanso padrão)
- **Usada em:** [WorkoutDayScreen](../telas/workout-day.md)

### `saveDraft(): void`
- **O que faz:** Move o rascunho para a lista de planos salvos e limpa o draft
- **Usada em:** [AddWorkoutExercisesScreen](../telas/add-workout-exercises.md)

### `discardDraft(): void`
- **O que faz:** Descarta o rascunho sem salvar

### `startLastWorkout(): void`
- **O que faz:** Marca o primeiro dia do último plano salvo como `lastCompleted`

### `finishWorkout(session: WorkoutSession): void`
- **O que faz:** Salva a sessão finalizada em `sessions[]` e atualiza `lastCompleted`
- **Usada em:** [ActiveWorkoutScreen](../telas/active-workout.md)

## Tipos relacionados

Definidos em `src/types/workout.ts`:
- `Exercise` — exercício com séries, reps, drop sets, conjugado, notas
- `WorkoutDay` — dia do plano com lista de exercícios e descanso padrão
- `WorkoutPlan` — plano completo com array de dias
- `ExerciseWeight` — carga de um exercício (uniforme ou por série)
- `WorkoutSession` — sessão finalizada com duração, cargas e timestamps
