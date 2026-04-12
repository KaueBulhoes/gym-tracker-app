# Sessão de Treino

**Status:** Implementada
**Data:** 2026-04-11

## O que faz

Permite ao usuário executar um treino em tempo real com cronômetro, registrar cargas por exercício (uniforme ou por série), usar timer de descanso entre séries, e finalizar salvando toda a sessão no store.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Tela | `src/screens/Workout/ActiveWorkoutScreen.tsx` | Cronômetro, lista de exercícios, modais de descanso e carga |
| Store | `src/stores/workoutStore.ts` | `finishWorkout()` salva sessão com duração e cargas |
| Tipos | `src/types/workout.ts` | `WorkoutSession`, `ExerciseWeight` |
| Home | `src/screens/Home/HomeScreen.tsx` | Botões de navegação para iniciar treino |

## Fluxo

```
Home (botão Começar ou accordion) → ActiveWorkout → Finalizar → Home
```

## Dados salvos por sessão

- `id`, `planId`, `dayName`
- `startedAt`, `finishedAt`, `durationSeconds`
- `exerciseWeights[]` — carga por exercício (uniforme ou por série)
- `lastCompleted` é atualizado automaticamente ao finalizar
