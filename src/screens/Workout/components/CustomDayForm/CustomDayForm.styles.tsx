import React from 'react';
import { TextInput as RNTextInput, type TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { spacing, typography } from '../../../../constants';

export const Wrapper = styled.View`
  margin-top: ${spacing.md}px;
  gap: ${spacing.sm}px;
`;

export const DayRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const RowInput = styled.TextInput<{ $error?: boolean }>`
  flex: 1;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${({ $error, theme }) =>
    $error ? theme.colors.error : theme.colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const RemoveButton = styled.Pressable`
  width: 48px;
  height: 48px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.error};
`;

export const ErrorMessage = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
`;

export const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const ForwardedTextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => <RNTextInput ref={ref} {...props} />,
);

export const StyledInput = styled(ForwardedTextInput)`
  flex: 1;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AddButton = styled.Pressable<{ $disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.backgroundElevated : theme.colors.primary};
  border-width: 1.5px;
  border-color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.border : theme.colors.primary};
`;
