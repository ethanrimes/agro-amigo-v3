// Main theme export for Agro Amigo
import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, layout, borderRadius } from './spacing';

export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  layout,
  borderRadius,
};

export { colors } from './colors';
export { typography, textStyles } from './typography';
export { spacing, layout, borderRadius } from './spacing';

export type Theme = typeof theme;
