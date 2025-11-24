// LineChart component using D3 + react-native-svg
import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Line, Text as SvgText, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3';
import { colors } from '../../theme/colors';
import { layout, spacing } from '../../theme/spacing';
import Text from '../Text';

const SCREEN_WIDTH = Dimensions.get('window').width;

export interface DataPoint {
  date: Date;
  value: number;
  valueMin?: number;
  valueMax?: number;
}

export interface ChartSeriesData {
  id: string;
  name: string;
  color: string;
  data: DataPoint[];
}

interface LineChartProps {
  data: ChartSeriesData[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showArea?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  yAxisLabel?: string;
  formatYValue?: (value: number) => string;
  formatXValue?: (date: Date) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = SCREEN_WIDTH - spacing[8],
  height = layout.chartHeight,
  showGrid = true,
  showArea = true,
  showDots = false,
  showLegend = true,
  yAxisLabel = 'COP',
  formatYValue = (v) => v.toLocaleString('es-CO'),
  formatXValue = (d) => d.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }),
}) => {
  const padding = layout.chartPadding;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { xScale, yScale, allDates, minY, maxY } = useMemo(() => {
    const allPoints = data.flatMap(series => series.data);
    const dates = allPoints.map(d => d.date);
    const values = allPoints.flatMap(d => [d.value, d.valueMin, d.valueMax].filter(Boolean) as number[]);

    const minDate = d3.min(dates) || new Date();
    const maxDate = d3.max(dates) || new Date();
    const minValue = d3.min(values) || 0;
    const maxValue = d3.max(values) || 100;

    // Add padding to y-axis
    const yPadding = (maxValue - minValue) * 0.1;

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([Math.max(0, minValue - yPadding), maxValue + yPadding])
      .range([chartHeight, 0]);

    return {
      xScale,
      yScale,
      allDates: dates,
      minY: Math.max(0, minValue - yPadding),
      maxY: maxValue + yPadding,
    };
  }, [data, chartWidth, chartHeight]);

  const lineGenerator = d3.line<DataPoint>()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const areaGenerator = d3.area<DataPoint>()
    .x(d => xScale(d.date))
    .y0(chartHeight)
    .y1(d => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const yTicks = yScale.ticks(5);
  const xTicks = xScale.ticks(5);

  if (data.length === 0 || data.every(s => s.data.length === 0)) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text variant="bodySm" color={colors.text.tertiary} align="center">
          No hay datos disponibles
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width }]}>
      <Svg width={width} height={height}>
        <Defs>
          {data.map((series, index) => (
            <LinearGradient
              key={`gradient-${series.id}`}
              id={`gradient-${series.id}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={series.color} stopOpacity={0.3} />
              <Stop offset="100%" stopColor={series.color} stopOpacity={0.05} />
            </LinearGradient>
          ))}
        </Defs>

        <G transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Background grid */}
          {showGrid && yTicks.map((tick, i) => (
            <G key={`y-grid-${i}`}>
              <Line
                x1={0}
                x2={chartWidth}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke={colors.chart.grid}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            </G>
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
              {formatYValue(tick)}
            </SvgText>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={xScale(tick)}
              y={chartHeight + 16}
              fontSize={10}
              fill={colors.chart.axis}
              textAnchor="middle"
            >
              {formatXValue(tick)}
            </SvgText>
          ))}

          {/* Area fills */}
          {showArea && data.map((series) => (
            <Path
              key={`area-${series.id}`}
              d={areaGenerator(series.data) || ''}
              fill={`url(#gradient-${series.id})`}
            />
          ))}

          {/* Lines */}
          {data.map((series, index) => (
            <Path
              key={`line-${series.id}`}
              d={lineGenerator(series.data) || ''}
              fill="none"
              stroke={series.color}
              strokeWidth={index === 0 ? 2.5 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots for last point */}
          {data.map((series) => {
            const lastPoint = series.data[series.data.length - 1];
            if (!lastPoint) return null;
            return (
              <G key={`dot-${series.id}`}>
                <Circle
                  cx={xScale(lastPoint.date)}
                  cy={yScale(lastPoint.value)}
                  r={5}
                  fill={colors.background.primary}
                  stroke={series.color}
                  strokeWidth={2}
                />
              </G>
            );
          })}

          {/* Show all dots if enabled */}
          {showDots && data.map((series) =>
            series.data.map((point, i) => (
              <Circle
                key={`dot-${series.id}-${i}`}
                cx={xScale(point.date)}
                cy={yScale(point.value)}
                r={3}
                fill={series.color}
              />
            ))
          )}

          {/* Bottom axis line */}
          <Line
            x1={0}
            x2={chartWidth}
            y1={chartHeight}
            y2={chartHeight}
            stroke={colors.chart.axis}
            strokeWidth={1}
          />
        </G>
      </Svg>

      {/* Legend */}
      {showLegend && data.length > 1 && (
        <View style={styles.legendContainer}>
          {data.map((series) => (
            <View key={series.id} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: series.color }]} />
              <Text variant="caption" color={colors.text.secondary}>
                {series.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing[2],
    paddingHorizontal: spacing[4],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[4],
    marginBottom: spacing[1],
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing[1],
  },
});

export default LineChart;
