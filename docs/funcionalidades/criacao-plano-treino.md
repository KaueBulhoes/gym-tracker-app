# Criação de Plano de Treino

**Status:** Implementada (persistência mock in-memory)
**Data:** 2026-04-11

## O que faz

Permite ao usuário criar um plano de treino escolhendo entre três modelos de divisão: letras (ABCDE), dias da semana (Seg–Dom) ou nomes personalizados. Em seguida configura os exercícios de cada dia e salva o plano. Os dados ficam no Zustand store (in-memory).

## Composição

| Camada     | Arquivo                                              | Descrição                                                  |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| Tela       | `src/screens/Workout/AddWorkoutPlanScreen.tsx`       | Radio buttons de tipo + painel dinâmico de seleção/criação |
| Tela       | `src/screens/Workout/AddWorkoutExercisesScreen.tsx`  | Lista de dias do plano com contagem de exercícios + Salvar |
| Tela       | `src/screens/Workout/WorkoutDayScreen.tsx`           | Configuração de exercícios por dia com dialog modal        |
| Store      | `src/stores/workoutStore.ts`                         | Rascunho (draft), planos salvos, último treino ativado     |
| Tipos      | `src/types/workout.ts`                               | Exercise, WorkoutDay, WorkoutPlan                          |
| Componente | `src/screens/Workout/components/DayChipSelector.tsx` | Chips para modos ABCDE e Seg a Sex                         |
| Componente | `src/screens/Workout/components/CustomDayForm.tsx`   | Form sequencial para modo personalizável com rename/delete |
| Navegação  | `src/navigation/AppNavigator.tsx`                    | Stack Navigator que expõe as rotas do fluxo                |

## Fluxo de telas

```
AddWorkoutPlan → (startDraft) → AddWorkoutExercises → WorkoutDay (por dia)
                                      ↓ Salvar
                                  saveDraft() → Home
```

## Funcionalidades do dialog de exercícios (WorkoutDayScreen)

- Séries e repetições fixas ou personalizadas (drop set com múltiplos blocos)
- Exercícios conjugados (dois exercícios vinculados visualmente)
- Descanso padrão global ou individual por exercício
- Observações opcionais
- Tags visuais: "drop set" (amarelo) e "conjugado" (roxo)

## Persistência

- Dados ficam no Zustand store (`useWorkoutStore`) — mock in-memory, sem Supabase ainda
- O rascunho sobrevive à navegação entre telas do fluxo (store global)
- Ao salvar, o rascunho é movido para `plans[]` e fica disponível na Home

## Tabelas Supabase (a integrar)

- `workout_plans` — receberá o plano criado (name, user_id, days_per_week)
- `workout_plan_exercises` — receberá os exercícios de cada divisão
