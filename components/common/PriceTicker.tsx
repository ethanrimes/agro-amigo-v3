/**
 * PriceTicker Component
 * Animated price display tile for watchlist
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar } from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, AgroColors } from '@/constants/theme';
import { PrecioObservacion } from '@/types';
import { formatPrice, formatDate, calculatePercentChange } from '@/utils/formatting';

interface PriceTickerProps {
  currentPrice: PrecioObservacion;
  previousPrice?: PrecioObservacion;
  productoNombre: string;
  presentacionNombre: string;
  mercadoNombre: string;
  ciudad: string;
  onPress: () => void;
  animated?: boolean;
}

export const PriceTicker: React.FC<PriceTickerProps> = ({
  currentPrice,
  previousPrice,
  productoNombre,
  presentacionNombre,
  mercadoNombre,
  ciudad,
  onPress,
  animated = true,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const percentChange = previousPrice
    ? calculatePercentChange(
        previousPrice.precioPromedio || (previousPrice.precioMinimo + previousPrice.precioMaximo) / 2,
        currentPrice.precioPromedio || (currentPrice.precioMinimo + currentPrice.precioMaximo) / 2
      )
    : 0;

  const trend: 'up' | 'down' | 'neutral' =
    percentChange > 0.5 ? 'up' : percentChange < -0.5 ? 'down' : 'neutral';

  useEffect(() => {
    if (animated) {
      // Subtle pulse animation
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      // Glow animation for price changes
      if (trend !== 'neutral') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: false,
            }),
          ])
        ).start();
      }

      return () => {
        pulse.stop();
      };
    }
  }, [animated, trend]);

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return Colors.light.chartPositive;
      case 'down':
        return Colors.light.chartNegative;
      default:
        return Colors.light.textSecondary;
    }
  };

  const getTrendIcon = () => {
    const color = getTrendColor();
    const size = 16;
    switch (trend) {
      case 'up':
        return <TrendingUp size={size} color={color} />;
      case 'down':
        return <TrendingDown size={size} color={color} />;
      default:
        return <Minus size={size} color={color} />;
    }
  };

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.light.border, getTrendColor()],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: pulseAnim }] },
          animated && trend !== 'neutral' && { borderColor },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.productName} numberOfLines={1}>
            {productoNombre}
          </Text>
          <View style={styles.trendContainer}>
            {getTrendIcon()}
            <Text style={[styles.trendText, { color: getTrendColor() }]}>
              {percentChange > 0 ? '+' : ''}
              {percentChange.toFixed(2)}%
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceRange}>
            ${formatPrice(currentPrice.precioMinimo)} - ${formatPrice(currentPrice.precioMaximo)}
          </Text>
          <Text style={styles.priceUnit}>COP</Text>
        </View>

        <View style={styles.presentacion}>
          <Text style={styles.presentacionText}>{presentacionNombre}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <MapPin size={12} color={Colors.light.textTertiary} />
            <Text style={styles.footerText} numberOfLines={1}>
              {ciudad}, {mercadoNombre}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Calendar size={12} color={Colors.light.textTertiary} />
            <Text style={styles.footerText}>{formatDate(currentPrice.fecha)}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    width: 200,
    marginRight: Spacing.md,
    ...Shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  productName: {
    ...Typography.label,
    color: Colors.light.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  priceRange: {
    ...Typography.priceMain,
    fontSize: 20,
    color: Colors.light.text,
  },
  priceUnit: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginLeft: Spacing.xs,
  },
  presentacion: {
    backgroundColor: AgroColors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  presentacionText: {
    ...Typography.caption,
    color: AgroColors.primary[700],
  },
  footer: {
    gap: Spacing.xs,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    flex: 1,
  },
});

export default PriceTicker;
