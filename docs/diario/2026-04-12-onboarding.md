# 2026-04-12 — Onboarding, perfil do usuário e meta semanal real

## O que foi feito
- Criada tela de Onboarding com form de perfil (nome, sobrenome, data nascimento, altura, peso, objetivo semanal, objetivos fitness)
- Criado tipo `UserProfile` e `FitnessGoal` em `src/types/profile.ts`
- Criado `profileStore` com Zustand (mock in-memory)
- Criado componente reutilizável `ChipSelect` com suporte a single e multi-select
- Integrado onboarding na navegação: primeiro login vai para Onboarding, logins seguintes vão direto para Home
- HomeScreen agora mostra nome real do usuário no header
- Meta Semanal na Home agora usa o objetivo do perfil e conta sessões reais da semana
- Removidos mocks `mockUser` e `mockWeeklyGoal` da Home

## Decisões tomadas
- Onboarding fica dentro do AppStack (não auth) — usuário já está autenticado
- Objetivos fitness permitem múltipla seleção
- Persistência mock in-memory por enquanto, Supabase pendente
- `ChipSelect` criado como componente genérico em `src/components/` para reuso futuro

## Próximos passos
- Integrar perfil com Supabase (tabela `profiles`)
- Substituir `mockMonthlyTotal` por contagem real de sessões
- Tela de histórico de treinos
