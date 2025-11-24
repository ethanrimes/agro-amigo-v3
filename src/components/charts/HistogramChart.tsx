// HistogramChart component for price distribution across markets
import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Line, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3';
import { colors } from '../../theme/colors';
import { layout, spacing } from '../../theme/spacing';
import Text from '../Text';

const SCREEN_WIDTH = Dimensions.get('window').width;

export interface HistogramDataPoint {
  x0: number;
  x1: number;
  count: number;
  items: string[];
}

interface HistogramChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  bins?: number;
  color?: string;
  formatValue?: (value: number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const HistogramChart: React.FC<HistogramChartProps> = ({
  data,
  labels = [],
  width = SCREEN_WIDTH - spacing[8],
  height = layout.chartHeight,
  bins = 10,
  color = colors.chart.primary,
  formatValue = (v) => v.toLocaleString('es-CO'),
  xAxisLabel = 'Precio (COP)',
  yAxisLabel = 'Mercados',
}) => {
  const padding = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { histogram, xScale, yScale, maxCount } = useMemo(() => {
    if (data.length === 0) {
      return { histogram: [], xScale: null, yScale: null, maxCount: 0 };
    }

    const minValue = d3.min(data) || 0;
    const maxValue = d3.max(data) || 100;

    const xScale = d3.scaleLinear()
      .domain([minValue * 0.95, maxValue * 1.05])
      .range([0, chartWidth]);

    const histogramGenerator = d3.bin<number, number>()
      .domain(xScale.domain() as [number, number])
      .thresholds(bins);

    const binsData = histogramGenerator(data);

    const histogramData: HistogramDataPoint[] = binsData.map((bin, index) => ({
      x0: bin.x0 || 0,
      x1: bin.x1 || 0,
      count: bin.length,
      items: labels.filter((_, i) => data[i] >= (bin.x0 || 0) && data[i] < (bin.x1 || 0)),
    }));

    const maxCount = d3.max(histogramData, d => d.count) || 1;

    const yScale = d3.scaleLinear()
      .domain([0, maxCount * 1.1])
      .range([chartHeight, 0]);

    return { histogram: histogramData, xScale, yScale, maxCount };
  }, [data, labels, chartWidth, chartHeight, bins]);

  if (data.length === 0 || !xScale || !yScale) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text variant="bodySm" color={colors.text.tertiary} align="center">
          No hay datos disponibles
        </Text>
      </View>
    );
  }

  const xTicks = xScale.ticks(5);
  const yTicks = yScale.ticks(5);

  return (
    <View style={[styles.container, { width }]}>
      <Svg width={width} height={height}>
        <G transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <Line
              key={`grid-${i}`}
              x1={0}
              x2={chartWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke={colors.chart.grid}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={-8}
              y={yScale(tick)}
              fontSize={10}
              fill={colors.chart.axis}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {tick}
            </SvgText>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={xScale(tick)}
              y={chartHeight + 16}
              fontSize={9}
              fill={colors.chart.axis}
              textAnchor="middle"
            >
              {formatValue(tick)}
            </SvgText>
          ))}

          {/* Histogram bars */}
          {histogram.map((bin, i) => {
            const barWidth = xScale(bin.x1) - xScale(bin.x0) - 2;
            const barHeight = chartHeight - yScale(bin.count);
            const x = xScale(bin.x0) + 1;
            const y = yScale(bin.count);

            return (
              <G key={`bin-${i}`}>
                <Rect
                  x={x}
                  y={y}
                  width={Math.max(barWidth, 0)}
                  height={barHeight}
                  fill={color}
                  opacity={0.8}
                  rx={2}
                  ry={2}
                />
                {bin.count > 0 && (
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 6}
                    fontSize={10}
                    fill={colors.text.primary}
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {bin.count}
                  </SvgText>
                )}
              </G>
            );
          })}

          {/* Axes */}
          <Line
            x1={0}
            x2={chartWidth}
            y1={chartHeight}
            y2={chartHeight}
            stroke={colors.chart.axis}
            strokeWidth={1}
          />
          <Line
            x1={0}
            x2={0}
            y1={0}
            y2={chartHeight}
            stroke={colors.chart.axis}
            strokeWidth={1}
          />

          {/* Axis labels */}
          <SvgText
            x={chartWidth / 2}
            y={chartHeight + 36}
            fontSize={11}
            fill={colors.text.secondary}
            textAnchor="middle"
          >
            {xAxisLabel}
          </SvgText>
          <SvgText
            x={-chartHeight / 2}
            y={-36}
            fontSize={11}
            fill={colors.text.secondary}
            textAnchor="middle"
            transform={`rotate(-90)`}
          >
            {yAxisLabel}
          </SvgText>
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

export default HistogramChart;
