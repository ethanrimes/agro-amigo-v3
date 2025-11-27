/**
 * BarChart Component
 * D3.js powered bar chart with react-native-svg
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, G } from 'react-native-svg';
import * as d3 from 'd3';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { formatPrice } from '@/utils/formatting';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  horizontal?: boolean;
  showValues?: boolean;
  barColor?: string;
  yAxisLabel?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = SCREEN_WIDTH - 40,
  height = 250,
  horizontal = false,
  showValues = true,
  barColor = Colors.light.chartPrimary,
  yAxisLabel,
}) => {
  const margin = horizontal
    ? { top: 20, right: 40, bottom: 20, left: 100 }
    : { top: 20, right: 20, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const { xScale, yScale, bars } = useMemo(() => {
    if (data.length === 0) {
      return { xScale: null, yScale: null, bars: [] };
    }

    if (horizontal) {
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) as number])
        .range([0, chartWidth])
        .nice();

      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartHeight])
        .padding(0.3);

      const bars = data.map((d) => ({
        x: 0,
        y: yScale(d.label) || 0,
        width: xScale(d.value),
        height: yScale.bandwidth(),
        value: d.value,
        label: d.label,
        color: d.color || barColor,
      }));

      return { xScale, yScale, bars };
    } else {
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartWidth])
        .padding(0.3);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) as number])
        .range([chartHeight, 0])
        .nice();

      const bars = data.map((d) => ({
        x: xScale(d.label) || 0,
        y: yScale(d.value),
        width: xScale.bandwidth(),
        height: chartHeight - yScale(d.value),
        value: d.value,
        label: d.label,
        color: d.color || barColor,
      }));

      return { xScale, yScale, bars };
    }
  }, [data, chartWidth, chartHeight, horizontal, barColor]);

  if (!xScale || !yScale || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noDataText}>No hay datos disponibles</Text>
      </View>
    );
  }

  const yTicks = horizontal
    ? []
    : (yScale as d3.ScaleLinear<number, number>).ticks(5).map((d) => ({
        value: d,
        y: (yScale as d3.ScaleLinear<number, number>)(d),
        label: formatPrice(d),
      }));

  const xTicks = horizontal
    ? (xScale as d3.ScaleLinear<number, number>).ticks(5).map((d) => ({
        value: d,
        x: (xScale as d3.ScaleLinear<number, number>)(d),
        label: formatPrice(d),
      }))
    : [];

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <G transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {!horizontal &&
            yTicks.map((tick, i) => (
              <Line
                key={`grid-${i}`}
                x1={0}
                x2={chartWidth}
                y1={tick.y}
                y2={tick.y}
                stroke={Colors.light.chartGrid}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}

          {horizontal &&
            xTicks.map((tick, i) => (
              <Line
                key={`grid-${i}`}
                x1={tick.x}
                x2={tick.x}
                y1={0}
                y2={chartHeight}
                stroke={Colors.light.chartGrid}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}

          {/* Bars */}
          {bars.map((bar, i) => (
            <G key={`bar-${i}`}>
              <Rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
                rx={4}
              />
              {showValues && !horizontal && (
                <SvgText
                  x={bar.x + bar.width / 2}
                  y={bar.y - 5}
                  fill={Colors.light.textSecondary}
                  fontSize={10}
                  textAnchor="middle"
                >
                  {formatPrice(bar.value)}
                </SvgText>
              )}
              {showValues && horizontal && (
                <SvgText
                  x={bar.width + 5}
                  y={bar.y + bar.height / 2 + 4}
                  fill={Colors.light.textSecondary}
                  fontSize={10}
                  textAnchor="start"
                >
                  {formatPrice(bar.value)}
                </SvgText>
              )}
            </G>
          ))}

          {/* Axes */}
          {!horizontal && (
            <>
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
              {bars.map((bar, i) => (
                <SvgText
                  key={`x-label-${i}`}
                  x={bar.x + bar.width / 2}
                  y={chartHeight + 15}
                  fill={Colors.light.textSecondary}
                  fontSize={9}
                  textAnchor="middle"
                  transform={`rotate(-45, ${bar.x + bar.width / 2}, ${chartHeight + 15})`}
                >
                  {bar.label.length > 10 ? bar.label.substring(0, 10) + '...' : bar.label}
                </SvgText>
              ))}
              {/* Y Labels */}
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
            </>
          )}

          {horizontal && (
            <>
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
              {/* Y Labels (categories) */}
              {bars.map((bar, i) => (
                <SvgText
                  key={`y-label-${i}`}
                  x={-5}
                  y={bar.y + bar.height / 2 + 4}
                  fill={Colors.light.textSecondary}
                  fontSize={10}
                  textAnchor="end"
                >
                  {bar.label.length > 12 ? bar.label.substring(0, 12) + '...' : bar.label}
                </SvgText>
              ))}
              {/* X Labels */}
              {xTicks.map((tick, i) => (
                <SvgText
                  key={`x-label-${i}`}
                  x={tick.x}
                  y={chartHeight + 15}
                  fill={Colors.light.textSecondary}
                  fontSize={10}
                  textAnchor="middle"
                >
                  {tick.label}
                </SvgText>
              ))}
            </>
          )}
        </G>
      </Svg>
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
});

export default BarChart;
