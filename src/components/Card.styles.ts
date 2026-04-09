import styled from 'styled-components/native';
import { colors, spacing } from '../constants';

export const getBackgroundColor = (variant: string) => {
  switch (variant) {
    case 'purple':
      return colors.secondaryDark;
    default:
      return colors.backgroundElevated;
  }
};

export const getBorderColor = (variant: string) => {
  switch (variant) {
    case 'highlighted':
      return colors.primary;
    case 'purple':
      return 'transparent';
    default:
      return colors.neutral600;
  }
};

export const Container = styled.View<{ $variant: string }>`
  background-color: ${({ $variant }) => getBackgroundColor($variant)};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${({ $variant }) => getBorderColor($variant)};
`;
