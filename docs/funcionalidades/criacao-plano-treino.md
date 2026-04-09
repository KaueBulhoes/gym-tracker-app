# Criação de Plano de Treino

**Status:** Em desenvolvimento
**Data:** 2026-04-09

## O que faz

Permite ao usuário criar um plano de treino escolhendo entre três modelos de divisão: letras (ABCDE), dias da semana (Seg–Dom) ou nomes personalizados. A tela guia a seleção/criação das divisões antes de persistir o plano.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Tela | `src/screens/Workout/AddWorkoutPlanScreen.tsx` | Radio buttons de tipo + painel dinâmico de seleção/criação |
| Componente | `src/screens/Workout/components/DayChipSelector.tsx` | Chips para modos ABCDE e Seg a Sex |
| Componente | `src/screens/Workout/components/CustomDayForm.tsx` | Form sequencial para modo personalizável com rename/delete |
| Navegação | `src/navigation/AppNavigator.tsx` | Stack Navigator que expõe a rota `AddWorkoutPlan` |

## Tabelas Supabase envolvidas

- `workout_plans` — receberá o plano criado (name, user_id, days_per_week)
- `workout_plan_exercises` — receberá os exercícios de cada divisão (a implementar)

> A integração com Supabase ainda não foi implementada. O botão "Criar Plano" existe mas ainda não persiste dados.
