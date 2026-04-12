# Telas

Registro de todas as telas do app com descrição, navegação e integrações.

## Mapa de navegação

```
App
├── Auth (Stack)
│   ├── Login
│   └── Cadastro
└── App (Stack)
    ├── Home
    │   └── FAB (+) → AddWorkoutPlan
    ├── AddWorkoutPlan → AddWorkoutExercises
    ├── AddWorkoutExercises → WorkoutDay
    └── WorkoutDay
```

## Telas implementadas

| Tela                                                       | Arquivo                                              | Services/Stores          | Tabelas                    |
| ---------------------------------------------------------- | ---------------------------------------------------- | ------------------------ | -------------------------- |
| [Login](login.md)                                          | `src/screens/Auth/LoginScreen.tsx`                   | authStore.signIn         | auth.users                 |
| [Cadastro](cadastro.md)                                    | `src/screens/Auth/RegisterScreen.tsx`                | authStore.signUp         | auth.users                 |
| [Home](home.md)                                            | `src/screens/Home/HomeScreen.tsx`                    | authStore, workoutStore   | — (mock in-memory)         |
| [Adicionar Plano de Treino](add-workout-plan.md)           | `src/screens/Workout/AddWorkoutPlanScreen.tsx`       | workoutStore.startDraft   | — (mock in-memory)         |
| [Adicionar Exercícios](add-workout-exercises.md)           | `src/screens/Workout/AddWorkoutExercisesScreen.tsx`  | workoutStore.saveDraft    | — (mock in-memory)         |
| [Dia do Treino](workout-day.md)                            | `src/screens/Workout/WorkoutDayScreen.tsx`           | workoutStore.updateDraftDay | — (mock in-memory)       |
