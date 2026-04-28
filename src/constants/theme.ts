import { darkColors, lightColors, type Colors } from './colors';

export type AppThemeMode = 'dark' | 'light';

export interface AppTheme {
  mode: AppThemeMode;
  colors: Colors;
}

export const themes: Record<AppThemeMode, AppTheme> = {
  dark: {
    mode: 'dark',
    colors: darkColors,
  },
  light: {
    mode: 'light',
    colors: lightColors,
  },
};

export const getTheme = (mode: AppThemeMode): AppTheme => themes[mode];
