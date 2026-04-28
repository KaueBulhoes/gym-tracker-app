import React, { useMemo, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../constants';
import { useWorkloadChartPrefs } from '../../hooks/useWorkloadChartPrefs';
import {
  buildWorkloadSeries,
  filterSeriesByExercise,
} from '../../utils/workloadEvolution';
import type { WorkoutSession } from '../../types/workout';
import WorkloadChart from '../WorkloadChart';
import WorkloadEvolutionModal from '../WorkloadEvolutionModal';
import {
  CardContainer,
  CardHeader,
  CardSubtitle,
  CardTitle,
  EmptyText,
  PreviewArea,
} from './WorkloadEvolutionCard.styles';

interface WorkloadEvolutionCardProps {
  sessions: WorkoutSession[];
}

const PREVIEW_HEIGHT = 96;

const WorkloadEvolutionCard: React.FC<WorkloadEvolutionCardProps> = ({
  sessions,
}) => {
  const { colors } = useTheme();
  const exercise = useWorkloadChartPrefs((state) => state.exercise);
  const days = useWorkloadChartPrefs((state) => state.days);
  const setExercise = useWorkloadChartPrefs((state) => state.setExercise);
  const setDays = useWorkloadChartPrefs((state) => state.setDays);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(0);

  const previewSeries = useMemo(() => {
    const all = buildWorkloadSeries(sessions, days);
    if (exercise === '__all__') {
      return all;
    }
    return filterSeriesByExercise(all, exercise);
  }, [sessions, days, exercise]);

  const subtitle = useMemo(() => {
    const target =
      exercise === '__all__' ? 'Todos os exercícios' : exercise;
    return `${target} · últimos ${days} dias`;
  }, [exercise, days]);

  const hasPoints = previewSeries.some((s) => s.points.length > 0);

  return (
    <>
      <CardContainer
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Abrir gráfico de evolução de carga em tela cheia"
        accessibilityRole="button"
      >
        <CardHeader>
          <MaterialCommunityIcons
            name="chart-line"
            size={spacing.iconSize.sm}
            color={colors.primary}
          />
          <CardTitle>Evolução de Carga</CardTitle>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={spacing.iconSize.sm}
            color={colors.textSecondary}
          />
        </CardHeader>
        <CardSubtitle numberOfLines={1}>{subtitle}</CardSubtitle>
        <PreviewArea
          onLayout={(event) => setPreviewWidth(event.nativeEvent.layout.width)}
        >
          {previewWidth > 0 && hasPoints ? (
            <WorkloadChart
              series={previewSeries}
              totalDays={days}
              width={previewWidth}
              height={PREVIEW_HEIGHT}
              variant="preview"
            />
          ) : (
            <EmptyText>
              {hasPoints
                ? ''
                : 'Sem registros no período. Toque para escolher outro intervalo.'}
            </EmptyText>
          )}
        </PreviewArea>
      </CardContainer>

      <WorkloadEvolutionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        sessions={sessions}
        exercise={exercise}
        days={days}
        onChangeExercise={setExercise}
        onChangeDays={setDays}
      />
    </>
  );
};

export default WorkloadEvolutionCard;
