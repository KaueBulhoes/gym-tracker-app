import React from 'react';
import type { ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing } from '../constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'highlighted';
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  return (
    <Container $variant={variant} style={style}>
      {children}
    </Container>
  );
};

const getBackgroundColor = (variant: string) => {
  switch (variant) {
    case 'purple':
      return colors.secondaryDark;
    default:
      return colors.backgroundElevated;
  }
};

const getBorderColor = (variant: string) => {
  switch (variant) {
    case 'highlighted':
      return colors.primary;
    case 'purple':
      return 'transparent';
    default:
      return colors.neutral600;
  }
};

const Container = styled.View<{ $variant: string }>`
  background-color: ${({ $variant }) => getBackgroundColor($variant)};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${({ $variant }) => getBorderColor($variant)};
`;

export default Card;
