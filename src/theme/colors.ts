// Agro Amigo Color Palette
// Light theme with agricultural colors: browns, whites, greens, oranges

export const colors = {
  // Primary colors - Green as main highlight
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main green
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Secondary colors - Brown/Earth tones
  secondary: {
    50: '#EFEBE9',
    100: '#D7CCC8',
    200: '#BCAAA4',
    300: '#A1887F',
    400: '#8D6E63',
    500: '#795548', // Main brown
    600: '#6D4C41',
    700: '#5D4037',
    800: '#4E342E',
    900: '#3E2723',
  },

  // Accent colors - Orange
  accent: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Main orange
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },

  // Background colors - Light theme
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#FAFAFA',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
  },

  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    inverse: '#FFFFFF',
    link: '#4CAF50',
  },

  // Status colors
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Chart colors
  chart: {
    primary: '#00BCD4', // Neon blue for main trends
    secondary: '#FF7043',
    tertiary: '#AB47BC',
    grid: '#E0E0E0',
    axis: '#9E9E9E',
    positive: '#4CAF50',
    negative: '#F44336',
  },

  // Border colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#9E9E9E',
  },

  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export type ColorPalette = typeof colors;
