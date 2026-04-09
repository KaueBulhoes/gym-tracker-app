import styled from 'styled-components/native';
import { colors, spacing, typography } from '../constants';

export const Container = styled.Pressable<{
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

export const Title = styled.Text<{
  $variant: 'primary' | 'outline';
  $isDisabled: boolean;
}>`
  font-size: ${typography.button.fontSize}px;
  font-weight: ${typography.button.fontWeight};
  color: ${({ $variant }) =>
    $variant === 'outline' ? colors.primary : colors.textInverse};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.7 : 1)};
`;
