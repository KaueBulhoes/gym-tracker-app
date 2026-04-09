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
    └── AddWorkoutPlan
```

## Telas implementadas

| Tela | Arquivo | Services/Stores | Tabelas |
|------|---------|-----------------|---------|
| [Login](login.md) | `src/screens/Auth/LoginScreen.tsx` | authStore.signIn | auth.users |
| [Cadastro](cadastro.md) | `src/screens/Auth/RegisterScreen.tsx` | authStore.signUp | auth.users |
| [Home](home.md) | `src/screens/Home/HomeScreen.tsx` | authStore.signOut, mocks | — (mock por enquanto) |
| [Adicionar Plano de Treino](add-workout-plan.md) | `src/screens/Workout/AddWorkoutPlanScreen.tsx` | — (a integrar) | workout_plans (a integrar) |
