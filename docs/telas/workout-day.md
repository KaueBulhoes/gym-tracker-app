# Tela: Dia do Treino

**Arquivo:** `src/screens/Workout/WorkoutDayScreen.tsx`
**Data:** 2026-04-09

## O que o usuário faz

Configura os exercícios de um dia específico do plano de treino. Pode:

- Ativar descanso padrão entre exercícios (com tempo em segundos)
- Adicionar exercícios via dialog modal com nome, séries, repetições e observações
- Alternar entre repetições fixas e personalizadas (drop set) com múltiplos blocos séries/reps
- Marcar exercícios como conjugados (dois exercícios vinculados)
- Definir descanso individual por exercício (quando descanso padrão está desativado)
- Remover exercícios da lista

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.day` | Param | Nome do dia (ex: "A", "Segunda") |
| `exercises` | State local | Lista de exercícios adicionados (não persiste ainda) |
| — | — | Sem integração com Supabase ainda |

## Componentes usados

- `ToggleSection` — seção de descanso padrão com Switch e input de segundos
- `ExerciseCard` — card de exercício com nome, meta (séries x reps), tags e notas
- `ConjugatedRail/Dot/Connector` — conector visual dashed entre exercícios conjugados
- `ExerciseTag` — badges "drop set" (amarelo) e "conjugado" (roxo)
- Dialog modal — form completo para adicionar exercício ou conjugado

## Navegação

- **Vem de:** [Adicionar Exercícios](add-workout-exercises.md)
- **Vai para:** — (volta para a tela anterior)
