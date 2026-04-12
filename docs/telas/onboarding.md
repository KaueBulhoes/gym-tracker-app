# Tela: Onboarding

**Arquivo:** `src/screens/Onboarding/OnboardingScreen/OnboardingScreen.tsx`
**Data:** 2026-04-12

## O que o usuário faz

Preenche seu perfil no primeiro login: nome, sobrenome, data de nascimento, altura, peso, objetivo semanal (1x–7x) e objetivos fitness (hipertrofia, emagrecimento, manter peso, saúde). Os objetivos fitness permitem múltipla seleção.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useProfileStore.saveProfile` | Store | Salva perfil e marca onboarding como completo |
| `profile.ts` | Type | `UserProfile`, `FitnessGoal` |

## Componentes usados

- `Input` — campos de texto (nome, sobrenome, data nascimento, altura, peso)
- `ChipSelect` — seleção de objetivo semanal (single) e objetivos fitness (multi)
- `Button` — "Começar" (desabilitado até preencher tudo)

## Navegação

- **Vem de:** AppNavigator (rota inicial quando perfil incompleto)
- **Vai para:** Home (via `navigation.reset` após salvar perfil)
