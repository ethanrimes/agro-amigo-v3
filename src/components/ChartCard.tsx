// ChartCard - Card wrapper for charts with gear and table icons
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius, layout } from '../theme/spacing';
import Text from './Text';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onGearPress?: () => void;
  onTablePress?: () => void;
  showGear?: boolean;
  showTable?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  onGearPress,
  onTablePress,
  showGear = true,
  showTable = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="h6" weight="semibold">
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" color={colors.text.secondary}>
              {subtitle}
            </Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          {showTable && onTablePress && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onTablePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="grid-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
          {showGear && onGearPress && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onGearPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="settings-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginBottom: spacing[4],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  titleContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing[2],
  },
  content: {
    overflow: 'hidden',
  },
});

export default ChartCard;
