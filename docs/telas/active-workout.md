# Tela: Treino Ativo

**Arquivo:** `src/screens/Workout/ActiveWorkoutScreen/ActiveWorkoutScreen.tsx`
**Data:** 2026-04-11

## O que o usuário faz

Executa um treino em tempo real. Vê o cronômetro total do treino (hh:mm:ss) no topo, o nome do dia e a contagem de exercícios. Cada exercício é um accordion que expande para mostrar as séries discriminadas com carga. O usuário pode:

- Expandir um exercício para ver cada série (ex: "Série 1 x 12 — 10 kg")
- Marcar séries individuais como concluídas via checkbox (inicia o timer de descanso automaticamente)
- Marcar o exercício inteiro como concluído via checkbox no header (marca todas as séries)
- Registrar a carga (botão "Carga" com modal, toggle para cargas diferentes por série)
- Finalizar o treino, salvando duração e cargas no store

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.planId` | Param | ID do plano de treino |
| `route.params.dayName` | Param | Nome do dia (ex: "Treino A") |
| `useWorkoutStore.plans` | Store | Lê exercícios do dia a partir do plano salvo |
| `useWorkoutStore.finishWorkout` | Store | Salva a sessão com duração e cargas |

## Componentes usados

- `ExerciseAccordion` — card accordion com checkbox, nome, séries/reps, botão carga e chevron
- `Checkbox` — checkbox do exercício (marca/desmarca todas as séries)
- `SetRow` / `SetCheckbox` — linha de série individual com checkbox, reps e carga
- `WeightButton` — botão com ícone de peso e label "Carga"
- `RestModal` — modal com contagem regressiva mm:ss e botão "Pular"
- `WeightModal` — modal de carga com toggle cargas diferentes, inputs por série, botão "Salvar"
- `FinishButton` — botão vermelho fixo no rodapé para finalizar treino

## Navegação

- **Vem de:** [Home](home.md) (botão "Começar" no rodapé ou dentro do accordion)
- **Vai para:** [Home](home.md) (ao finalizar treino)
