# Gráfico de Evolução de Carga

**Status:** Implementada
**Data:** 2026-04-27

## O que faz

Na tela de Estatísticas, o bloco "Evolução de Carga" exibe um card quadrado com um sparkline da evolução do peso máximo por exercício no período selecionado. Ao tocar no card, abre-se um modal em modo paisagem (rotação de 90° via `transform`) com o gráfico XY em tela cheia.

No modal, o usuário pode:

- Selecionar o exercício mostrado (dropdown no canto superior esquerdo). Default: **Todos os exercícios** — cada exercício vira uma linha colorida no gráfico, com legenda abaixo.
- Selecionar o período em dias (dropdown ao lado do exercício): **30 / 60 / 90 dias**. Default: **30 dias**.

A seleção é persistida localmente no AsyncStorage e reaplicada na próxima abertura.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Componente | `src/components/WorkloadEvolutionCard/` | Card clicável na tela Estatísticas com mini sparkline |
| Componente | `src/components/WorkloadEvolutionModal/` | Modal em paisagem com dropdowns inline e gráfico full |
| Componente | `src/components/WorkloadChart/` | Renderização SVG do gráfico (variantes `preview` e `full`) |
| Utilitário | `src/utils/workloadEvolution.ts` | Agregação de séries (max kg por exercício/dia) e listagem de exercícios |
| Hook | `src/hooks/useWorkloadChartPrefs.ts` | Store Zustand + AsyncStorage para exercício e período selecionados |
| Tela | `src/screens/Statistics/StatisticsScreen/` | Carrega prefs no mount e renderiza o card no bloco "Evolução de Carga" |

## Eixos do gráfico

- **X (tempo):** dias dentro da janela selecionada. Rótulos em formato `-29d`, `-22d`, ..., `hoje`.
- **Y (carga):** peso máximo da sessão (kg). Escala automática até um valor "redondo" próximo do máximo observado.

Cada ponto representa uma sessão; a linha conecta cronologicamente. Sessões sem peso > 0 são ignoradas.

## Modo paisagem sem libs nativas

O modal evita instalar `react-native-orientation-locker` (que exige config nativa). Em vez disso, o conteúdo é renderizado dentro de um container com `transform: rotate(90deg)` e `width/height` trocados (`window.height x window.width`). Os dropdowns são **inline** (sem `Modal` aninhado), então as listas de opções abrem dentro do mesmo plano rotacionado.

## Tabelas Supabase envolvidas

- Nenhuma diretamente — agregação é feita client-side a partir de `useWorkoutStore.sessions`.

## Persistência local

- `@gym_tracker/workload_chart` (AsyncStorage) — `{ exercise: string | '__all__', days: 30 | 60 | 90 }`
- Padrão inicial: `exercise = '__all__'`, `days = 30`.

## Bibliotecas

- [`react-native-svg`](https://github.com/software-mansion/react-native-svg) — primitivas SVG (`Svg`, `Path`, `Line`, `Circle`, `Text`, `G`) usadas para desenhar eixos, linhas, pontos e legenda. Sem outra lib de chart.
