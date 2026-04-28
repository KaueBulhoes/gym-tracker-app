import React, { useState } from 'react';
import { type TextInputProps, type ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Wrapper, Label, InputContainer, StyledInput, ToggleButton, ToggleText, ErrorText } from './Input.styles';

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
  const { colors } = useTheme();
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

export default Input;
