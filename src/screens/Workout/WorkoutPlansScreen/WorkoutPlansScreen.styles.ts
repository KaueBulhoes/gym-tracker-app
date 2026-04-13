import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.xxxl}px;
  padding-bottom: ${spacing.lg}px;
  background-color: ${colors.secondaryDark};
`;

export const BackButton = styled.Pressable`
  margin-right: ${spacing.md}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${colors.neutral50};
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
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

export const SelectRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.lg}px;
`;

export const SelectLabel = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

export const PlanCard = styled.Pressable<{ $active?: boolean; $selectMode?: boolean }>`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.base}px;
  margin-bottom: ${spacing.md}px;
  border-width: 2px;
  border-color: ${({ $active }) => ($active ? colors.primary : colors.neutral600)};
`;

export const PlanName = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

export const PlanDate = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xs}px;
`;

export const ActiveBadge = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${spacing.sm}px;
`;

export const ActiveBadgeText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.primary};
  margin-left: ${spacing.xs}px;
`;

export const EmptyText = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.textSecondary};
  text-align: center;
  margin-top: ${spacing.xxl}px;
`;

export const Footer = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.base}px;
`;

// ─── Modal de detalhes ────────────────────────────────

export const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: ${colors.overlay};
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.xl}px;
  width: 90%;
  max-height: 80%;
`;

export const ModalTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.text};
  margin-bottom: ${spacing.lg}px;
`;

export const ModalDayTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.primary};
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.xs}px;
`;

export const ModalExerciseName = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.textSecondary};
  padding-left: ${spacing.md}px;
  margin-top: ${spacing.xxs}px;
`;

export const ModalScroll = styled.ScrollView`
  max-height: 400px;
`;
