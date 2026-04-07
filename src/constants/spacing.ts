export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,

  screenHorizontal: 16,
  cardPadding: 16,

  cardRadius: 12,
  buttonRadius: 8,
  inputRadius: 8,

  iconSize: {
    sm: 20,
    md: 24,
    lg: 32,
  },
} as const;

export type Spacing = typeof spacing;
