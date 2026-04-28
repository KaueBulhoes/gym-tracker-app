import styled from 'styled-components/native';
import { spacing } from '../../constants';
import type { Colors } from '../../constants/colors';

export const getBackgroundColor = (variant: string, themeColors: Colors) => {
  switch (variant) {
    case 'purple':
      return themeColors.secondaryDark;
    default:
      return themeColors.backgroundElevated;
  }
};

export const getBorderColor = (variant: string, themeColors: Colors) => {
  switch (variant) {
    case 'highlighted':
      return themeColors.primary;
    case 'purple':
      return 'transparent';
    default:
      return themeColors.neutral600;
  }
};

export const Container = styled.View<{ $variant: string }>`
  background-color: ${({ $variant, theme }) =>
    getBackgroundColor($variant, theme.colors)};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${({ $variant, theme }) =>
    getBorderColor($variant, theme.colors)};
`;
