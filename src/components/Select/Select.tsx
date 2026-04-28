import React, { useState } from 'react';
import { LayoutAnimation, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../constants';
import {
  ConfirmButton,
  ConfirmButtonText,
  EmptyHint,
  Label,
  LabelHint,
  LabelRow,
  ModalBody,
  ModalCard,
  ModalFooter,
  ModalHeader,
  ModalScroll,
  ModalTitle,
  Option,
  OptionCheckbox,
  OptionText,
  Overlay,
  Trigger,
  TriggerText,
  Wrapper,
} from './Select.styles';

export type SelectItem = {
  value: string;
  label: string;
};

interface SingleProps {
  label?: string;
  labelHint?: string;
  placeholder: string;
  modalTitle?: string;
  items: SelectItem[];
  multiple?: false;
  selected: string | null;
  onChange: (value: string) => void;
  emptyHint?: string;
}

interface MultiProps {
  label?: string;
  labelHint?: string;
  placeholder: string;
  modalTitle?: string;
  items: SelectItem[];
  multiple: true;
  selected: string[];
  onChange: (values: string[]) => void;
  emptyHint?: string;
}

type SelectProps = SingleProps | MultiProps;

const SELECT_ANIMATION = {
  duration: 150,
  update: { type: LayoutAnimation.Types.easeInEaseOut },
  create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
};

const Select: React.FC<SelectProps> = (props) => {
  const { colors } = useTheme();
  const { label, labelHint, placeholder, items, modalTitle, emptyHint } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [draftMulti, setDraftMulti] = useState<string[]>([]);

  const open = () => {
    if (props.multiple) {
      setDraftMulti(props.selected);
    }
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const triggerLabel = (() => {
    if (props.multiple) {
      if (props.selected.length === 0) {
        return placeholder;
      }
      const labels = props.selected
        .map((v) => items.find((i) => i.value === v)?.label)
        .filter(Boolean) as string[];
      return labels.join(', ');
    }
    if (!props.selected) {
      return placeholder;
    }
    return items.find((i) => i.value === props.selected)?.label ?? placeholder;
  })();

  const isPlaceholder = props.multiple
    ? props.selected.length === 0
    : !props.selected;

  const handleSelectSingle = (value: string) => {
    if (props.multiple) {
      return;
    }
    LayoutAnimation.configureNext(SELECT_ANIMATION);
    props.onChange(value);
    close();
  };

  const toggleMulti = (value: string) => {
    LayoutAnimation.configureNext(SELECT_ANIMATION);
    setDraftMulti((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );
  };

  const confirmMulti = () => {
    if (!props.multiple) {
      return;
    }
    props.onChange(draftMulti);
    close();
  };

  const isOptionSelected = (value: string) => {
    if (props.multiple) {
      return draftMulti.includes(value);
    }
    return props.selected === value;
  };

  return (
    <Wrapper>
      {label ? (
        <LabelRow>
          <Label>{label}</Label>
          {labelHint ? <LabelHint>{labelHint}</LabelHint> : null}
        </LabelRow>
      ) : null}
      <Trigger
        onPress={open}
        accessibilityLabel={label ?? placeholder}
        android_ripple={{ color: colors.backgroundHighlight }}
      >
        <TriggerText $isPlaceholder={isPlaceholder} numberOfLines={1}>
          {triggerLabel}
        </TriggerText>
        <MaterialCommunityIcons
          name="chevron-down"
          size={spacing.iconSize.md}
          color={colors.neutral300}
        />
      </Trigger>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={close}>
        <Overlay onPress={close}>
          <ModalCard onStartShouldSetResponder={() => true}>
            <ModalHeader>
              <ModalTitle>{modalTitle ?? label ?? placeholder}</ModalTitle>
            </ModalHeader>

            <ModalBody>
              {items.length === 0 && emptyHint ? (
                <EmptyHint>{emptyHint}</EmptyHint>
              ) : (
                <ModalScroll>
                  {items.map((item) => {
                    const selected = isOptionSelected(item.value);
                    return (
                      <Option
                        key={item.value}
                        $selected={selected}
                        onPress={() =>
                          props.multiple
                            ? toggleMulti(item.value)
                            : handleSelectSingle(item.value)
                        }
                        android_ripple={{ color: colors.backgroundHighlight }}
                        accessibilityLabel={item.label}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                      >
                        {props.multiple ? (
                          <OptionCheckbox $checked={selected}>
                            {selected ? (
                              <MaterialCommunityIcons
                                name="check"
                                size={14}
                                color={colors.textInverse}
                              />
                            ) : null}
                          </OptionCheckbox>
                        ) : null}
                        <OptionText $selected={selected}>{item.label}</OptionText>
                        {!props.multiple && selected ? (
                          <MaterialCommunityIcons
                            name="check"
                            size={spacing.iconSize.md}
                            color={colors.primary}
                          />
                        ) : null}
                      </Option>
                    );
                  })}
                </ModalScroll>
              )}
            </ModalBody>

            {props.multiple ? (
              <ModalFooter>
                <ConfirmButton onPress={confirmMulti} accessibilityLabel="Confirmar seleção">
                  <ConfirmButtonText>Confirmar</ConfirmButtonText>
                </ConfirmButton>
              </ModalFooter>
            ) : null}
          </ModalCard>
        </Overlay>
      </Modal>
    </Wrapper>
  );
};

export default Select;
