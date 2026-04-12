# Telas

Registro de todas as telas do app com descrição, navegação e integrações.

## Mapa de navegação

```
App
├── Auth (Stack)
│   ├── Login
│   └── Cadastro
└── App (Stack)
    ├── Onboarding (rota inicial se perfil incompleto) → Home
    ├── Home → Settings (menu perfil)
    ├── Settings
    │   ├── BottomBar (+) → AddWorkoutPlan
    │   └── BottomBar/Accordion (Começar) → ActiveWorkout
    ├── AddWorkoutPlan → AddWorkoutExercises
    ├── AddWorkoutExercises → WorkoutDay
    ├── WorkoutDay
    └── ActiveWorkout → Home (ao finalizar)
```

## Telas implementadas

| Tela                                                       | Arquivo                                              | Services/Stores          | Tabelas                    |
| ---------------------------------------------------------- | ---------------------------------------------------- | ------------------------ | -------------------------- |
| [Login](login.md)                                          | `src/screens/Auth/LoginScreen/LoginScreen.tsx`                   | authStore.signIn         | auth.users                 |
| [Cadastro](cadastro.md)                                    | `src/screens/Auth/RegisterScreen/RegisterScreen.tsx`                | authStore.signUp         | auth.users                 |
| [Home](home.md)                                            | `src/screens/Home/HomeScreen/HomeScreen.tsx`                    | authStore, workoutStore   | — (mock in-memory)         |
| [Adicionar Plano de Treino](add-workout-plan.md)           | `src/screens/Workout/AddWorkoutPlanScreen/AddWorkoutPlanScreen.tsx`       | workoutStore.startDraft   | — (mock in-memory)         |
| [Adicionar Exercícios](add-workout-exercises.md)           | `src/screens/Workout/AddWorkoutExercisesScreen/AddWorkoutExercisesScreen.tsx`  | workoutStore.saveDraft    | — (mock in-memory)         |
| [Dia do Treino](workout-day.md)                            | `src/screens/Workout/WorkoutDayScreen/WorkoutDayScreen.tsx`           | workoutStore.updateDraftDay | — (mock in-memory)       |
| [Treino Ativo](active-workout.md)                          | `src/screens/Workout/ActiveWorkoutScreen/ActiveWorkoutScreen.tsx`        | workoutStore.finishWorkout  | — (mock in-memory)       |
| [Onboarding](onboarding.md)                                | `src/screens/Onboarding/OnboardingScreen/OnboardingScreen.tsx`          | profileStore.saveProfile    | — (mock in-memory)       |
| [Configurações](settings.md)                               | `src/screens/Settings/SettingsScreen/SettingsScreen.tsx`                | profileStore, authStore     | — (mock in-memory)       |
