# Manter Tela Ativa

**Status:** Implementada
**Data:** 2026-04-28

## O que faz

Permite que o usuário desabilite o auto-bloqueio da tela enquanto o app estiver em primeiro plano. Útil durante uma sessão de treino para que o cronômetro/séries fiquem visíveis sem precisar tocar a tela. A preferência é persistida em AsyncStorage e é controlada por um toggle no menu do perfil (Home).

O efeito **só vale enquanto o app está em foreground** — quando o usuário sai do app, manda para background ou bloqueia a tela manualmente, o sistema volta ao comportamento normal. Quando o app volta ao foreground, o efeito é reaplicado automaticamente se o toggle estiver ligado.

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Lib | `@sayem314/react-native-keep-awake` | API nativa: `activateKeepAwake()` / `deactivateKeepAwake()` (Android `FLAG_KEEP_SCREEN_ON`, iOS `isIdleTimerDisabled`) |
| Store | `src/stores/keepAwakeStore.ts` | Zustand store: `enabled`, `loadKeepAwake`, `setEnabled`, `toggle`, persistência AsyncStorage |
| Hook | `src/hooks/useKeepAwake.ts` | Aplica/remove o efeito de acordo com o estado do store e o `AppState` (active vs. background) |
| Bootstrap | `App.tsx` | Carrega a preferência no startup (`loadKeepAwake`) e monta o hook `useKeepAwake()` no nível da raiz |
| Toggle UI | `src/screens/Home/HomeScreen/HomeScreen.tsx` | Linha com `Switch` no `ProfileMenu` (ícone lâmpada) que chama `setEnabled` |

## Comportamento

1. **Startup:** `loadKeepAwake` lê `@gymtracker:keep-awake` do AsyncStorage e hidrata o store.
2. **Hook global:** `useKeepAwake` (montado em `App.tsx`) escuta o store e o `AppState`:
   - Se `enabled = true` e app está `active` → chama `activateKeepAwake()`.
   - Se `enabled = false` ou app saiu para background → chama `deactivateKeepAwake()`.
3. **Toggle:** `Switch` no menu do perfil chama `setEnabled(value)` que atualiza o store e persiste.
4. **Cleanup:** ao desmontar, o hook chama `deactivateKeepAwake()` para garantir que não fica preso.

## Persistência

- Chave AsyncStorage: `@gymtracker:keep-awake`
- Valores: `'1'` (ativo) ou `'0'` (inativo)
- Padrão inicial: `false` (não mantém a tela ativa por padrão)

## Tabelas Supabase

Nenhuma — preferência local apenas (AsyncStorage).

## Limites

- A preferência **não bloqueia o usuário de bloquear a tela manualmente** (por design).
- Não impede o app de ser pausado pelo sistema operacional em background.
- Em hardware muito antigo, o flag `KEEP_SCREEN_ON` ainda pode ser sobreposto por políticas do sistema.

## Referências

- [keepAwakeStore](../api/keep-awake-store.md) — store Zustand
- [Persistência Local](persistencia-local.md) — chave `@gymtracker:keep-awake`
