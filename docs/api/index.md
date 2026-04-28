# API e Services

Registro de todos os services e integração com Supabase.

## Services

| Service | Arquivo | Usada por | Tabelas |
|---------|---------|-----------|---------|
| [Supabase Client](supabase-client.md) | `src/services/supabase.ts` | RootNavigator, todos os services | Todas |
| [Auth Service](auth-service.md) | `src/services/authService.ts` | authStore | auth.users |
| [Profile Service](profile-service.md) | `src/services/profileService.ts` | profileStore | profiles |
| [Workout Service](workout-service.md) | `src/services/workoutService.ts` | workoutStore | workout_plans, workout_plan_days, workout_plan_exercises, exercise_rep_schemes, workout_sessions, workout_session_weights, workout_session_feedback |
| [Case Mapper](case-mapper.md) | `src/utils/caseMapper.ts` | profileService, workoutService | — |

## Stores

| Store | Arquivo | Usada por | Persistência |
|-------|---------|-----------|--------------|
| [Auth Store](auth-store.md) | `src/stores/authStore.ts` | LoginScreen, RegisterScreen, HomeScreen, SettingsScreen | Supabase Auth |
| [Profile Store](profile-store.md) | `src/stores/profileStore.ts` | OnboardingScreen, HomeScreen, SettingsScreen, AppNavigator | Supabase (profiles) |
| [Workout Store](workout-store.md) | `src/stores/workoutStore.ts` | HomeScreen, WorkoutPlans, AddWorkoutPlan, AddWorkoutExercises, WorkoutDay, ActiveWorkout | Supabase (7 tabelas) |
| [Theme Store](theme-store.md) | `src/stores/themeStore.ts` | App.tsx, HomeScreen | AsyncStorage |

## Tabelas Supabase

Documentação detalhada de cada tabela em [docs/banco/](../banco/index.md).

| Tabela | Status | Service | Descrição |
|--------|--------|---------|-----------|
| [profiles](../banco/profiles.md) | Integrada | profileService | Perfil do usuário (onboarding) |
| [workout_plans](../banco/workout-plans.md) | Integrada | workoutService | Planos de treino |
| [workout_plan_days](../banco/workout-plan-days.md) | Integrada | workoutService | Dias de cada plano |
| [workout_plan_exercises](../banco/workout-plan-exercises.md) | Integrada | workoutService | Exercícios de cada dia |
| [exercise_rep_schemes](../banco/exercise-rep-schemes.md) | Integrada | workoutService | Blocos de reps (drop sets) |
| [workout_sessions](../banco/workout-sessions.md) | Integrada | workoutService | Sessões de treino finalizadas |
| [workout_session_weights](../banco/workout-session-weights.md) | Integrada | workoutService | Cargas por exercício por sessão |
| [workout_session_feedback](../banco/workout-session-feedback.md) | Integrada | workoutService | Feedback da sessão (intensidade, exercícios difíceis, comentário) |
