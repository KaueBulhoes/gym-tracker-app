import React from 'react';
import { TextInput as RNTextInput, type TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../../constants';

export const Wrapper = styled.View`
  margin-top: ${spacing.md}px;
  gap: ${spacing.sm}px;
`;

export const ConfirmedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background-color: ${colors.backgroundHighlight};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.success}40;
`;

export const ConfirmedText = styled.Text`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.text};
`;

export const RenameInput = styled.TextInput`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
  padding: 0px;
`;

export const RowActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-left: auto;
`;

export const ActionButton = styled.Pressable`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
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
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
`;

export const AddButton = styled.Pressable<{ $disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $disabled }) =>
    $disabled ? colors.backgroundElevated : colors.primary};
  border-width: 1.5px;
  border-color: ${({ $disabled }) =>
    $disabled ? colors.border : colors.primary};
`;
