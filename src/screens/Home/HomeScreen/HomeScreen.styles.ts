import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const ScrollContent = styled.ScrollView``;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${colors.secondaryDark};
`;

export const HeaderContent = styled.View`
  flex: 1;
`;

export const WelcomeText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.neutral200};
`;

export const UserName = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${colors.neutral50};
  margin-top: ${spacing.xxs}px;
`;

export const ProfileButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.15);
  align-items: center;
  justify-content: center;
`;

export const ContentArea = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: 100px;
  gap: ${spacing.base}px;
`;

export const GoalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GoalTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const GoalTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.neutral50};
`;

export const GoalCount = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
`;

export const ProgressBarWrapper = styled.View`
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.sm}px;
`;

export const GoalMotivation = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.neutral200};
`;

export const MetricsRow = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

export const MetricCard = styled.View`
  flex: 1;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
  padding: ${spacing.md}px;
  align-items: center;
  gap: ${spacing.xxs}px;
`;

export const MetricValue = styled.Text`
  font-size: ${typography.numberSmall.fontSize}px;
  font-weight: ${typography.numberSmall.fontWeight};
  color: ${colors.text};
`;

export const MetricValueLarge = styled.Text`
  font-size: ${typography.number.fontSize}px;
  font-weight: ${typography.number.fontWeight};
  color: ${colors.text};
  flex: 1;
  text-align-vertical: center;
`;

export const MetricLabel = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.textSecondary};
`;

export const MetricSub = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.neutral400};
`;

export const SectionTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.text};
  margin-top: ${spacing.sm}px;
`;

export const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-vertical: ${spacing.sm}px;
  padding-bottom: ${spacing.md}px;
  background-color: ${colors.backgroundElevated};
  border-top-width: 1px;
  border-top-color: ${colors.neutral600};
`;

export const BottomBarButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  gap: ${spacing.xxs}px;
  flex: 1;
`;

export const BottomBarLabel = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.neutral300};
`;

export const BottomBarStartButton = styled.Pressable<{ $disabled?: boolean }>`
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${colors.primary};
  margin-top: -${spacing.xl}px;
  elevation: 6;
  shadow-color: ${colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.35;
  shadow-radius: 8px;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

export const BottomBarStartLabel = styled.Text`
  font-size: 10px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.textInverse};
  margin-top: 1px;
`;

export const WorkoutList = styled.View`
  gap: ${spacing.sm}px;
`;

export const WorkoutAccordion = styled.Pressable<{ $isNext: boolean }>`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ $isNext }) =>
    $isNext ? colors.primary : colors.neutral600};
  overflow: hidden;
`;

export const WorkoutAccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.cardPadding}px;
`;

export const WorkoutAccordionLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const WorkoutIconContainer = styled.View<{ $isNext: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $isNext }) =>
    $isNext ? 'rgba(255, 214, 10, 0.15)' : colors.backgroundHighlight};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

export const WorkoutAccordionInfo = styled.View`
  flex: 1;
`;

export const WorkoutAccordionTitle = styled.Text<{ $isNext: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $isNext }) => ($isNext ? colors.primary : colors.text)};
`;

export const WorkoutAccordionSubtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;

export const WorkoutAccordionRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const NextBadge = styled.View`
  background-color: rgba(255, 214, 10, 0.15);
  padding-horizontal: ${spacing.sm}px;
  padding-vertical: ${spacing.xxs}px;
  border-radius: ${spacing.buttonRadius}px;
`;

export const NextBadgeText = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.primary};
`;

export const WorkoutAccordionBody = styled.View`
  padding-horizontal: ${spacing.cardPadding}px;
  padding-bottom: ${spacing.cardPadding}px;
  border-top-width: 1px;
  border-top-color: ${colors.neutral600};
`;

export const WorkoutDetail = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-top: ${spacing.md}px;
`;

export const WorkoutDetailText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
`;

export const ProfileMenuOverlay = styled.Pressable`
  flex: 1;
  background-color: ${colors.overlay};
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 90px;
  padding-right: ${spacing.screenHorizontal}px;
`;

export const ProfileMenuCard = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
  min-width: 180px;
  overflow: hidden;
`;

export const ProfileMenuItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  padding-horizontal: ${spacing.base}px;
  padding-vertical: ${spacing.md}px;
`;

export const ProfileMenuItemText = styled.Text<{ $danger?: boolean }>`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ $danger }) => ($danger ? colors.error : colors.text)};
`;

export const ProfileMenuDivider = styled.View`
  height: 1px;
  background-color: ${colors.neutral600};
`;
