# Telas

Registro de todas as telas do app com descrição, navegação e integrações.

## Mapa de navegação

```
App
├── Auth (Stack)
│   ├── Login
│   ├── Cadastro
│   ├── Recuperar senha
│   └── Redefinir senha
└── App (Stack)
    ├── Onboarding (rota inicial se perfil incompleto) → Home
    ├── Home
    │   ├── BottomBar (Planos) → WorkoutPlans
    │   ├── BottomBar (Começar) → ActiveWorkout
    │   ├── BottomBar (Estatísticas) → Statistics
    │   └── Menu perfil → Settings
    ├── Settings
    ├── WorkoutPlans → AddWorkoutPlan (criar novo)
    ├── AddWorkoutPlan → AddWorkoutExercises
    ├── AddWorkoutExercises → WorkoutDay
    ├── WorkoutDay
    ├── ActiveWorkout → WorkoutFeedback (ao finalizar)
    ├── WorkoutFeedback → Home (após salvar feedback)
    └── Statistics
```

## Telas implementadas

| Tela | Arquivo | Services/Stores | Tabelas |
|------|---------|-----------------|---------|
| [Login](login.md) | `src/screens/Auth/LoginScreen/` | authStore.signIn | auth.users |
| [Cadastro](cadastro.md) | `src/screens/Auth/RegisterScreen/` | authStore.signUp | auth.users |
| [Recuperar senha](recuperar-senha.md) | `src/screens/Auth/RecoverPasswordScreen/` | authStore.resetPassword | auth.users |
| [Redefinir senha](redefinir-senha.md) | `src/screens/Auth/ResetPasswordScreen/` | authStore.updatePassword | auth.users |
| [Home](home.md) | `src/screens/Home/HomeScreen/` | authStore, profileStore, workoutStore | profiles, workout_plans, workout_sessions |
| [Planos de Treino](workout-plans.md) | `src/screens/Workout/WorkoutPlansScreen/` | workoutStore.setActivePlan | workout_plans |
| [Adicionar Plano](add-workout-plan.md) | `src/screens/Workout/AddWorkoutPlanScreen/` | workoutStore.startDraft | — |
| [Adicionar Exercícios](add-workout-exercises.md) | `src/screens/Workout/AddWorkoutExercisesScreen/` | workoutStore.saveDraft | workout_plans, workout_plan_days, workout_plan_exercises |
| [Dia do Treino](workout-day.md) | `src/screens/Workout/WorkoutDayScreen/` | workoutStore.updateDraftDay | — |
| [Treino Ativo](active-workout.md) | `src/screens/Workout/ActiveWorkoutScreen/` | workoutStore.pauseActiveWorkout | workout_sessions, workout_session_weights |
| [Feedback do Treino](workout-feedback.md) | `src/screens/Workout/WorkoutFeedbackScreen/` | workoutStore.finishWorkout | workout_sessions, workout_session_weights, workout_session_feedback |
| [Onboarding](onboarding.md) | `src/screens/Onboarding/OnboardingScreen/` | profileStore.saveProfile | profiles |
| [Configurações](settings.md) | `src/screens/Settings/SettingsScreen/` | profileStore, authStore | profiles, auth.users |
| [Estatísticas](statistics.md) | `src/screens/Statistics/StatisticsScreen/` | workoutStore, profileStore, useHomeStats | — (client-side) |
