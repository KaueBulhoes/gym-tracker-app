# Tela: Estatísticas

**Arquivo:** `src/screens/Statistics/StatisticsScreen/StatisticsScreen.tsx`
**Data:** 2026-04-13

## O que o usuário faz

Visualiza métricas e estatísticas do seu histórico de treinos, organizadas em 6 blocos: Resumo Geral, Desempenho Semanal, Sessões, Recordes Pessoais, Progressão de Carga e Curiosidades.

Pode ativar o switch "Exibir na Home" para selecionar até 3 estatísticas que aparecerão como cards na HomeScreen. Stats selecionadas ficam com borda amarela e badge "home".

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useWorkoutStore.sessions` | Store | Todas as sessões de treino para cálculos |
| `useWorkoutStore.lastCompleted` | Store | Último treino completado |
| `useProfileStore.profile.weeklyGoal` | Store | Meta semanal para cálculo de streak |
| `useHomeStats` | Hook/Store | Seleção de stats para a Home (AsyncStorage) |

## Métricas calculadas

- Resumo: treinos no mês/ano/total, tempo total, último treino
- Semanal: sequência de semanas (streak), média por semana
- Sessões: duração média, mais longo, mais curto
- Recordes: top 5 exercícios por carga máxima
- Progressão: primeira vs última carga por exercício com %
- Curiosidades: exercício mais treinado, dia favorito, melhor mês

## Navegação

- **Vem de:** HomeScreen (botão "Estatísticas" no bottom bar)
- **Vai para:** — (tela final)
