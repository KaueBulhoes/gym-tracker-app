import React, { useState } from 'react';
import { type TextInputProps, type ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../constants';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  secureTextEntry,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Wrapper style={containerStyle}>
      <Label>{label}</Label>
      <InputContainer $isFocused={isFocused} $hasError={!!error}>
        <StyledInput
          placeholderTextColor={colors.neutral300}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={label}
          {...rest}
        />
        {secureTextEntry && (
          <ToggleButton
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityLabel={
              isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
            }
          >
            <ToggleText>
              {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
            </ToggleText>
          </ToggleButton>
        )}
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const Label = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.neutral200};
  margin-bottom: ${spacing.xs}px;
`;

const InputContainer = styled.View<{
  $isFocused: boolean;
  $hasError: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${({ $isFocused, $hasError }) =>
    $hasError ? colors.error : $isFocused ? colors.primary : 'transparent'};
`;

const StyledInput = styled.TextInput`
  flex: 1;
  height: 48px;
  padding-horizontal: ${spacing.base}px;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.text};
`;

const ToggleButton = styled.Pressable`
  padding-horizontal: ${spacing.md}px;
`;

const ToggleText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.secondary};
`;

const ErrorText = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.error};
  margin-top: ${spacing.xs}px;
`;

export default Input;
