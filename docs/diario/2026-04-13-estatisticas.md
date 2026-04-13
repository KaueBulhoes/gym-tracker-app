# 2026-04-13 (Estatísticas) — Tela de estatísticas e métricas na Home

## Resumo

Implementação da tela de Estatísticas com 6 blocos de métricas e seleção de até 3 stats para exibir na HomeScreen.

## O que foi feito

### Nova tela
- `StatisticsScreen` — métricas: resumo geral, desempenho semanal, sessões, recordes pessoais, progressão de carga, curiosidades

### Novo hook
- `useHomeStats` — store Zustand + AsyncStorage para persistir seleção de stats da Home

### Telas modificadas
- `HomeScreen` — MetricsRow dinâmico baseado nas stats selecionadas (0 a 3), botão Estatísticas conectado

### Navegação
- Rota `Statistics` adicionada ao AppStackParamList e AppNavigator

## Documentação
- [StatisticsScreen](../telas/statistics.md) — nova
- [Estatísticas de Treino](../funcionalidades/estatisticas.md) — nova
- [Telas index](../telas/index.md) — atualizado
- [Funcionalidades index](../funcionalidades/index.md) — atualizado
