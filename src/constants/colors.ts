export const colors = {
  // Primárias
  primary: '#FFD60A',
  primaryLight: '#FFE566',
  primaryDark: '#CCB000',
  secondary: '#8B5CF6',
  secondaryLight: '#A78BFA',
  secondaryDark: '#6D28D9',

  // Fundos
  background: '#0F0F14',
  backgroundElevated: '#1A1A24',
  backgroundInput: '#24243A',
  backgroundHighlight: '#2A2A3E',

  // Neutros
  neutral50: '#F8F8FC',
  neutral100: '#E4E4ED',
  neutral200: '#C8C8D8',
  neutral300: '#9898AE',
  neutral400: '#6B6B82',
  neutral500: '#4A4A5E',
  neutral600: '#33334A',

  // Semânticas
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Aliases
  text: '#E4E4ED',
  textSecondary: '#9898AE',
  textInverse: '#0F0F14',
  border: '#4A4A5E',
  card: '#1A1A24',
  overlay: 'rgba(0, 0, 0, 0.6)',
} as const;

export type Colors = typeof colors;
