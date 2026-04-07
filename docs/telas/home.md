# Tela: Home (placeholder)

**Arquivo:** `src/screens/Home/HomeScreen.tsx`
**Data:** 2026-04-07

## O que o usuário faz

Tela temporária exibida após login. Mostra "Hello GymTracker" e botão de sair.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useAuthStore.signOut` | Store | Faz logout e volta para tela de login |

## Componentes usados

- `Button` — "Sair" (outline)

## Navegação

- **Vem de:** RootNavigator (quando há sessão ativa)
- **Vai para:** LoginScreen (após logout)
