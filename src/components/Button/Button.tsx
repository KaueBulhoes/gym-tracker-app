import React from 'react';
import { ActivityIndicator, type ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, Title } from './Button.styles';

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
  const { colors } = useTheme();
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

export default Button;
