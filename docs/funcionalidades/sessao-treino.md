# Sessão de Treino

**Status:** Implementada
**Data:** 2026-04-14

## O que faz

Permite ao usuário executar um treino em tempo real com cronômetro, registrar cargas por exercício (uniforme ou por série), usar timer de descanso entre séries, pausar/retomar, cancelar treino e finalizar salvando toda a sessão no store.

O progresso do treino ativo é persistido localmente para evitar perda ao sair da tela ou reabrir o app.

## Composição

| Camada    | Arquivo                                                           | Descrição                                                                                                   |
| --------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Tela      | `src/screens/Workout/ActiveWorkoutScreen/ActiveWorkoutScreen.tsx` | Cronômetro, lista de exercícios, modais de descanso e carga                                                 |
| Store     | `src/stores/workoutStore.ts`                                      | Gerencia treino ativo persistido (`activeWorkout`), ticker, pausa/retomada/cancelamento e `finishWorkout()` |
| Tipos     | `src/types/workout.ts`                                            | `WorkoutSession`, `ExerciseWeight`, `ActiveWorkout`                                                         |
| Home      | `src/screens/Home/HomeScreen/HomeScreen.tsx`                      | Botões de navegação para iniciar ou retomar treino                                                          |
| Navegação | `src/navigation/AppNavigator/AppNavigator.tsx`                    | Reidrata treino ativo salvo no bootstrap                                                                    |

## Fluxo

```
Home (botão Começar ou accordion) → ActiveWorkout (novo ou retomado)
ActiveWorkout → Pausar/Retomar (mantém progresso)
ActiveWorkout → Cancelar (descarta progresso, sem salvar sessão)
ActiveWorkout → Finalizar (salva sessão) → Home
```

## Dados salvos por sessão

- `id`, `planId`, `dayName`
- `startedAt`, `finishedAt`, `durationSeconds`
- `exerciseWeights[]` — carga por exercício (uniforme ou por série)
- `lastCompleted` é atualizado automaticamente ao finalizar

## Persistência local

- Chave AsyncStorage: `@gymtracker:active-workout`
- Estado salvo: plano/dia, `startedAt`, `elapsedSeconds`, `isPaused`, séries concluídas e cargas
- O cronômetro continua enquanto o app está aberto (mesmo fora da tela) e para ao encerrar o app
