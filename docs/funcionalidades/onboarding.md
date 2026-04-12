# Onboarding (Perfil do Usuário)

**Status:** Implementada (persistência mock in-memory)
**Data:** 2026-04-12

## O que faz

No primeiro login, redireciona o usuário para preencher seu perfil antes de acessar o app. Coleta dados pessoais e objetivos de treino que são usados para personalizar a experiência (meta semanal na Home, nome do usuário no header).

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Tela | `src/screens/Onboarding/OnboardingScreen/OnboardingScreen.tsx` | Form com scroll, inputs e chips |
| Store | `src/stores/profileStore.ts` | Perfil do usuário e flag de onboarding |
| Tipos | `src/types/profile.ts` | `UserProfile`, `FitnessGoal` |
| Componente | `src/components/ChipSelect/ChipSelect.tsx` | Chips reutilizáveis (single e multi-select) |
| Navegação | `src/navigation/AppNavigator/AppNavigator.tsx` | Rota inicial condicional baseada em `isOnboardingComplete` |

## Dados coletados

| Campo | Tipo | Refletido em |
|-------|------|-------------|
| Nome / Sobrenome | texto | Header da Home ("Bem-vindo, {nome}") |
| Data de nascimento | DD/MM/AAAA | Perfil (futuro) |
| Altura / Peso | numérico | Perfil (futuro) |
| Objetivo semanal | 1x–7x | Meta Semanal na Home (barra de progresso) |
| Objetivos fitness | multi-select | Perfil (futuro) |

## Fluxo

```
Login → sessão ativa → AppNavigator
  ├── isOnboardingComplete = false → OnboardingScreen → salvar → Home
  └── isOnboardingComplete = true → Home direto
```

## Persistência

Dados ficam no Zustand store (`useProfileStore`) — mock in-memory, sem Supabase ainda.

## Tabelas Supabase (a integrar)

- `profiles` — receberá os dados do perfil (name, birth_date, height_cm, weight_kg, weekly_goal, fitness_goals)
