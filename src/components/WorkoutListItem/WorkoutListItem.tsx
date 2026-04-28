import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../constants';
import { Container, IconContainer, Info, Title, Subtitle } from './WorkoutListItem.styles';

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
  const { colors } = useTheme();
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

export default WorkoutListItem;
