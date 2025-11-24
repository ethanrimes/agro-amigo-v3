// Custom Text component with consistent styling
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, textStyles } from '../theme/typography';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'bodyXs'
  | 'label'
  | 'labelLg'
  | 'caption'
  | 'priceMain'
  | 'priceSecondary';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = 'bodyMd',
  color,
  weight,
  align,
  style,
  children,
  ...props
}) => {
  const variantStyle = textStyles[variant];

  const computedStyle = [
    styles.base,
    variantStyle && {
      fontSize: variantStyle.fontSize,
      fontWeight: weight ? typography.fontWeight[weight] : variantStyle.fontWeight,
      lineHeight: variantStyle.lineHeight,
    },
    color && { color },
    align && { textAlign: align },
    style,
  ];

  return (
    <RNText style={computedStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
    fontFamily: typography.fontFamily.regular,
  },
});

export default Text;
