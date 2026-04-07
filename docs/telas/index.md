# Telas

Registro de todas as telas do app com descrição, navegação e integrações.

## Mapa de navegação

```
App
├── Auth (Stack)
│   ├── Login
│   └── Cadastro
├── Main (Bottom Tabs)
│   ├── Home
│   ├── Treinar
│   ├── Histórico
│   └── Perfil
└── Modais
    ├── Novo Treino
    ├── Timer de Descanso
    └── Detalhes do Exercício
```

## Telas implementadas

| Tela     | Arquivo                               | Services              | Tabelas              |
| -------- | ------------------------------------- | --------------------- | -------------------- |
| Login    | `src/screens/Auth/LoginScreen.tsx`    | authService (a impl.) | auth.users           |
| Cadastro | `src/screens/Auth/RegisterScreen.tsx` | authService (a impl.) | auth.users, profiles |
