/**
 * LineChart Component
 * D3.js powered line chart with react-native-svg
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Line, Circle, Text as SvgText, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { formatPrice, formatDateShort, calculateStats, formatPercent } from '@/utils/formatting';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DataPoint {
  date: string;
  value: number;
  min?: number;
  max?: number;
}

interface ChartSeries {
  id: string;
  label: string;
  data: DataPoint[];
  color: string;
}

interface LineChartProps {
  series: ChartSeries[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showArea?: boolean;
  showDots?: boolean;
  showTooltip?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
  showInsights?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  series,
  width = SCREEN_WIDTH - 40,
  height = 250,
  showGrid = true,
  showArea = true,
  showDots = false,
  yAxisLabel = 'Precio (COP)',
  xAxisLabel,
  showInsights = true,
}) => {
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const { xScale, yScale, linePath, areaPath, xTicks, yTicks, allData, insights } = useMemo(() => {
    // Combine all data points to find domain
    const allData = series.flatMap((s) => s.data);
    if (allData.length === 0) {
      return { xScale: null, yScale: null, linePath: null, areaPath: null, xTicks: [], yTicks: [], allData: [], insights: null };
    }

    const dates = allData.map((d) => new Date(d.date));
    const values = allData.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);

    // Add padding to y domain
    const yPadding = (maxVal - minVal) * 0.1 || maxVal * 0.1;

    const xScale = d3
      .scaleTime()
      .domain([d3.min(dates) as Date, d3.max(dates) as Date])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([Math.max(0, minVal - yPadding), maxVal + yPadding])
      .range([chartHeight, 0])
      .nice();

    // Line generator
    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Area generator
    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => xScale(new Date(d.date)))
      .y0(chartHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const linePath = series.map((s) => ({
      id: s.id,
      color: s.color,
      d: lineGenerator(s.data) || '',
    }));

    const areaPath = series.map((s) => ({
      id: s.id,
      color: s.color,
      d: areaGenerator(s.data) || '',
    }));

    // Generate ticks
    const xTicks = xScale.ticks(5).map((d) => ({
      value: d,
      x: xScale(d),
      label: formatDateShort(d.toISOString()),
    }));

    const yTicks = yScale.ticks(5).map((d) => ({
      value: d,
      y: yScale(d),
      label: formatPrice(d),
    }));

    // Calculate insights for primary series
    if (series.length > 0) {
      const primaryData = series[0].data;
      const stats = calculateStats(primaryData.map((d) => d.value));
      const firstValue = primaryData[0]?.value || 0;
      const lastValue = primaryData[primaryData.length - 1]?.value || 0;
      const percentChange = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

      return {
        xScale,
        yScale,
        linePath,
        areaPath,
        xTicks,
        yTicks,
        allData,
        insights: {
          min: stats.min,
          max: stats.max,
          avg: stats.avg,
          percentChange,
          volatility: stats.stdDev / stats.avg * 100,
        },
      };
    }

    return { xScale, yScale, linePath, areaPath, xTicks, yTicks, allData, insights: null };
  }, [series, chartWidth, chartHeight]);

  if (!xScale || !yScale || allData.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noDataText}>No hay datos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Defs>
          {series.map((s) => (
            <LinearGradient key={`gradient-${s.id}`} id={`gradient-${s.id}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <Stop offset="100%" stopColor={s.color} stopOpacity={0.05} />
            </LinearGradient>
          ))}
        </Defs>

        <G transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {showGrid &&
            yTicks.map((tick, i) => (
              <Line
                key={`grid-y-${i}`}
                x1={0}
                x2={chartWidth}
                y1={tick.y}
                y2={tick.y}
                stroke={Colors.light.chartGrid}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}

          {/* Area fills */}
          {showArea &&
            areaPath?.map((path) => (
              <Path
                key={`area-${path.id}`}
                d={path.d}
                fill={`url(#gradient-${path.id})`}
              />
            ))}

          {/* Lines */}
          {linePath?.map((path) => (
            <Path
              key={`line-${path.id}`}
              d={path.d}
              fill="none"
              stroke={path.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots */}
          {showDots &&
            series.map((s) =>
              s.data.map((d, i) => (
                <Circle
                  key={`dot-${s.id}-${i}`}
                  cx={xScale(new Date(d.date))}
                  cy={yScale(d.value)}
                  r={3}
                  fill={s.color}
                />
              ))
            )}

          {/* X Axis */}
          <Line
            x1={0}
            x2={chartWidth}
            y1={chartHeight}
            y2={chartHeight}
            stroke={Colors.light.chartAxis}
            strokeWidth={1}
          />

          {/* X Axis Labels */}
          {xTicks.map((tick, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={tick.x}
              y={chartHeight + 20}
              fill={Colors.light.textSecondary}
              fontSize={10}
              textAnchor="middle"
            >
              {tick.label}
            </SvgText>
          ))}

          {/* Y Axis */}
          <Line
            x1={0}
            x2={0}
            y1={0}
            y2={chartHeight}
            stroke={Colors.light.chartAxis}
            strokeWidth={1}
          />

          {/* Y Axis Labels */}
          {yTicks.map((tick, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={-10}
              y={tick.y + 4}
              fill={Colors.light.textSecondary}
              fontSize={10}
              textAnchor="end"
            >
              {tick.label}
            </SvgText>
          ))}
        </G>
      </Svg>

      {/* Legend */}
      {series.length > 1 && (
        <View style={styles.legend}>
          {series.map((s) => (
            <View key={s.id} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: s.color }]} />
              <Text style={styles.legendLabel} numberOfLines={1}>{s.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Insights */}
      {showInsights && insights && (
        <View style={styles.insights}>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Variación</Text>
            <Text
              style={[
                styles.insightValue,
                { color: insights.percentChange >= 0 ? Colors.light.chartPositive : Colors.light.chartNegative },
              ]}
            >
              {formatPercent(insights.percentChange)}
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Rango</Text>
            <Text style={styles.insightValue}>
              ${formatPrice(insights.min)} - ${formatPrice(insights.max)}
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Promedio</Text>
            <Text style={styles.insightValue}>${formatPrice(insights.avg)}</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Volatilidad</Text>
            <Text style={styles.insightValue}>{insights.volatility.toFixed(1)}%</Text>
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
    marginTop: 100,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendColor: {
    width: 12,
    height: 3,
    borderRadius: 1.5,
  },
  legendLabel: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    maxWidth: 100,
  },
  insights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.lg,
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  insightItem: {
    alignItems: 'center',
    minWidth: 70,
  },
  insightLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginBottom: 2,
  },
  insightValue: {
    ...Typography.label,
    color: Colors.light.text,
  },
});

export default LineChart;
