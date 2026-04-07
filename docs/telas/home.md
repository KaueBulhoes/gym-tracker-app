# Tela: Home

**Arquivo:** `src/screens/Home/HomeScreen.tsx`
**Data:** 2026-04-07

## O que o usuário faz

Tela principal do app após login. Vê métricas do seu treino, próximo treino sugerido e lista completa dos treinos cadastrados.

## Seções

1. **Header** — Boas-vindas com nome do usuário, botão de perfil/logout
2. **Meta Semanal** — Card roxo com progresso X/Y, barra de progresso e texto motivacional
3. **Métricas** — 2 cards: último treino (tipo + data) e total de treinos no mês
4. **Próximo Treino** — Card destacado com borda amarela, badge "Próximo", botão "Começar Treino"
5. **Meus Treinos** — Accordion (inicia fechado) com lista completa dos treinos. Cada treino é expandível mostrando duração e botão "Iniciar Treino". O próximo treino é destacado com borda amarela e badge

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signOut` | Store | Logout via botão de perfil |
| `mockUser` | Mock | Nome do usuário |
| `mockWeeklyGoal` | Mock | Meta semanal (target/completed) |
| `mockLastWorkout` | Mock | Último treino realizado |
| `mockNextWorkout` | Mock | Próximo treino na sequência |
| `mockWorkoutPlan` | Mock | Lista completa de treinos |
| `mockMonthlyTotal` | Mock | Total de treinos no mês |

## Componentes usados

- `Card` — variantes default, purple (meta), highlighted (próximo treino)
- `ProgressBar` — barra de progresso da meta semanal
- `Button` — "Começar Treino", "Ver Detalhes", "Iniciar Treino"
- `MaterialCommunityIcons` — ícones (target, calendar, dumbbell, chevron)

## Navegação

- **Vem de:** RootNavigator (quando há sessão ativa)
- **Vai para:** LoginScreen (após logout)
