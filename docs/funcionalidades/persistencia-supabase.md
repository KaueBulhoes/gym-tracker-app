# Persistência Supabase

**Status:** Implementada
**Data:** 2026-04-13

## O que faz

Todos os dados do usuário (perfil, planos de treino, sessões de treino e cargas) são persistidos no Supabase. O app carrega os dados ao iniciar e salva automaticamente a cada operação. Ao fazer logout, os stores são limpos.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Service | `src/services/profileService.ts` | CRUD do perfil (get, create, update) |
| Service | `src/services/workoutService.ts` | CRUD de planos e sessões (inserção multi-tabela) |
| Store | `src/stores/profileStore.ts` | Estado do perfil com loading/error + async actions |
| Store | `src/stores/workoutStore.ts` | Estado de treinos com loading/error + async actions |
| Store | `src/stores/authStore.ts` | Reset dos stores no signOut |
| Util | `src/utils/caseMapper.ts` | Conversão snake_case ↔ camelCase + datas BR ↔ ISO |
| Types | `src/types/database.ts` | Tipos das rows do banco (snake_case) |
| Nav | `src/navigation/AppNavigator/AppNavigator.tsx` | Carrega dados no startup, mostra loading |

## Tabelas Supabase envolvidas

- `profiles` — perfil do usuário (onboarding + settings)
- `workout_plans` — planos de treino
- `workout_plan_days` — dias de cada plano
- `workout_plan_exercises` — exercícios de cada dia
- `exercise_rep_schemes` — blocos de reps para drop sets
- `workout_sessions` — sessões finalizadas
- `workout_session_weights` — cargas por exercício

## Fluxo de dados

1. **Startup:** AppNavigator carrega profile, plans e sessions em paralelo
2. **Onboarding:** saveProfile → INSERT profiles → navega para Home
3. **Criar plano:** draft local → saveDraft → INSERT sequencial (plan → days → exercises → schemes) → re-fetch
4. **Treinar:** finishWorkout → INSERT session + weights
5. **Sign out:** reset profile + workout stores → volta para auth
