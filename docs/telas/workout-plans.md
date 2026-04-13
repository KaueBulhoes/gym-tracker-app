# Tela: Planos de Treino

**Arquivo:** `src/screens/Workout/WorkoutPlansScreen/WorkoutPlansScreen.tsx`
**Data:** 2026-04-13

## O que o usuário faz

Visualiza todas as fichas de treino criadas, seleciona qual ficha deve ser a ativa (exibida na Home) e pode criar novas fichas.

- **Modo normal (switch desligado):** Clicar em uma ficha abre modal com detalhes (treinos + exercícios). Se a ficha não está ativa, botão "Ativar ficha" no final do modal.
- **Modo seleção (switch ligado):** Clicar em uma ficha a torna ativa diretamente.
- Ficha ativa exibida com borda amarela e badge "Ficha ativa".
- Fichas inativas mostram data de criação e finalização.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useWorkoutStore.plans` | Store | Lista de todos os planos |
| `useWorkoutStore.setActivePlan` | Store | Ativa uma ficha e desativa a anterior |
| `isoTimestampToBr` | Util | Formata datas ISO para DD/MM/YYYY |

## Componentes usados

- `Button` — criar novo plano, ativar ficha no modal
- `Switch` — alternar modo de seleção

## Navegação

- **Vem de:** HomeScreen (botão "Planos" no bottom bar)
- **Vai para:** AddWorkoutPlanScreen (botão "Criar novo plano")
