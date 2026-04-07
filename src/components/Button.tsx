import React from 'react';
import { ActivityIndicator, type ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <Container
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={title}
      accessibilityRole="button"
      $variant={variant}
      $isDisabled={isDisabled}
      style={style}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.textInverse : colors.primary}
          size="small"
        />
      ) : (
        <Title $variant={variant} $isDisabled={isDisabled}>
          {title}
        </Title>
      )}
    </Container>
  );
};

const Container = styled.Pressable<{
  $variant: 'primary' | 'outline';
  $isDisabled: boolean;
}>`
  height: 52px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${spacing.xl}px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? colors.primary : 'transparent'};
  ${({ $variant }) =>
    $variant === 'outline' &&
    `border-width: 1.5px; border-color: ${colors.primary};`}
`;

const Title = styled.Text<{
  $variant: 'primary' | 'outline';
  $isDisabled: boolean;
}>`
  font-size: ${typography.button.fontSize}px;
  font-weight: ${typography.button.fontWeight};
  color: ${({ $variant }) =>
    $variant === 'outline' ? colors.primary : colors.textInverse};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.7 : 1)};
`;

export default Button;
