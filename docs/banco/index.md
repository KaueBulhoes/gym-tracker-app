# Banco de Dados (Supabase)

Mapeamento de todas as tabelas do projeto, seus relacionamentos e integração com o código.

## Mapa de relacionamentos

```
auth.users
├── profiles (1:1)
├── workout_plans (1:N)
│   └── workout_plan_days (1:N)
│       └── workout_plan_exercises (1:N)
│           └── exercise_rep_schemes (1:N) — para drop sets
└── workout_sessions (1:N)
    ├── workout_session_weights (1:N)
    └── workout_session_feedback (1:1)
```

## Tabelas

| Tabela | Descrição | Status | Service | Doc |
|--------|-----------|--------|---------|-----|
| [profiles](profiles.md) | Perfil do usuário (onboarding) | A criar | profileService (a criar) | [onboarding](../funcionalidades/onboarding.md) |
| [workout_plans](workout-plans.md) | Planos de treino | A criar | workoutService (a criar) | [criação de plano](../funcionalidades/criacao-plano-treino.md) |
| [workout_plan_days](workout-plan-days.md) | Dias de cada plano (A, B, C...) | A criar | workoutService (a criar) | — |
| [workout_plan_exercises](workout-plan-exercises.md) | Exercícios de cada dia | A criar | workoutService (a criar) | — |
| [exercise_rep_schemes](exercise-rep-schemes.md) | Blocos de séries/reps (drop sets) | A criar | workoutService (a criar) | — |
| [workout_sessions](workout-sessions.md) | Sessões de treino finalizadas | A criar | workoutService (a criar) | [sessão de treino](../funcionalidades/sessao-treino.md) |
| [workout_session_weights](workout-session-weights.md) | Cargas por exercício por sessão | A criar | workoutService (a criar) | — |
| [workout_session_feedback](workout-session-feedback.md) | Feedback da sessão (intensidade, exercícios difíceis, comentário) | Integrada | workoutService | [feedback de treino](../funcionalidades/feedback-treino.md) |

## RLS (Row Level Security)

Todas as tabelas devem ter RLS habilitado com política:
- `SELECT`: `auth.uid() = user_id`
- `INSERT`: `auth.uid() = user_id`
- `UPDATE`: `auth.uid() = user_id`
- `DELETE`: `auth.uid() = user_id`

Para tabelas sem `user_id` direto (workout_plan_days, workout_plan_exercises, etc.), o RLS deve ser via JOIN com a tabela pai até chegar em `user_id`.
