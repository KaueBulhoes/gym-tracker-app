# Estatísticas de Treino

**Status:** Implementada
**Data:** 2026-04-13

## O que faz

Tela dedicada com métricas e estatísticas calculadas a partir do histórico de treinos. O usuário pode selecionar até 3 estatísticas para exibir como cards na HomeScreen.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Tela | `src/screens/Statistics/StatisticsScreen/` | Cálculos e exibição de 7 blocos de métricas (inclui Evolução de Carga) |
| Hook | `src/hooks/useHomeStats.ts` | Store Zustand + AsyncStorage para preferências de stats na Home |
| Hook | `src/hooks/useWorkloadChartPrefs.ts` | Store Zustand + AsyncStorage para preferências do gráfico de evolução de carga |
| Componente | `src/components/WorkloadEvolutionCard/` | Card do bloco "Evolução de Carga" com sparkline + abre modal full-screen |
| Tela | `src/screens/Home/HomeScreen/` | Exibe os cards selecionados no MetricsRow |

Detalhes do gráfico em [grafico-evolucao-carga.md](grafico-evolucao-carga.md).

## Tabelas Supabase envolvidas

- Nenhuma diretamente — tudo é computado client-side a partir de `sessions` já carregadas no store

## Persistência local

- `@gym_tracker/home_stats` (AsyncStorage) — array de até 3 `HomeStatKey` selecionadas
- Padrão inicial: `lastWorkout`, `monthlyTotal`, `avgDuration`
- `@gym_tracker/workload_chart` (AsyncStorage) — exercício e período selecionados no gráfico de Evolução de Carga (default `__all__` / `30`)
