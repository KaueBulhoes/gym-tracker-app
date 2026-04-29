# Keep Awake Store

**Arquivo:** `src/stores/keepAwakeStore.ts`
**Data:** 2026-04-28

## Estado

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `enabled` | `boolean` | Se a preferência "manter tela ativa" está ligada |
| `isLoaded` | `boolean` | Se a preferência persistida já foi carregada do AsyncStorage |

## Actions

### `loadKeepAwake(): Promise<void>`
- **O que faz:** Lê a preferência do AsyncStorage e atualiza `enabled`. Marca `isLoaded = true` mesmo se não houver valor salvo
- **Chave AsyncStorage:** `@gymtracker:keep-awake` (`'1'` ou `'0'`)
- **Usada em:** [App.tsx](../../App.tsx) (bootstrap)

### `setEnabled(value: boolean): Promise<void>`
- **O que faz:** Define `enabled` e persiste a nova preferência
- **Comportamento:** Atualiza o estado primeiro (UI responde imediatamente), persistência é não-bloqueante
- **Usada em:** [HomeScreen](../telas/home.md) (Switch no menu do perfil)

### `toggle(): Promise<void>`
- **O que faz:** Inverte o valor atual de `enabled` e persiste
- **Uso alternativo ao `setEnabled`** quando não se tem o próximo valor à mão

### `reset(): void`
- **O que faz:** Limpa a preferência salva e volta para `false`. `isLoaded` volta para `false`
- **Uso:** Disponível para signOut, mas atualmente não chamado (preferência sobrevive ao logout)

## Persistência

AsyncStorage com a chave `@gymtracker:keep-awake`. Valores aceitos: `'1'` ou `'0'`. Qualquer outro valor é tratado como `false`.

## Como é consumido

O hook [`useKeepAwake`](../../src/hooks/useKeepAwake.ts) escuta `enabled` e `isLoaded` e aplica/remove o efeito da lib `@sayem314/react-native-keep-awake` conforme o `AppState` (apenas em foreground).

## Funcionalidade

- [Manter Tela Ativa](../funcionalidades/manter-tela-ativa.md)
