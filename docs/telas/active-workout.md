# Tela: Treino Ativo

**Arquivo:** `src/screens/Workout/ActiveWorkoutScreen.tsx`
**Data:** 2026-04-11

## O que o usuário faz

Executa um treino em tempo real. Vê o cronômetro total do treino (hh:mm:ss) no topo, o nome do dia e a contagem de exercícios. Para cada exercício pode:

- Iniciar o timer de descanso (modal com contagem regressiva mm:ss que fecha automaticamente)
- Registrar a carga (modal com input de peso, com toggle para cargas diferentes por série)
- Finalizar o treino, salvando duração e cargas no store

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.planId` | Param | ID do plano de treino |
| `route.params.dayName` | Param | Nome do dia (ex: "Treino A") |
| `useWorkoutStore.plans` | Store | Lê exercícios do dia a partir do plano salvo |
| `useWorkoutStore.finishWorkout` | Store | Salva a sessão com duração e cargas |

## Componentes usados

- `ExerciseCard` — card com nome, séries/reps, badge de carga e botões de ação
- `ActionButton` — botões circulares para carga (peso) e descanso (timer)
- `RestModal` — modal com contagem regressiva mm:ss e botão "Pular"
- `WeightModal` — modal de carga com toggle cargas diferentes, inputs por série, botão "Salvar"
- `FinishButton` — botão vermelho fixo no rodapé para finalizar treino

## Navegação

- **Vem de:** [Home](home.md) (botão "Começar" no rodapé ou dentro do accordion)
- **Vai para:** [Home](home.md) (ao finalizar treino)
