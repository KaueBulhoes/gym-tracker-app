# Theme Store

**Arquivo:** `src/stores/themeStore.ts`
**Data:** 2026-04-27

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `mode` | `'dark' \| 'light'` | Tema atual |
| `isLoaded` | `boolean` | Se o tema persistido já foi carregado do AsyncStorage |

## Actions

### `loadTheme(): Promise<void>`
- **O que faz:** Lê a preferência de tema do AsyncStorage e aplica. Marca `isLoaded = true` mesmo se não houver valor salvo
- **Chave AsyncStorage:** `@gymtracker:theme-mode`
- **Usada em:** [App.tsx](../../App.tsx) (bootstrap)

### `toggleTheme(): Promise<void>`
- **O que faz:** Alterna `mode` entre `'dark'` e `'light'` e persiste a nova escolha
- **Comportamento:** Atualiza o estado primeiro (UI responde imediatamente), persistência é não-bloqueante
- **Usada em:** [HomeScreen](../telas/home.md) (menu do perfil)

### `reset(): void`
- **O que faz:** Limpa a preferência salva e volta para `'dark'`. `isLoaded` volta para `false`
- **Uso:** Disponível para signOut, mas atualmente não chamado (preferência de tema sobrevive ao logout)

## Persistência

AsyncStorage com a chave `@gymtracker:theme-mode`. Valores aceitos: `'dark'` ou `'light'`. Qualquer outro valor é ignorado e mantém o padrão `'dark'`.

## Como é consumido

O `App.tsx` faz subscribe via `useThemeStore(state => state.mode)`, computa `appTheme` com `getTheme(mode)` e passa para o `ThemeProvider` do styled-components. Todos os styled-components consomem `theme.colors.X`.

## Funcionalidade

- [Tema Dark/Light](../funcionalidades/tema-dark-light.md)
