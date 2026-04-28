# Persistência Local

**Status:** Implementada
**Data:** 2026-04-27

## O que faz

O app usa persistência local no dispositivo para manter sessão de autenticação, estado de treino em andamento e preferências do usuário entre reinicializações do aplicativo.

## Composição

| Camada  | Arquivo                      | Descrição                                                                                                    |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Service | `src/services/supabase.ts`   | Configura `auth.storage` com AsyncStorage e `persistSession: true` para manter sessão/token do Supabase Auth |
| Store   | `src/stores/workoutStore.ts` | Persiste treino ativo (`@gymtracker:active-workout`) para recuperar sessão em andamento                      |
| Store   | `src/stores/themeStore.ts`   | Persiste modo de tema (`@gymtracker:theme-mode`)                                                             |
| Hook    | `src/hooks/useHomeStats.ts`  | Persiste seleção de cards de estatísticas da Home (`@gym_tracker/home_stats`)                                |
| Hook    | `src/hooks/useWorkloadChartPrefs.ts` | Persiste exercício e período do gráfico de Evolução de Carga (`@gym_tracker/workload_chart`)         |

## Chaves locais utilizadas

- `@gymtracker:active-workout` — estado do treino ativo (tempo, séries concluídas e cargas)
- `@gymtracker:theme-mode` — preferência de tema (`dark` ou `light`)
- `@gym_tracker/home_stats` — cards de métricas escolhidos na Home
- `@gym_tracker/workload_chart` — exercício e período (30/60/90d) do gráfico de Evolução de Carga

## Comportamento

1. **Startup:** stores/hooks hidratam estado local salvo em AsyncStorage.
2. **Durante uso:** alterações relevantes atualizam o estado local imediatamente (ou de forma periódica no treino ativo).
3. **Sign out/reset:** estados locais relacionados são limpos quando aplicável.

## Limites

- Não substitui persistência de dados de negócio no Supabase.
- Focado em continuidade de UX (sessão, preferências e fluxo de treino em andamento).
