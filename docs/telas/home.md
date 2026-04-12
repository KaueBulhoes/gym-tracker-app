# Tela: Home

**Arquivo:** `src/screens/Home/HomeScreen/HomeScreen.tsx`
**Data:** 2026-04-11

## O que o usuário faz

Tela principal do app após login. Vê métricas do seu treino e lista dos treinos cadastrados. A seção "Próximo Treino" só aparece após o usuário pressionar "Começar Treino" pela primeira vez.

## Seções

1. **Header** — Boas-vindas com nome do usuário, botão de perfil/logout
2. **Meta Semanal** — Card roxo com progresso X/Y, barra de progresso e texto motivacional
3. **Métricas** — 2 cards: último treino (nome do dia ou "-") e total de treinos no mês
4. **Começar Treino** — Card destacado visível quando há planos salvos mas nenhum treino iniciado. Botão ativa `lastCompleted` no store
5. **Próximo Treino** — Card destacado com badge "Próximo", aparece somente após o usuário ter iniciado. Mostra o próximo dia na rotação
6. **Meus Treinos** — Accordion (inicia fechado) com todos os dias de todos os planos salvos. Cada dia é expandível mostrando exercícios com séries/reps. O próximo dia tem borda e badge amarelos

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signOut` | Store | Logout via botão de perfil |
| `useWorkoutStore.plans` | Store | Planos de treino salvos |
| `useWorkoutStore.lastCompleted` | Store | Último dia marcado como feito |
| `useWorkoutStore.startLastWorkout` | Store | Ativa o primeiro dia do último plano |
| `mockUser` | Mock | Nome do usuário |
| `mockWeeklyGoal` | Mock | Meta semanal (target/completed) |
| `mockMonthlyTotal` | Mock | Total de treinos no mês |

## Componentes usados

- `Card` — variantes purple (meta) e highlighted (próximo treino / começar)
- `ProgressBar` — barra de progresso da meta semanal
- `Button` — "Começar Treino"
- `MaterialCommunityIcons` — ícones (target, dumbbell, chevron, account)

## Navegação

- **Vem de:** RootNavigator (quando há sessão ativa)
- **Vai para:** [Adicionar Plano de Treino](add-workout-plan.md) (FAB +) | LoginScreen (logout)
