// NewsCard - Component for displaying news items with animation
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Text from './Text';
import { NoticiaAgricola } from '../types';
import { formatShortDate } from '../data/mockData';

interface NewsCardProps {
  noticia: NoticiaAgricola;
  index?: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ noticia, index = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const handlePress = async () => {
    try {
      await Linking.openURL(noticia.url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const getSourceColor = (fuente: string): string => {
    switch (fuente.toLowerCase()) {
      case 'dane':
        return colors.primary[500];
      case 'minagricultura':
        return colors.accent[500];
      case 'ica':
        return colors.secondary[500];
      case 'sipsa':
        return colors.chart.primary;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View
              style={[
                styles.sourceBadge,
                { backgroundColor: getSourceColor(noticia.fuente) + '20' },
              ]}
            >
              <Text
                variant="caption"
                weight="medium"
                color={getSourceColor(noticia.fuente)}
              >
                {noticia.fuente}
              </Text>
            </View>
            <Text variant="caption" color={colors.text.tertiary}>
              {formatShortDate(noticia.fecha)}
            </Text>
          </View>
          <Text
            variant="bodyMd"
            weight="medium"
            numberOfLines={2}
            style={styles.titulo}
          >
            {noticia.titulo}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.text.tertiary}
          style={styles.chevron}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  sourceBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.sm,
  },
  titulo: {
    lineHeight: 22,
  },
  chevron: {
    marginLeft: spacing[2],
  },
});

export default NewsCard;
