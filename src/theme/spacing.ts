// Spacing and layout configuration for Agro Amigo

export const spacing = {
  // Base spacing scale
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
};

export const layout = {
  // Screen padding
  screenPaddingHorizontal: spacing[4],
  screenPaddingVertical: spacing[4],

  // Card styling
  cardPadding: spacing[4],
  cardBorderRadius: 12,
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Modal styling
  modalBorderRadius: 20,
  modalPadding: spacing[5],

  // Button styling
  buttonPaddingHorizontal: spacing[4],
  buttonPaddingVertical: spacing[3],
  buttonBorderRadius: 8,

  // Input styling
  inputPaddingHorizontal: spacing[4],
  inputPaddingVertical: spacing[3],
  inputBorderRadius: 10,
  inputHeight: 48,

  // Icon sizes
  iconSizeXs: 12,
  iconSizeSm: 16,
  iconSizeMd: 20,
  iconSizeLg: 24,
  iconSizeXl: 32,
  iconSize2xl: 48,

  // Tab bar
  tabBarHeight: 60,
  tabBarIconSize: 24,

  // Header
  headerHeight: 56,

  // Chart dimensions
  chartHeight: 250,
  chartPadding: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50,
  },
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export type Spacing = typeof spacing;
export type Layout = typeof layout;
