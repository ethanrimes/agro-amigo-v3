/**
 * Agro Amigo Theme System
 * Agricultural-inspired color scheme with modern, sleek design
 */

import { Platform } from 'react-native';

// Agricultural Color Palette
export const AgroColors = {
  // Primary Greens (Agriculture)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  // Earth Browns
  brown: {
    50: '#fdf8f6',
    100: '#f2e8e5',
    200: '#eaddd7',
    300: '#d6c4b8',
    400: '#b6977a',
    500: '#96775a', // Main brown
    600: '#846358',
    700: '#6f524a',
    800: '#5d4640',
    900: '#4e3b36',
  },
  // Warm Oranges (Harvest)
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  // Accent Gold (Wheat/Grain)
  gold: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308', // Main gold
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  // Neutral Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Status Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  // Chart Colors
  chart: {
    primary: '#0ea5e9', // Sky blue for main series
    secondary: '#8b5cf6', // Purple for comparison
    tertiary: '#f97316', // Orange for third series
    positive: '#22c55e',
    negative: '#ef4444',
    neutral: '#94a3b8',
  },
};

export const Colors = {
  light: {
    // Backgrounds
    background: '#fafaf9', // Warm white
    surface: '#ffffff',
    surfaceSecondary: '#f5f5f4',
    surfaceTertiary: '#e7e5e4',

    // Text
    text: '#1c1917',
    textSecondary: '#57534e',
    textTertiary: '#a8a29e',
    textInverse: '#ffffff',

    // Primary (Green)
    primary: AgroColors.primary[600],
    primaryLight: AgroColors.primary[100],
    primaryDark: AgroColors.primary[800],

    // Accent colors
    accent: AgroColors.orange[500],
    accentLight: AgroColors.orange[100],

    // Browns
    brown: AgroColors.brown[600],
    brownLight: AgroColors.brown[100],

    // Tab bar
    tint: AgroColors.primary[600],
    tabIconDefault: AgroColors.neutral[400],
    tabIconSelected: AgroColors.primary[600],

    // Borders
    border: AgroColors.neutral[200],
    borderStrong: AgroColors.neutral[300],

    // Icons
    icon: AgroColors.neutral[500],
    iconActive: AgroColors.primary[600],

    // Cards
    card: '#ffffff',
    cardBorder: 'rgba(0,0,0,0.05)',
    cardShadow: 'rgba(0,0,0,0.1)',

    // Status
    success: AgroColors.success,
    warning: AgroColors.warning,
    error: AgroColors.error,
    info: AgroColors.info,

    // Charts
    chartPrimary: AgroColors.chart.primary,
    chartSecondary: AgroColors.chart.secondary,
    chartTertiary: AgroColors.chart.tertiary,
    chartPositive: AgroColors.chart.positive,
    chartNegative: AgroColors.chart.negative,
    chartGrid: AgroColors.neutral[200],
    chartAxis: AgroColors.neutral[400],

    // Modal overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    // Backgrounds
    background: '#0c0a09',
    surface: '#1c1917',
    surfaceSecondary: '#292524',
    surfaceTertiary: '#3f3f46',

    // Text
    text: '#fafaf9',
    textSecondary: '#a8a29e',
    textTertiary: '#78716c',
    textInverse: '#1c1917',

    // Primary (Green)
    primary: AgroColors.primary[500],
    primaryLight: AgroColors.primary[900],
    primaryDark: AgroColors.primary[300],

    // Accent colors
    accent: AgroColors.orange[400],
    accentLight: AgroColors.orange[900],

    // Browns
    brown: AgroColors.brown[400],
    brownLight: AgroColors.brown[900],

    // Tab bar
    tint: AgroColors.primary[400],
    tabIconDefault: AgroColors.neutral[500],
    tabIconSelected: AgroColors.primary[400],

    // Borders
    border: AgroColors.neutral[800],
    borderStrong: AgroColors.neutral[700],

    // Icons
    icon: AgroColors.neutral[400],
    iconActive: AgroColors.primary[400],

    // Cards
    card: '#1c1917',
    cardBorder: 'rgba(255,255,255,0.1)',
    cardShadow: 'rgba(0,0,0,0.3)',

    // Status
    success: AgroColors.success,
    warning: AgroColors.warning,
    error: AgroColors.error,
    info: AgroColors.info,

    // Charts
    chartPrimary: AgroColors.chart.primary,
    chartSecondary: AgroColors.chart.secondary,
    chartTertiary: AgroColors.chart.tertiary,
    chartPositive: AgroColors.chart.positive,
    chartNegative: AgroColors.chart.negative,
    chartGrid: AgroColors.neutral[800],
    chartAxis: AgroColors.neutral[500],

    // Modal overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    sansBold: 'System',
    serif: 'Georgia',
    mono: 'Menlo',
  },
  android: {
    sans: 'Roboto',
    sansBold: 'Roboto-Bold',
    serif: 'serif',
    mono: 'monospace',
  },
  default: {
    sans: 'System',
    sansBold: 'System',
    serif: 'Georgia',
    mono: 'Courier',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    sansBold: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Typography = {
  // Headings
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  h5: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  // Body text
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  // Captions & Labels
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  // Numbers/Data
  dataLarge: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
  dataMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: -0.5,
  },
  dataSmall: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  // Price text
  priceMain: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  priceSecondary: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
