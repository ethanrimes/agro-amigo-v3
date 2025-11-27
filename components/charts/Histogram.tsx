/**
 * Histogram Component
 * Distribution chart for price comparisons across markets
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, G } from 'react-native-svg';
import * as d3 from 'd3';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { formatPrice, calculateStats } from '@/utils/formatting';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HistogramDataPoint {
  value: number;
  label?: string;
}

interface HistogramProps {
  data: HistogramDataPoint[];
  width?: number;
  height?: number;
  bins?: number;
  barColor?: string;
  showStats?: boolean;
  xAxisLabel?: string;
}

export const Histogram: React.FC<HistogramProps> = ({
  data,
  width = SCREEN_WIDTH - 40,
  height = 200,
  bins = 10,
  barColor = Colors.light.chartPrimary,
  showStats = true,
  xAxisLabel = 'Precio (COP)',
}) => {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const { histogram, xScale, yScale, stats } = useMemo(() => {
    if (data.length === 0) {
      return { histogram: [], xScale: null, yScale: null, stats: null };
    }

    const values = data.map((d) => d.value);
    const minVal = d3.min(values) as number;
    const maxVal = d3.max(values) as number;

    // Create histogram bins
    const xScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([0, chartWidth])
      .nice();

    const histogramGenerator = d3
      .bin()
      .domain(xScale.domain() as [number, number])
      .thresholds(xScale.ticks(bins));

    const histogram = histogramGenerator(values);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(histogram, (d) => d.length) as number])
      .range([chartHeight, 0])
      .nice();

    const stats = calculateStats(values);

    return { histogram, xScale, yScale, stats };
  }, [data, bins, chartWidth, chartHeight]);

  if (!xScale || !yScale || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noDataText}>No hay datos disponibles</Text>
      </View>
    );
  }

  const xTicks = xScale.ticks(5);
  const yTicks = yScale.ticks(4);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <G transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <Line
              key={`grid-${i}`}
              x1={0}
              x2={chartWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke={Colors.light.chartGrid}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          ))}

          {/* Bars */}
          {histogram.map((bin, i) => {
            const barWidth = xScale(bin.x1 as number) - xScale(bin.x0 as number) - 2;
            return (
              <Rect
                key={`bar-${i}`}
                x={xScale(bin.x0 as number) + 1}
                y={yScale(bin.length)}
                width={Math.max(0, barWidth)}
                height={chartHeight - yScale(bin.length)}
                fill={barColor}
                opacity={0.8}
                rx={2}
              />
            );
          })}

          {/* Median line */}
          {stats && (
            <Line
              x1={xScale(stats.median)}
              x2={xScale(stats.median)}
              y1={0}
              y2={chartHeight}
              stroke={Colors.light.chartNegative}
              strokeWidth={2}
              strokeDasharray="4,4"
            />
          )}

          {/* Axes */}
          <Line
            x1={0}
            x2={chartWidth}
            y1={chartHeight}
            y2={chartHeight}
            stroke={Colors.light.chartAxis}
            strokeWidth={1}
          />
          <Line
            x1={0}
            x2={0}
            y1={0}
            y2={chartHeight}
            stroke={Colors.light.chartAxis}
            strokeWidth={1}
          />

          {/* X Labels */}
          {xTicks.map((tick, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={xScale(tick)}
              y={chartHeight + 20}
              fill={Colors.light.textSecondary}
              fontSize={10}
              textAnchor="middle"
            >
              {formatPrice(tick)}
            </SvgText>
          ))}

          {/* Y Labels */}
          {yTicks.map((tick, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={-10}
              y={yScale(tick) + 4}
              fill={Colors.light.textSecondary}
              fontSize={10}
              textAnchor="end"
            >
              {tick}
            </SvgText>
          ))}

          {/* X Axis Label */}
          <SvgText
            x={chartWidth / 2}
            y={chartHeight + 40}
            fill={Colors.light.textSecondary}
            fontSize={11}
            textAnchor="middle"
          >
            {xAxisLabel}
          </SvgText>
        </G>
      </Svg>

      {/* Statistics */}
      {showStats && stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Mediana</Text>
            <Text style={styles.statValue}>${formatPrice(stats.median)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>P25-P75</Text>
            <Text style={styles.statValue}>
              ${formatPrice(stats.p25 || 0)} - ${formatPrice(stats.p75 || 0)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Mín - Máx</Text>
            <Text style={styles.statValue}>
              ${formatPrice(stats.min)} - ${formatPrice(stats.max)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  noDataText: {
    ...Typography.body,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    marginTop: 80,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginBottom: 2,
  },
  statValue: {
    ...Typography.label,
    color: Colors.light.text,
  },
});

export default Histogram;
