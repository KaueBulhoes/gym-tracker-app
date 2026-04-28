export const darkColors = {
  // Primárias — dourado refinado, vibrante mas menos cru
  primary: '#FACC15',
  primaryLight: '#FDE047',
  primaryDark: '#CA8A04',
  secondary: '#A78BFA',
  secondaryLight: '#C4B5FD',
  secondaryDark: '#7C3AED',

  // Fundos — tons quase neutros, sem dominância azul/roxa
  background: '#0B0E14',
  backgroundElevated: '#161B22',
  backgroundInput: '#1F252F',
  backgroundHighlight: '#272E3B',

  // Neutros (50 = mais claro, 600 = mais escuro / perto do background)
  neutral50: '#F8FAFC',
  neutral100: '#E2E8F0',
  neutral200: '#CBD5E1',
  neutral300: '#94A3B8',
  neutral400: '#64748B',
  neutral500: '#475569',
  neutral600: '#2D3441',

  // Semânticas
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Aliases
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textInverse: '#0B0E14',
  border: '#2D3441',
  card: '#161B22',
  overlay: 'rgba(0, 0, 0, 0.65)',

  // Texto sobre o header roxo (secondaryDark) — sempre claro
  onSecondary: '#FFFFFF',
  onSecondaryMuted: 'rgba(255, 255, 255, 0.72)',
} as const;

export const lightColors = {
  // Primárias — amarelo vibrante visível em fundo claro e que aceita texto escuro
  primary: '#EAB308',
  primaryLight: '#FACC15',
  primaryDark: '#A16207',
  secondary: '#7C3AED',
  secondaryLight: '#A78BFA',
  secondaryDark: '#5B21B6',

  // Fundos — claros e limpos com hierarquia visual correta
  // (background mais cinza-claro; cards brancos sobre ele)
  background: '#F4F6FA',
  backgroundElevated: '#FFFFFF',
  backgroundInput: '#F1F5F9',
  backgroundHighlight: '#E2E8F0',

  // Neutros (50 = texto principal escuro; 600 = borda/divider claro)
  // Mantém o mesmo shape do dark p/ que os styles funcionem nos dois modos.
  neutral50: '#0F172A',
  neutral100: '#1E293B',
  neutral200: '#334155',
  neutral300: '#64748B',
  neutral400: '#94A3B8',
  neutral500: '#CBD5E1',
  neutral600: '#E2E8F0',

  // Semânticas
  success: '#16A34A',
  error: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',

  // Aliases
  text: '#0F172A',
  textSecondary: '#475569',
  // textInverse = cor de texto/ícone sobre o primary amarelo. Em ambos os modos o
  // primary é amarelo, então textInverse é escuro nos dois.
  textInverse: '#0F172A',
  border: '#E2E8F0',
  card: '#FFFFFF',
  overlay: 'rgba(15, 23, 42, 0.4)',

  // Texto sobre o header roxo (secondaryDark) — sempre claro nos dois modos
  onSecondary: '#FFFFFF',
  onSecondaryMuted: 'rgba(255, 255, 255, 0.85)',
} as const;

export const colors = darkColors;

export type Colors = { [K in keyof typeof darkColors]: string };
