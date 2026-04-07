# API e Services

Registro de todos os services e integração com Supabase.

## Services

| Service         | Arquivo                    | Usada por                        | Tabelas |
| --------------- | -------------------------- | -------------------------------- | ------- |
| Supabase Client | `src/services/supabase.ts` | RootNavigator, todos os services | Todas   |

## Tabelas Supabase

| Tabela                 | RLS | Usada por (services) | Descrição                          |
| ---------------------- | --- | -------------------- | ---------------------------------- |
| profiles               | -   | -                    | Perfil do usuário                  |
| exercises              | -   | -                    | Catálogo de exercícios             |
| workout_plans          | -   | -                    | Planos de treino                   |
| workout_plan_exercises | -   | -                    | Exercícios dentro de um plano      |
| workouts               | -   | -                    | Treinos realizados                 |
| workout_sets           | -   | -                    | Séries de cada exercício no treino |
