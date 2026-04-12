# API e Services

Registro de todos os services e integração com Supabase.

## Services

| Service | Arquivo | Usada por | Tabelas |
|---------|---------|-----------|---------|
| [Supabase Client](supabase-client.md) | `src/services/supabase.ts` | RootNavigator, todos os services | Todas |
| [Auth Service](auth-service.md) | `src/services/authService.ts` | authStore, LoginScreen, RegisterScreen | auth.users |
| [Workout Store](workout-store.md) | `src/stores/workoutStore.ts` | HomeScreen, AddWorkoutPlan, AddWorkoutExercises, WorkoutDay | — (mock in-memory) |

## Tabelas Supabase

| Tabela                 | RLS | Usada por (services) | Descrição                          |
| ---------------------- | --- | -------------------- | ---------------------------------- |
| profiles               | -   | -                    | Perfil do usuário                  |
| exercises              | -   | -                    | Catálogo de exercícios             |
| workout_plans          | -   | -                    | Planos de treino                   |
| workout_plan_exercises | -   | -                    | Exercícios dentro de um plano      |
| workouts               | -   | -                    | Treinos realizados                 |
| workout_sets           | -   | -                    | Séries de cada exercício no treino |
