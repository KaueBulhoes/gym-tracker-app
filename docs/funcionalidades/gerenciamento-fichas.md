# Gerenciamento de Fichas de Treino

**Status:** Implementada
**Data:** 2026-04-13

## O que faz

Permite ao usuário gerenciar múltiplas fichas de treino. Cada ficha pode ser ativada/desativada, tem nome automático ou personalizado, duração configurável com alerta de vencimento, descrição por dia de treino e edição de exercícios já adicionados (incluindo nome e carga em kg).

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Tela | `src/screens/Workout/WorkoutPlansScreen/` | Lista de fichas, seleção de ativa, modal de detalhes |
| Tela | `src/screens/Workout/AddWorkoutPlanScreen/` | Nome do plano (auto ou custom) |
| Tela | `src/screens/Workout/AddWorkoutExercisesScreen/` | Duração da ficha em dias |
| Tela | `src/screens/Workout/WorkoutDayScreen/` | Descrição por dia, edição/exclusão de exercício e carga por exercício |
| Tela | `src/screens/Home/HomeScreen/` | Filtro por plano ativo, alerta vencimento, descrição nos dias |
| Service | `src/services/workoutService.ts` | setActivePlan, renewPlan, dismissExpiry |
| Store | `src/stores/workoutStore.ts` | setActivePlan, renewPlan, dismissExpiry, updateDraftDuration |

## Tabelas Supabase envolvidas

- `workout_plans` — name, is_active, finished_at, duration_days, expires_at, expiry_dismissed
- `workout_plan_days` — description

## Fluxos

1. **Criar ficha:** AddWorkoutPlan (nome) → AddWorkoutExercises (duração) → WorkoutDay (descrição + exercícios) → salvar → nova ficha ativa, anterior desativada
2. **Editar exercício da ficha:** WorkoutPlans → Editar → WorkoutDay → botão lápis no exercício → ajustar nome/carga/séries/reps/descanso → salvar alterações
3. **Trocar ficha ativa:** WorkoutPlans → switch ligado → clicar na ficha desejada
4. **Ver detalhes:** WorkoutPlans → clicar na ficha → modal com treinos e exercícios → opção de ativar
5. **Vencimento:** Home detecta ficha vencida → alerta "Sua ficha venceu" → modal para renovar ou dispensar
