# Criação de Plano de Treino

**Status:** Em desenvolvimento
**Data:** 2026-04-09

## O que faz

Permite ao usuário criar um plano de treino escolhendo entre três modelos de divisão: letras (ABCDE), dias da semana (Seg–Dom) ou nomes personalizados. A tela guia a seleção/criação das divisões antes de persistir o plano.

## Composição

| Camada     | Arquivo                                              | Descrição                                                  |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| Tela       | `src/screens/Workout/AddWorkoutPlanScreen.tsx`       | Radio buttons de tipo + painel dinâmico de seleção/criação |
| Tela       | `src/screens/Workout/AddWorkoutExercisesScreen.tsx`  | Lista de dias do plano para configurar exercícios          |
| Tela       | `src/screens/Workout/WorkoutDayScreen.tsx`           | Configuração de exercícios por dia com dialog modal        |
| Componente | `src/screens/Workout/components/DayChipSelector.tsx` | Chips para modos ABCDE e Seg a Sex                         |
| Componente | `src/screens/Workout/components/CustomDayForm.tsx`   | Form sequencial para modo personalizável com rename/delete |
| Navegação  | `src/navigation/AppNavigator.tsx`                    | Stack Navigator que expõe as rotas do fluxo                |

## Fluxo de telas

```
AddWorkoutPlan → AddWorkoutExercises → WorkoutDay (por dia)
```

## Funcionalidades do dialog de exercícios (WorkoutDayScreen)

- Séries e repetições fixas ou personalizadas (drop set com múltiplos blocos)
- Exercícios conjugados (dois exercícios vinculados visualmente)
- Descanso padrão global ou individual por exercício
- Observações opcionais
- Tags visuais: "drop set" (amarelo) e "conjugado" (roxo)

## Tabelas Supabase envolvidas

- `workout_plans` — receberá o plano criado (name, user_id, days_per_week)
- `workout_plan_exercises` — receberá os exercícios de cada divisão (a implementar)

> A integração com Supabase ainda não foi implementada. Os dados dos exercícios ficam apenas em state local.
