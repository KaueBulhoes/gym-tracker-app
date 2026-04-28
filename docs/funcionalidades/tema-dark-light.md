# Tema Dark / Light

**Status:** Implementada
**Data:** 2026-04-27

## O que faz

O app suporta dois temas (escuro e claro) com toggle persistente. O usuário troca pelo menu do perfil na Home (item "Light Mode" / "Dark Mode"). A escolha fica salva em AsyncStorage e é recarregada no startup. O tema escolhido também propaga para a UI nativa do sistema (StatusBar, `Appearance.setColorScheme`).

## Composição

| Camada | Arquivo | Descrição |
|--------|---------|-----------|
| Constants | `src/constants/colors.ts` | Paletas `darkColors` e `lightColors` + aliases (`onSecondary`, `onSecondaryMuted`, `textInverse`) |
| Constants | `src/constants/theme.ts` | `themes` (dark/light), `getTheme(mode)`, type `AppTheme` |
| Types | `src/types/styled.d.ts` | Augmenta `DefaultTheme` do `styled-components/native` para tipar `theme.colors` |
| Store | `src/stores/themeStore.ts` | Zustand store: `mode`, `loadTheme`, `toggleTheme`, persistência AsyncStorage |
| Provider | `App.tsx` | `<ThemeProvider theme={appTheme}>` envolve todo o app; sincroniza `StatusBar` e `Appearance.setColorScheme` |
| Toggle UI | `src/screens/Home/HomeScreen/HomeScreen.tsx` | Item no `ProfileMenu` (ícone sol/lua) que chama `toggleTheme()` |

## Como os componentes consomem o tema

Todos os styled-components usam o `theme` injetado pelo `ThemeProvider`:

```ts
const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
```

Telas/componentes que precisam de cores em props (ex: `<Icon color={...}>`, `placeholderTextColor`) usam o hook `useTheme`:

```tsx
import { useTheme } from 'styled-components/native';
const { colors } = useTheme();
return <Icon color={colors.primary} />;
```

Antes deste commit, muitos arquivos importavam `colors` direto de `src/constants` — que aponta sempre para `darkColors` e portanto não respondia à troca de tema. Toda a base foi migrada para `theme.colors` / `useTheme()`.

## Aliases semânticos importantes

| Alias | Uso | Comportamento |
|-------|-----|---------------|
| `text` / `textSecondary` | Body text (varia entre temas) | Escuro no light, claro no dark |
| `textInverse` | Texto/ícone sobre `primary` (botão amarelo) | Escuro nos dois temas (primary é amarelo nos dois) |
| `onSecondary` | Texto/ícone sobre `secondaryDark` (header roxo) | Sempre claro nos dois temas |
| `onSecondaryMuted` | Subtítulo/ícone secundário sobre header roxo | Sempre claro com transparência |

`onSecondary` foi necessário porque o header da maioria das telas usa fundo roxo (`secondaryDark`) em ambos os temas — então o texto precisa ser sempre claro, independente do modo.

## Persistência

- Chave AsyncStorage: `@gymtracker:theme-mode`
- Valor: `'dark'` | `'light'`
- Padrão inicial: `'dark'` (se não houver valor salvo)
- Carregamento: feito no `bootstrap` do `App.tsx` antes de renderizar a navegação

## Tabelas Supabase

Nenhuma — preferência local apenas (AsyncStorage).

## Referências

- [themeStore](../api/theme-store.md) — store Zustand de tema
- [colors.ts](../../src/constants/colors.ts) — paletas
- [theme.ts](../../src/constants/theme.ts) — definição dos temas
