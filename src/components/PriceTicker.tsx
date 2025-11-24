// PriceTicker - Display price information with animation
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius, layout } from '../theme/spacing';
import Text from './Text';
import { formatCurrency, formatShortDate } from '../data/mockData';

interface PriceTickerProps {
  producto: string;
  presentacion: string;
  mercado: string;
  municipio: string;
  fecha: string;
  precioMinimo: number;
  precioMaximo: number;
  variacionDiaria?: number;
  onPress?: () => void;
  compact?: boolean;
}

const PriceTicker: React.FC<PriceTickerProps> = ({
  producto,
  presentacion,
  mercado,
  municipio,
  fecha,
  precioMinimo,
  precioMaximo,
  variacionDiaria = 0,
  onPress,
  compact = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Subtle pulse animation for the price
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const isPositive = variacionDiaria > 0;
  const isNegative = variacionDiaria < 0;
  const variacionColor = isPositive
    ? colors.chart.negative // Higher prices = red
    : isNegative
    ? colors.chart.positive // Lower prices = green
    : colors.text.tertiary;

  const content = (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View style={styles.header}>
        <Text variant="label" weight="semibold" numberOfLines={1} style={styles.producto}>
          {producto}
        </Text>
        {variacionDiaria !== 0 && (
          <View style={[styles.variacionBadge, { backgroundColor: variacionColor + '20' }]}>
            <Ionicons
              name={isPositive ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={variacionColor}
            />
            <Text variant="caption" weight="medium" color={variacionColor}>
              {Math.abs(variacionDiaria).toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

      <Animated.View style={[styles.priceRow, { transform: [{ scale: pulseAnim }] }]}>
        <Text variant={compact ? 'h5' : 'h4'} weight="bold" color={colors.primary[700]}>
          {formatCurrency(precioMinimo)}
        </Text>
        <Text variant={compact ? 'bodySm' : 'bodyMd'} color={colors.text.tertiary}>
          {' - '}
        </Text>
        <Text variant={compact ? 'h5' : 'h4'} weight="bold" color={colors.primary[700]}>
          {formatCurrency(precioMaximo)}
        </Text>
      </Animated.View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={12} color={colors.text.tertiary} />
          <Text variant="caption" color={colors.text.secondary} style={styles.detailText}>
            {presentacion}
          </Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={colors.text.tertiary} />
          <Text variant="caption" color={colors.text.secondary} numberOfLines={1} style={styles.detailText}>
            {municipio}, {mercado}
          </Text>
        </View>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
          <Text variant="caption" color={colors.text.tertiary} style={styles.detailText}>
            {formatShortDate(fecha)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...layout.cardShadow,
  },
  containerCompact: {
    padding: spacing[3],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  producto: {
    flex: 1,
    marginRight: spacing[2],
  },
  variacionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing[2],
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing[2],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  detailText: {
    marginLeft: spacing[1],
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PriceTicker;
