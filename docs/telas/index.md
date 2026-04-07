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

| Tela | Arquivo | Services/Stores | Tabelas |
|------|---------|-----------------|---------|
| [Login](login.md) | `src/screens/Auth/LoginScreen.tsx` | authStore.signIn | auth.users |
| [Cadastro](cadastro.md) | `src/screens/Auth/RegisterScreen.tsx` | authStore.signUp | auth.users |
| [Home](home.md) | `src/screens/Home/HomeScreen.tsx` | authStore.signOut | — |
