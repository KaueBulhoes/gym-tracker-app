# Tela: Dia do Treino

**Arquivo:** `src/screens/Workout/WorkoutDayScreen/WorkoutDayScreen.tsx`
**Data:** 2026-04-28

## O que o usuário faz

Configura os exercícios de um dia específico do plano de treino. Todas as alterações são salvas automaticamente no rascunho do plano (store). Pode:

- Ativar descanso padrão entre exercícios (com tempo em segundos)
- Adicionar exercícios via dialog modal com nome, séries, repetições e observações
- Alternar entre repetições fixas e personalizadas (drop set) com múltiplos blocos séries/reps
- Marcar exercícios como conjugados (dois exercícios vinculados)
- Definir descanso individual por exercício (quando descanso padrão está desativado)
- Editar exercício existente por botão dedicado no card (ícone de lápis)
- Editar carga (kg) por exercício dentro do modal
- Remover exercícios da lista

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.day` | Param | Nome do dia (ex: "Treino A", "Segunda") |
| `useWorkoutStore.draft` | Store | Lê exercícios e descanso padrão do dia |
| `useWorkoutStore.updateDraftDay` | Store | Persiste alterações no rascunho |

## Componentes usados

- `ToggleSection` — seção de descanso padrão com Switch e input de segundos
- `ExerciseCard` — card de exercício com nome, meta (séries x reps + carga), tags e notas
- Ações do card — botões de editar (lápis) e excluir (lixeira vermelha)
- `ConjugatedRail/HookTop/HookBottom` — conector visual bracket entre exercícios conjugados
- `ExerciseTag` — badges "drop set" (amarelo) e "conjugado" (roxo)
- Dialog modal — form completo para adicionar exercício ou conjugado

## Navegação

- **Vem de:** [Adicionar Exercícios](add-workout-exercises.md)
- **Vai para:** — (volta para a tela anterior, dados persistem no store)
