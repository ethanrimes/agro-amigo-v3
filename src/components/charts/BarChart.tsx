// BarChart component using D3 + react-native-svg
import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3';
import { colors } from '../../theme/colors';
import { layout, spacing } from '../../theme/spacing';
import Text from '../Text';

const SCREEN_WIDTH = Dimensions.get('window').width;

export interface BarDataPoint {
  label: string;
  value: number;
  valueMin?: number;
  valueMax?: number;
  color?: string;
}

interface BarChartProps {
  data: BarDataPoint[];
  width?: number;
  height?: number;
  horizontal?: boolean;
  showValues?: boolean;
  barColor?: string;
  formatValue?: (value: number) => string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = SCREEN_WIDTH - spacing[8],
  height = layout.chartHeight,
  horizontal = false,
  showValues = true,
  barColor = colors.chart.primary,
  formatValue = (v) => v.toLocaleString('es-CO'),
}) => {
  const padding = {
    top: 20,
    right: 20,
    bottom: horizontal ? 20 : 60,
    left: horizontal ? 100 : 60,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { xScale, yScale, maxValue } = useMemo(() => {
    const values = data.map(d => d.value);
    const maxVal = d3.max(values) || 100;

    if (horizontal) {
      const xScale = d3.scaleLinear()
        .domain([0, maxVal * 1.1])
        .range([0, chartWidth]);

      const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, chartHeight])
        .padding(0.3);

      return { xScale, yScale, maxValue: maxVal };
    } else {
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, chartWidth])
        .padding(0.3);

      const yScale = d3.scaleLinear()
        .domain([0, maxVal * 1.1])
        .range([chartHeight, 0]);

      return { xScale, yScale, maxValue: maxVal };
    }
  }, [data, chartWidth, chartHeight, horizontal]);

  if (data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text variant="bodySm" color={colors.text.tertiary} align="center">
          No hay datos disponibles
        </Text>
      </View>
    );
  }

  const yTicks = horizontal ? (xScale as d3.ScaleLinear<number, number>).ticks(5) : (yScale as d3.ScaleLinear<number, number>).ticks(5);

  return (
    <View style={[styles.container, { width }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="barGradient" x1="0%" y1="0%" x2={horizontal ? "100%" : "0%"} y2={horizontal ? "0%" : "100%"}>
            <Stop offset="0%" stopColor={barColor} stopOpacity={1} />
            <Stop offset="100%" stopColor={barColor} stopOpacity={0.7} />
          </LinearGradient>
        </Defs>

        <G transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <G key={`grid-${i}`}>
              {horizontal ? (
                <Line
                  x1={xScale(tick as number)}
                  x2={xScale(tick as number)}
                  y1={0}
                  y2={chartHeight}
                  stroke={colors.chart.grid}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              ) : (
                <Line
                  x1={0}
                  x2={chartWidth}
                  y1={yScale(tick as number)}
                  y2={yScale(tick as number)}
                  stroke={colors.chart.grid}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              )}
            </G>
          ))}

          {/* Axis labels */}
          {horizontal ? (
            // X-axis labels for horizontal
            yTicks.map((tick, i) => (
              <SvgText
                key={`x-label-${i}`}
                x={xScale(tick as number)}
                y={chartHeight + 16}
                fontSize={10}
                fill={colors.chart.axis}
                textAnchor="middle"
              >
                {formatValue(tick as number)}
              </SvgText>
            ))
          ) : (
            // Y-axis labels for vertical
            yTicks.map((tick, i) => (
              <SvgText
                key={`y-label-${i}`}
                x={-8}
                y={yScale(tick as number)}
                fontSize={10}
                fill={colors.chart.axis}
                textAnchor="end"
                alignmentBaseline="middle"
              >
                {formatValue(tick as number)}
              </SvgText>
            ))
          )}

          {/* Bars */}
          {data.map((item, i) => {
            const itemColor = item.color || barColor;

            if (horizontal) {
              const barHeight = (yScale as d3.ScaleBand<string>).bandwidth();
              const barWidth = (xScale as d3.ScaleLinear<number, number>)(item.value);
              const y = (yScale as d3.ScaleBand<string>)(item.label) || 0;

              return (
                <G key={`bar-${i}`}>
                  {/* Bar */}
                  <Rect
                    x={0}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={itemColor}
                    rx={4}
                    ry={4}
                  />
                  {/* Label */}
                  <SvgText
                    x={-8}
                    y={y + barHeight / 2}
                    fontSize={10}
                    fill={colors.text.secondary}
                    textAnchor="end"
                    alignmentBaseline="middle"
                  >
                    {item.label.length > 12 ? item.label.substring(0, 12) + '...' : item.label}
                  </SvgText>
                  {/* Value */}
                  {showValues && (
                    <SvgText
                      x={barWidth + 8}
                      y={y + barHeight / 2}
                      fontSize={10}
                      fill={colors.text.primary}
                      fontWeight="500"
                      alignmentBaseline="middle"
                    >
                      {formatValue(item.value)}
                    </SvgText>
                  )}
                </G>
              );
            } else {
              const barWidth = (xScale as d3.ScaleBand<string>).bandwidth();
              const barHeight = chartHeight - (yScale as d3.ScaleLinear<number, number>)(item.value);
              const x = (xScale as d3.ScaleBand<string>)(item.label) || 0;
              const y = (yScale as d3.ScaleLinear<number, number>)(item.value);

              return (
                <G key={`bar-${i}`}>
                  {/* Bar */}
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={itemColor}
                    rx={4}
                    ry={4}
                  />
                  {/* Label */}
                  <SvgText
                    x={x + barWidth / 2}
                    y={chartHeight + 16}
                    fontSize={10}
                    fill={colors.text.secondary}
                    textAnchor="middle"
                    transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight + 16})`}
                  >
                    {item.label.length > 8 ? item.label.substring(0, 8) + '...' : item.label}
                  </SvgText>
                  {/* Value on top */}
                  {showValues && (
                    <SvgText
                      x={x + barWidth / 2}
                      y={y - 8}
                      fontSize={10}
                      fill={colors.text.primary}
                      fontWeight="500"
                      textAnchor="middle"
                    >
                      {formatValue(item.value)}
                    </SvgText>
                  )}
                </G>
              );
            }
          })}

          {/* Axis lines */}
          <Line
            x1={0}
            x2={horizontal ? chartWidth : 0}
            y1={horizontal ? chartHeight : 0}
            y2={chartHeight}
            stroke={colors.chart.axis}
            strokeWidth={1}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BarChart;
