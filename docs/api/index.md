# API e Services

Registro de todos os services e integração com Supabase.

## Services

| Service | Arquivo | Usada por | Tabelas |
|---------|---------|-----------|---------|
| [Supabase Client](supabase-client.md) | `src/services/supabase.ts` | RootNavigator, todos os services | Todas |
| [Auth Service](auth-service.md) | `src/services/authService.ts` | authStore, LoginScreen, RegisterScreen, SettingsScreen | auth.users |
| [Auth Store](auth-store.md) | `src/stores/authStore.ts` | LoginScreen, RegisterScreen, HomeScreen, RootNavigator | auth.users (via authService) |
| [Profile Store](profile-store.md) | `src/stores/profileStore.ts` | OnboardingScreen, HomeScreen, SettingsScreen, AppNavigator | — (mock in-memory) |
| [Workout Store](workout-store.md) | `src/stores/workoutStore.ts` | HomeScreen, AddWorkoutPlan, AddWorkoutExercises, WorkoutDay | — (mock in-memory) |

## Tabelas Supabase

Documentação detalhada de cada tabela em [docs/banco/](../banco/index.md).

| Tabela | Status | Service | Descrição |
|--------|--------|---------|-----------|
| [profiles](../banco/profiles.md) | A criar | profileService | Perfil do usuário (onboarding) |
| [workout_plans](../banco/workout-plans.md) | A criar | workoutService | Planos de treino |
| [workout_plan_days](../banco/workout-plan-days.md) | A criar | workoutService | Dias de cada plano |
| [workout_plan_exercises](../banco/workout-plan-exercises.md) | A criar | workoutService | Exercícios de cada dia |
| [exercise_rep_schemes](../banco/exercise-rep-schemes.md) | A criar | workoutService | Blocos de reps (drop sets) |
| [workout_sessions](../banco/workout-sessions.md) | A criar | workoutService | Sessões de treino finalizadas |
| [workout_session_weights](../banco/workout-session-weights.md) | A criar | workoutService | Cargas por exercício por sessão |
