import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, typography } from '../../../constants';

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'] as const,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.xxxl}px;
  padding-bottom: ${spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
`;

export const BackButton = styled.Pressable`
  margin-right: ${spacing.md}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.xl}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${spacing.xl}px;
  margin-bottom: ${spacing.md}px;
`;

export const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
`;

export const StatCard = styled.Pressable<{ $selected?: boolean }>`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.base}px;
  flex: 1;
  min-width: 45%;
  border-width: 2px;
  border-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : 'transparent'};
`;

export const HomeBadge = styled.View`
  position: absolute;
  bottom: ${spacing.xs}px;
  right: ${spacing.xs}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding-horizontal: ${spacing.xs}px;
  padding-vertical: 2px;
`;

export const HomeBadgeText = styled.Text`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textInverse};
  text-transform: uppercase;
`;

export const SelectRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xs}px;
`;

export const SelectLabel = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectHint = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${spacing.md}px;
`;

export const StatLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatValue = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${spacing.xs}px;
`;

export const StatUnit = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RecordRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.md}px ${spacing.base}px;
  margin-bottom: ${spacing.sm}px;
`;

export const RecordName = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const RecordValue = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.md}px ${spacing.base}px;
  margin-bottom: ${spacing.sm}px;
`;

export const ProgressionName = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const ProgressionValues = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressionPercent = styled.Text<{ $positive?: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.textSecondary};
  margin-left: ${spacing.sm}px;
`;

export const EmptyText = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: ${spacing.xxl}px;
`;

export const CuriosityCard = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.base}px;
  margin-bottom: ${spacing.sm}px;
`;

export const CuriosityLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CuriosityValue = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${spacing.xs}px;
`;
