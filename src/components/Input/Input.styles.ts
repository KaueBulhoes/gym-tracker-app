import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const Wrapper = styled.View``;

export const Label = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.neutral200};
  margin-bottom: ${spacing.xs}px;
`;

export const InputContainer = styled.View<{
  $isFocused: boolean;
  $hasError: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${({ $isFocused, $hasError, theme }) =>
    $hasError
      ? theme.colors.error
      : $isFocused
      ? theme.colors.primary
      : 'transparent'};
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  height: 48px;
  padding-horizontal: ${spacing.base}px;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const ToggleButton = styled.Pressable`
  padding-horizontal: ${spacing.md}px;
`;

export const ToggleText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ErrorText = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${spacing.xs}px;
`;
