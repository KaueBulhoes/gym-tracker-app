# Tela: Adicionar Exercícios ao Plano

**Arquivo:** `src/screens/Workout/AddWorkoutExercisesScreen/AddWorkoutExercisesScreen.tsx`
**Data:** 2026-04-11

## O que o usuário faz

Visualiza a lista de divisões (dias) do plano em criação. Cada card mostra a contagem de exercícios já adicionados. Toca em um dia para configurar exercícios. Ao final, salva o plano com o botão na parte inferior da lista.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.days` | Param | Array de nomes dos dias vindos da tela anterior |
| `useWorkoutStore.draft` | Store | Rascunho do plano com exercícios por dia |
| `useWorkoutStore.saveDraft` | Store | Salva o rascunho como plano definitivo |

## Componentes usados

- `DayCard` — card clicável representando cada dia do plano, com contagem de exercícios
- `DayIconContainer` — ícone de haltere dentro do card
- `SaveButton` — botão "Salvar" full-width no final da lista (desabilitado enquanto nenhum exercício existir)

## Navegação

- **Vem de:** [Adicionar Plano de Treino](add-workout-plan.md)
- **Vai para:** [Dia do Treino](workout-day.md) (ao tocar num dia) | [Home](home.md) (ao salvar)
