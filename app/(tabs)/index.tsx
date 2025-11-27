/**
 * Home Screen
 * Main landing page with search, watchlist, and news
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, ChevronRight, ExternalLink } from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, AgroColors } from '@/constants/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { PriceTicker } from '@/components/common/PriceTicker';
import { useAppContext } from '@/context/AppContext';
import {
  newsItems,
  precioObservaciones,
} from '@/data/mockData';
import { SearchResult } from '@/types';
import { formatRelativeTime } from '@/utils/formatting';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { userSettings, setSelectedItem, isSearchExpanded, setIsSearchExpanded } = useAppContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearchSelect = (result: SearchResult) => {
    setSelectedItem(result);
    setIsSearchExpanded(false);
    router.push('/(tabs)/analyze');
  };

  const handleLocationPress = () => {
    router.push('/(tabs)/settings');
  };

  const handleWatchlistItemPress = (item: typeof userSettings.watchlist[0]) => {
    setSelectedItem({
      id: item.productoId,
      tipo: 'producto_agricola',
      nombre: item.productoNombre,
      lineageDisplay: item.productoNombre,
      matchedPart: item.productoNombre,
      data: { productoId: item.productoId, mercadoId: item.mercadoId },
    });
    router.push('/(tabs)/analyze');
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getWatchlistPrices = () => {
    return userSettings.watchlist.map((item) => {
      const currentObservations = precioObservaciones
        .filter(
          (o) =>
            o.productoId === item.productoId &&
            o.mercadoId === item.mercadoId
        )
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      const currentPrice = currentObservations[0];
      const previousPrice = currentObservations[1];

      return {
        ...item,
        currentPrice,
        previousPrice,
      };
    });
  };

  const watchlistPrices = getWatchlistPrices();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.heroGradient}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>AGRO AMIGO</Text>
              <Text style={styles.heroSubtitle}>
                Explorador de precios agrícolas de Colombia
              </Text>

              <View style={styles.searchContainer}>
                <SearchBar
                  onSelect={handleSearchSelect}
                  placeholder="Buscar productos, mercados..."
                  expanded={isSearchExpanded}
                  onExpandChange={setIsSearchExpanded}
                />
              </View>

              <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
                <MapPin size={16} color={Colors.light.primary} />
                <Text style={styles.locationText}>
                  Ubicación: {userSettings.ubicacion.municipioNombre},{' '}
                  {userSettings.ubicacion.departamentoNombre}
                </Text>
                <ChevronRight size={16} color={Colors.light.textTertiary} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Watchlist Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mi Lista de Seguimiento</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.watchlistContainer}
          >
            {watchlistPrices.map((item) => (
              item.currentPrice && (
                <PriceTicker
                  key={item.id}
                  currentPrice={item.currentPrice}
                  previousPrice={item.previousPrice}
                  productoNombre={item.productoNombre}
                  presentacionNombre={item.presentacionNombre}
                  mercadoNombre={item.mercadoNombre}
                  ciudad={item.ciudad}
                  onPress={() => handleWatchlistItemPress(item)}
                  animated={true}
                />
              )
            ))}
          </ScrollView>
        </Animated.View>

        {/* Quick Stats Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Resumen del Mercado</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>32</Text>
              <Text style={styles.statLabel}>Mercados Activos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>673K</Text>
              <Text style={styles.statLabel}>Toneladas Oct</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.light.chartPositive }]}>+5.6%</Text>
              <Text style={styles.statLabel}>vs Sep</Text>
            </View>
          </View>
        </Animated.View>

        {/* News Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Noticias del Sector</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Ver más</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.newsContainer}>
            {newsItems.slice(0, 5).map((news, index) => (
              <TouchableOpacity
                key={news.id}
                style={[
                  styles.newsItem,
                  index === 4 && styles.newsItemLast,
                ]}
              >
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {news.titulo}
                  </Text>
                  <View style={styles.newsMeta}>
                    <Text style={styles.newsSource}>{news.fuente}</Text>
                    <Text style={styles.newsDate}>{formatRelativeTime(news.fecha)}</Text>
                  </View>
                </View>
                <ExternalLink size={16} color={Colors.light.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Categories Quick Access */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explorar por Categoría</Text>
          </View>

          <View style={styles.categoriesGrid}>
            {[
              { name: 'Frutas', icon: '🍎', color: AgroColors.primary[500] },
              { name: 'Verduras', icon: '🥬', color: AgroColors.primary[600] },
              { name: 'Tubérculos', icon: '🥔', color: AgroColors.brown[500] },
              { name: 'Insumos', icon: '🧪', color: AgroColors.orange[500] },
            ].map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[styles.categoryCard, { borderLeftColor: cat.color }]}
                onPress={() => {
                  setSelectedItem({
                    id: cat.name.toLowerCase(),
                    tipo: 'categoria',
                    nombre: cat.name,
                    lineageDisplay: cat.name,
                    matchedPart: cat.name,
                    data: { nombre: cat.name },
                  });
                  router.push('/(tabs)/analyze');
                }}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <ChevronRight size={16} color={Colors.light.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Footer spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    minHeight: 320,
  },
  heroGradient: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
    ...Shadows.lg,
  },
  heroContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    ...Typography.h1,
    fontSize: 36,
    color: Colors.light.primary,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  searchContainer: {
    marginBottom: Spacing.lg,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  locationText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.light.text,
  },
  sectionLink: {
    ...Typography.label,
    color: Colors.light.primary,
  },
  watchlistContainer: {
    paddingRight: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statValue: {
    ...Typography.dataMedium,
    color: Colors.light.text,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  newsContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  newsItemLast: {
    borderBottomWidth: 0,
  },
  newsContent: {
    flex: 1,
    marginRight: Spacing.md,
  },
  newsTitle: {
    ...Typography.body,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  newsMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  newsSource: {
    ...Typography.caption,
    color: Colors.light.primary,
  },
  newsDate: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },
  categoriesGrid: {
    gap: Spacing.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    ...Shadows.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  categoryName: {
    ...Typography.label,
    color: Colors.light.text,
    flex: 1,
  },
  footer: {
    height: 50,
  },
});
