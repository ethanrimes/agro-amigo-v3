// ChartInsights - Standardized component for displaying insights below charts
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import Text from '../Text';

export interface Insight {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

interface ChartInsightsProps {
  insights: Insight[];
  title?: string;
}

const ChartInsights: React.FC<ChartInsightsProps> = ({ insights, title }) => {
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return colors.chart.positive;
      case 'down':
        return colors.chart.negative;
      default:
        return colors.text.secondary;
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  return (
    <View style={styles.container}>
      {title && (
        <Text variant="label" color={colors.text.secondary} style={styles.title}>
          {title}
        </Text>
      )}
      <View style={styles.insightsGrid}>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <View style={styles.insightHeader}>
              {insight.icon ? (
                <Ionicons
                  name={insight.icon as any}
                  size={14}
                  color={colors.primary[500]}
                  style={styles.insightIcon}
                />
              ) : (
                <View style={styles.bullet} />
              )}
              <Text variant="caption" color={colors.text.secondary}>
                {insight.label}
              </Text>
            </View>
            <View style={styles.insightValueRow}>
              <Text variant="bodyMd" weight="semibold">
                {insight.value}
              </Text>
              {insight.trend && insight.trend !== 'neutral' && (
                <Ionicons
                  name={getTrendIcon(insight.trend)}
                  size={16}
                  color={getTrendColor(insight.trend)}
                  style={styles.trendIcon}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginTop: spacing[3],
  },
  title: {
    marginBottom: spacing[3],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[2],
  },
  insightItem: {
    width: '50%',
    paddingHorizontal: spacing[2],
    marginBottom: spacing[3],
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
    marginRight: spacing[2],
  },
  insightIcon: {
    marginRight: spacing[2],
  },
  insightValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing[4],
  },
  trendIcon: {
    marginLeft: spacing[1],
  },
});

export default ChartInsights;
