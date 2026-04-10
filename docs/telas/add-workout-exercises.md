# Tela: Adicionar Exercícios ao Plano

**Arquivo:** `src/screens/Workout/AddWorkoutExercisesScreen.tsx`
**Data:** 2026-04-09

## O que o usuário faz

Visualiza a lista de divisões (dias) do plano recém-criado e toca em cada dia para configurar os exercícios daquele dia. Pode salvar o plano ao finalizar.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `route.params.days` | Param | Array de nomes dos dias vindos da tela anterior |
| — | — | Sem integração com Supabase ainda |

## Componentes usados

- `DayCard` — card clicável representando cada dia do plano
- `DayIconContainer` — ícone de haltere dentro do card
- `SaveButton` — botão "Salvar" no header

## Navegação

- **Vem de:** [Adicionar Plano de Treino](add-workout-plan.md)
- **Vai para:** [Dia do Treino](workout-day.md) (ao tocar num dia) | [Home](home.md) (ao salvar)
