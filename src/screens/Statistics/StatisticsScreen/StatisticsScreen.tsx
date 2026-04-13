import React, { useMemo, useState } from 'react';
import { StatusBar, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../constants';
import { useHomeStats, type HomeStatKey } from '../../../hooks/useHomeStats';
import type { StatisticsScreenProps } from '../../../navigation/types';
import { useProfileStore } from '../../../stores/profileStore';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { WorkoutSession } from '../../../types/workout';
import {
  BackButton,
  Container,
  Content,
  CuriosityCard,
  CuriosityLabel,
  CuriosityValue,
  EmptyText,
  Header,
  HeaderTitle,
  HomeBadge,
  HomeBadgeText,
  ProgressionName,
  ProgressionPercent,
  ProgressionRow,
  ProgressionValues,
  RecordName,
  RecordRow,
  RecordValue,
  ScrollContent,
  SectionTitle,
  SelectHint,
  SelectLabel,
  SelectRow,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from './StatisticsScreen.styles';

// ─── Helpers ──────────────────────────────────────────

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) { return `${h}h ${m}min`; }
  return `${m}min`;
};

const getMonthStart = (): string => {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const getYearStart = (): string => {
  const d = new Date();
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const getWeekMondayFor = (date: Date): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const getWeekStreak = (sessions: WorkoutSession[], weeklyGoal: number): number => {
  if (sessions.length === 0 || weeklyGoal <= 0) { return 0; }

  let streak = 0;
  const checkDate = new Date();

  while (true) {
    const weekStart = getWeekMondayFor(checkDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const count = sessions.filter(
      s => s.finishedAt >= weekStart && s.finishedAt < weekEnd.toISOString(),
    ).length;

    if (count >= weeklyGoal) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 7);
    } else {
      break;
    }
  }

  return streak;
};

const getPersonalRecords = (sessions: WorkoutSession[]): { name: string; weight: number }[] => {
  const maxWeights = new Map<string, number>();

  for (const session of sessions) {
    for (const ew of session.exerciseWeights) {
      for (const w of ew.weights) {
        const val = parseFloat(w);
        if (!isNaN(val) && val > 0) {
          const current = maxWeights.get(ew.exerciseName) ?? 0;
          if (val > current) { maxWeights.set(ew.exerciseName, val); }
        }
      }
    }
  }

  return Array.from(maxWeights.entries())
    .map(([name, weight]) => ({ name, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);
};

const getExerciseProgression = (sessions: WorkoutSession[]) => {
  const chronological = [...sessions].reverse();
  const firstWeight = new Map<string, number>();
  const lastWeight = new Map<string, number>();

  for (const session of chronological) {
    for (const ew of session.exerciseWeights) {
      const maxW = Math.max(...ew.weights.map(w => parseFloat(w) || 0));
      if (maxW <= 0) { continue; }
      if (!firstWeight.has(ew.exerciseName)) { firstWeight.set(ew.exerciseName, maxW); }
      lastWeight.set(ew.exerciseName, maxW);
    }
  }

  const results: { name: string; first: number; last: number; percent: number }[] = [];
  for (const [name, first] of firstWeight) {
    const last = lastWeight.get(name) ?? first;
    if (first === last) { continue; }
    const percent = ((last - first) / first) * 100;
    results.push({ name, first, last, percent });
  }

  return results.sort((a, b) => b.percent - a.percent);
};

const getMostTrainedExercise = (sessions: WorkoutSession[]): string | null => {
  const counts = new Map<string, number>();
  for (const session of sessions) {
    for (const ew of session.exerciseWeights) {
      counts.set(ew.exerciseName, (counts.get(ew.exerciseName) ?? 0) + 1);
    }
  }
  let max = 0;
  let result: string | null = null;
  for (const [name, count] of counts) {
    if (count > max) { max = count; result = name; }
  }
  return result;
};

const getFavoriteDay = (sessions: WorkoutSession[]): string | null => {
  if (sessions.length === 0) { return null; }
  const counts = new Array(7).fill(0);
  for (const s of sessions) { counts[new Date(s.finishedAt).getDay()]++; }
  const maxIdx = counts.indexOf(Math.max(...counts));
  return DAY_NAMES[maxIdx];
};

const getBestMonth = (sessions: WorkoutSession[]): string | null => {
  if (sessions.length === 0) { return null; }
  const counts = new Map<string, number>();
  for (const s of sessions) {
    const d = new Date(s.finishedAt);
    const key = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  let max = 0;
  let result: string | null = null;
  for (const [key, count] of counts) {
    if (count > max) { max = count; result = `${key} (${count})`; }
  }
  return result;
};

// ─── Stat card config ─────────────────────────────────

type StatConfig = { key: HomeStatKey; label: string; value: string };

// ─── Component ────────────────────────────────────────

const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ navigation }) => {
  const sessions = useWorkoutStore(state => state.sessions);
  const lastCompleted = useWorkoutStore(state => state.lastCompleted);
  const weeklyGoal = useProfileStore(state => state.profile?.weeklyGoal ?? 5);
  const selected = useHomeStats(state => state.selected);
  const toggle = useHomeStats(state => state.toggle);
  const loadHomeStats = useHomeStats(state => state.load);
  const homeStatsLoaded = useHomeStats(state => state.loaded);
  const [selectMode, setSelectMode] = useState(false);

  React.useEffect(() => {
    if (!homeStatsLoaded) { loadHomeStats(); }
  }, [homeStatsLoaded, loadHomeStats]);

  const stats = useMemo(() => {
    const monthStart = getMonthStart();
    const yearStart = getYearStart();

    const monthlyTotal = sessions.filter(s => s.finishedAt >= monthStart).length;
    const yearlyTotal = sessions.filter(s => s.finishedAt >= yearStart).length;
    const totalSessions = sessions.length;
    const totalSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);

    const avgDuration = totalSessions > 0 ? Math.round(totalSeconds / totalSessions) : 0;
    const longestSession = totalSessions > 0 ? Math.max(...sessions.map(s => s.durationSeconds)) : 0;
    const shortestSession = totalSessions > 0 ? Math.min(...sessions.map(s => s.durationSeconds)) : 0;

    let avgPerWeek = 0;
    if (totalSessions > 0) {
      const firstSession = new Date(sessions[sessions.length - 1].finishedAt);
      const weeksSince = Math.max(1, Math.ceil((Date.now() - firstSession.getTime()) / (7 * 24 * 60 * 60 * 1000)));
      avgPerWeek = Math.round((totalSessions / weeksSince) * 10) / 10;
    }

    const streak = getWeekStreak(sessions, weeklyGoal);
    const prs = getPersonalRecords(sessions);
    const progression = getExerciseProgression(sessions);
    const mostTrained = getMostTrainedExercise(sessions);
    const favoriteDay = getFavoriteDay(sessions);
    const bestMonth = getBestMonth(sessions);

    return {
      monthlyTotal, yearlyTotal, totalSessions, totalSeconds,
      avgDuration, longestSession, shortestSession, avgPerWeek,
      streak, prs, progression, mostTrained, favoriteDay, bestMonth,
    };
  }, [sessions, weeklyGoal]);

  const allStatCards: StatConfig[] = [
    { key: 'lastWorkout', label: 'Último treino', value: lastCompleted ? lastCompleted.dayName : '-' },
    { key: 'monthlyTotal', label: 'Treinos no mês', value: String(stats.monthlyTotal) },
    { key: 'yearlyTotal', label: 'Treinos no ano', value: String(stats.yearlyTotal) },
    { key: 'totalSessions', label: 'Total de treinos', value: String(stats.totalSessions) },
    { key: 'totalTime', label: 'Tempo total', value: formatDuration(stats.totalSeconds) },
    { key: 'streak', label: 'Sequência atual', value: `${stats.streak} ${stats.streak === 1 ? 'semana' : 'semanas'}` },
    { key: 'avgPerWeek', label: 'Média por semana', value: `${stats.avgPerWeek} treinos` },
    { key: 'avgDuration', label: 'Duração média', value: formatDuration(stats.avgDuration) },
    { key: 'longestSession', label: 'Mais longo', value: formatDuration(stats.longestSession) },
    { key: 'shortestSession', label: 'Mais curto', value: formatDuration(stats.shortestSession) },
  ];

  const handleCardPress = (key: HomeStatKey) => {
    if (selectMode) { toggle(key); }
  };

  const renderStatCard = (card: StatConfig) => {
    const isSelected = selected.includes(card.key);
    return (
      <StatCard
        key={card.key}
        $selected={isSelected}
        onPress={() => handleCardPress(card.key)}
        accessibilityLabel={card.label}
      >
        <StatLabel>{card.label}</StatLabel>
        <StatValue>{card.value}</StatValue>
        {isSelected && (
          <HomeBadge>
            <HomeBadgeText>home</HomeBadgeText>
          </HomeBadge>
        )}
      </StatCard>
    );
  };

  // Split stat cards into groups
  const generalCards = allStatCards.slice(0, 5);
  const weeklyCards = allStatCards.slice(5, 7);
  const sessionCards = allStatCards.slice(7, 10);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

      <Header>
        <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
        </BackButton>
        <HeaderTitle>Estatísticas</HeaderTitle>
      </Header>

      <ScrollContent showsVerticalScrollIndicator={false}>
        <Content>
          {stats.totalSessions === 0 ? (
            <EmptyText>Nenhum treino registrado ainda. Complete seu primeiro treino para ver suas estatísticas!</EmptyText>
          ) : (
            <>
              <SelectRow>
                <SelectLabel>Exibir na Home</SelectLabel>
                <Switch
                  value={selectMode}
                  onValueChange={setSelectMode}
                  trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                  thumbColor={selectMode ? colors.secondary : colors.neutral300}
                  accessibilityLabel="Selecionar estatísticas para a Home"
                />
              </SelectRow>
              {selectMode && (
                <SelectHint>Toque nas estatísticas para exibir na Home (máx. 3). {selected.length}/3 selecionadas.</SelectHint>
              )}

              {/* Bloco 1 — Resumo Geral */}
              <SectionTitle style={{ marginTop: 0 }}>Resumo Geral</SectionTitle>
              <StatsGrid>
                {generalCards.slice(0, 2).map(renderStatCard)}
              </StatsGrid>
              <StatsGrid style={{ marginTop: 8 }}>
                {generalCards.slice(2, 4).map(renderStatCard)}
              </StatsGrid>
              <StatsGrid style={{ marginTop: 8 }}>
                {generalCards.slice(4).map(renderStatCard)}
                <StatCard style={{ opacity: 0 }} disabled><StatLabel /><StatValue /></StatCard>
              </StatsGrid>

              {/* Bloco 2 — Desempenho Semanal */}
              <SectionTitle>Desempenho Semanal</SectionTitle>
              <StatsGrid>
                {weeklyCards.map(renderStatCard)}
              </StatsGrid>

              {/* Bloco 3 — Sessões */}
              <SectionTitle>Sessões</SectionTitle>
              <StatsGrid>
                {sessionCards.slice(0, 2).map(renderStatCard)}
              </StatsGrid>
              <StatsGrid style={{ marginTop: 8 }}>
                {sessionCards.slice(2).map(renderStatCard)}
                {/* Placeholder to keep grid uniform */}
                <StatCard style={{ opacity: 0 }} disabled><StatLabel /><StatValue /></StatCard>
              </StatsGrid>

              {/* Bloco 4 — Recordes Pessoais */}
              {stats.prs.length > 0 && (
                <>
                  <SectionTitle>Recordes Pessoais</SectionTitle>
                  {stats.prs.map(pr => (
                    <RecordRow key={pr.name}>
                      <RecordName>{pr.name}</RecordName>
                      <RecordValue>{pr.weight} kg</RecordValue>
                    </RecordRow>
                  ))}
                </>
              )}

              {/* Bloco 5 — Progressão de Carga */}
              {stats.progression.length > 0 && (
                <>
                  <SectionTitle>Progressão de Carga</SectionTitle>
                  {stats.progression.map(p => (
                    <ProgressionRow key={p.name}>
                      <ProgressionName>{p.name}</ProgressionName>
                      <ProgressionValues>{p.first}kg → {p.last}kg</ProgressionValues>
                      <ProgressionPercent $positive={p.percent > 0}>
                        {p.percent > 0 ? '+' : ''}{Math.round(p.percent)}%
                      </ProgressionPercent>
                    </ProgressionRow>
                  ))}
                </>
              )}

              {/* Bloco 6 — Curiosidades */}
              <SectionTitle>Curiosidades</SectionTitle>
              {stats.mostTrained && (
                <CuriosityCard>
                  <CuriosityLabel>Exercício mais treinado</CuriosityLabel>
                  <CuriosityValue>{stats.mostTrained}</CuriosityValue>
                </CuriosityCard>
              )}
              {stats.favoriteDay && (
                <CuriosityCard>
                  <CuriosityLabel>Dia da semana favorito</CuriosityLabel>
                  <CuriosityValue>{stats.favoriteDay}</CuriosityValue>
                </CuriosityCard>
              )}
              {stats.bestMonth && (
                <CuriosityCard>
                  <CuriosityLabel>Melhor mês</CuriosityLabel>
                  <CuriosityValue>{stats.bestMonth}</CuriosityValue>
                </CuriosityCard>
              )}
            </>
          )}
        </Content>
      </ScrollContent>
    </Container>
  );
};

export default StatisticsScreen;
