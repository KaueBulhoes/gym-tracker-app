import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const Container = styled.Pressable<{
  $variant: 'primary' | 'outline';
  $isDisabled: boolean;
}>`
  height: 42px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${spacing.xl}px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  background-color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary : 'transparent'};
  border-width: ${({ $variant }) => ($variant === 'outline' ? '1.5px' : '0px')};
  border-color: ${({ $variant, theme }) =>
    $variant === 'outline' ? theme.colors.primary : 'transparent'};
`;

export const Title = styled.Text<{
  $variant: 'primary' | 'outline';
  $isDisabled: boolean;
}>`
  font-size: ${typography.button.fontSize}px;
  font-weight: ${typography.button.fontWeight};
  color: ${({ $variant, theme }) =>
    $variant === 'outline' ? theme.colors.primary : theme.colors.textInverse};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.7 : 1)};
`;
