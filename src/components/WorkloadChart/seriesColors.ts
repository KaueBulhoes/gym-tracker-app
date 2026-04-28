const SERIES_COLORS = [
  '#FACC15',
  '#A78BFA',
  '#22C55E',
  '#3B82F6',
  '#EF4444',
  '#F59E0B',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#8B5CF6',
];

export const seriesColorForIndex = (index: number): string =>
  SERIES_COLORS[index % SERIES_COLORS.length];
