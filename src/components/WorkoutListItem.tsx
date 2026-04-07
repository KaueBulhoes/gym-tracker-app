import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../constants';

interface WorkoutListItemProps {
  type: string;
  description: string;
  date: string;
  durationMinutes: number;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
  type,
  description,
  date,
  durationMinutes,
}) => {
  return (
    <Container>
      <IconContainer>
        <MaterialCommunityIcons
          name="dumbbell"
          size={spacing.iconSize.md}
          color={colors.secondary}
        />
      </IconContainer>
      <Info>
        <Title>Treino {type} - {description}</Title>
        <Subtitle>{date} • {durationMinutes} min</Subtitle>
      </Info>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

const IconContainer = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.backgroundHighlight};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

const Info = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

const Subtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;

export default WorkoutListItem;
