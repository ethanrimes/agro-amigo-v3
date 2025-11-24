// FloatingButton - Floating action button component
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface FloatingButtonProps {
  icon: string;
  onPress: () => void;
  position?: { bottom?: number; right?: number; top?: number; left?: number };
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  iconColor?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  onPress,
  position = { bottom: 100, right: 20 },
  size = 'medium',
  backgroundColor = colors.primary[500],
  iconColor = colors.text.inverse,
}) => {
  const dimensions = {
    small: { button: 40, icon: 20 },
    medium: { button: 52, icon: 24 },
    large: { button: 64, icon: 28 },
  };

  const { button: buttonSize, icon: iconSize } = dimensions[size];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor,
          ...position,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon as any} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
    zIndex: 999,
  },
});

export default FloatingButton;
