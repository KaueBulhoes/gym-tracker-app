import React from 'react';
import type { ViewStyle } from 'react-native';
import { Container } from './Card.styles';

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

export default Card;
