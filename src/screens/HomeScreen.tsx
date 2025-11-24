// HomeScreen - Main landing page with search, watchlist, and news
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme/colors';
import { spacing, borderRadius, layout } from '../theme/spacing';
import { Text, SearchBar, PriceTicker, NewsCard } from '../components';
import api, { WatchlistPrice } from '../services/api';
import { NoticiaAgricola, SearchResult, RootStackParamList, MainTabParamList } from '../types';
import { defaultUbicacion } from '../data/mockData';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [watchlist, setWatchlist] = useState<WatchlistPrice[]>([]);
  const [noticias, setNoticias] = useState<NoticiaAgricola[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;

  // Animated ticker scroll
  const tickerScrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Animate watchlist ticker
    if (watchlist.length > 0) {
      const tickerWidth = watchlist.length * 280;
      Animated.loop(
        Animated.sequence([
          Animated.timing(tickerScrollX, {
            toValue: -tickerWidth,
            duration: watchlist.length * 8000,
            useNativeDriver: true,
          }),
          Animated.timing(tickerScrollX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [watchlist, tickerScrollX]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [watchlistData, noticiasData] = await Promise.all([
        api.getWatchlistPrices(),
        api.getNoticias(8),
      ]);
      setWatchlist(watchlistData);
      setNoticias(noticiasData);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handleSearchSelect = (result: SearchResult) => {
    navigation.navigate('Analyze', {
      productoId: result.id,
      tipo: result.tipoProducto,
    });
  };

  const handlePricePress = (item: WatchlistPrice) => {
    navigation.navigate('Analyze', {
      productoId: item.productoId,
      tipo: item.tipo,
    });
  };

  const handleLocationPress = () => {
    navigation.navigate('Settings');
  };

  // Header animation based on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [280, 140],
    extrapolate: 'clamp',
  });

  const logoScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search overlay when focused */}
      {searchFocused && (
        <View style={[styles.searchOverlay, { top: insets.top }]}>
          <View style={styles.searchOverlayContent}>
            <SearchBar
              onSelect={handleSearchSelect}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              autoFocus
              expanded
            />
          </View>
        </View>
      )}

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, { height: headerHeight }]}>
          <LinearGradient
            colors={[colors.primary[50], colors.background.primary]}
            style={styles.heroGradient}
          >
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
              <View style={styles.logoIconContainer}>
                <Ionicons name="leaf" size={32} color={colors.primary[600]} />
              </View>
              <Text variant="h2" weight="bold" color={colors.primary[700]} style={styles.title}>
                AGRO AMIGO
              </Text>
            </Animated.View>

            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.searchTrigger}
                onPress={() => setSearchFocused(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={20} color={colors.text.tertiary} />
                <Text variant="bodyMd" color={colors.text.tertiary} style={styles.searchPlaceholder}>
                  Buscar productos, mercados...
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.locationContainer}
              onPress={handleLocationPress}
            >
              <Ionicons name="location" size={16} color={colors.primary[600]} />
              <Text variant="bodySm" color={colors.text.secondary} style={styles.locationText}>
                Ubicación: {defaultUbicacion.municipio}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Watchlist Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h5" weight="semibold">
              Precios del día
            </Text>
            <TouchableOpacity>
              <Text variant="bodySm" color={colors.primary[600]}>
                Ver todos
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tickerContainer}>
            <Animated.View
              style={[
                styles.tickerTrack,
                {
                  transform: [{ translateX: tickerScrollX }],
                  width: watchlist.length * 280 * 2,
                },
              ]}
            >
              {/* Duplicate for seamless loop */}
              {[...watchlist, ...watchlist].map((item, index) => (
                <View key={`${item.id}-${index}`} style={styles.tickerItem}>
                  <PriceTicker
                    producto={item.producto}
                    presentacion={item.presentacion}
                    mercado={item.mercado}
                    municipio={item.municipio}
                    fecha={item.fecha}
                    precioMinimo={item.precioMinimo}
                    precioMaximo={item.precioMaximo}
                    variacionDiaria={item.variacionDiaria}
                    onPress={() => handlePricePress(item)}
                    compact
                  />
                </View>
              ))}
            </Animated.View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Analyze', {})}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary[100] }]}>
              <Ionicons name="bar-chart" size={24} color={colors.primary[600]} />
            </View>
            <Text variant="label" weight="medium">
              Productos Agrícolas
            </Text>
            <Text variant="caption" color={colors.text.secondary}>
              Precios y tendencias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Analyze', {})}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.accent[100] }]}>
              <Ionicons name="flask" size={24} color={colors.accent[600]} />
            </View>
            <Text variant="label" weight="medium">
              Insumos Agrícolas
            </Text>
            <Text variant="caption" color={colors.text.secondary}>
              Fertilizantes, herbicidas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Geovisor')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.chart.primary + '20' }]}>
              <Ionicons name="map" size={24} color={colors.chart.primary} />
            </View>
            <Text variant="label" weight="medium">
              Geovisor
            </Text>
            <Text variant="caption" color={colors.text.secondary}>
              Mapa de precios
            </Text>
          </TouchableOpacity>
        </View>

        {/* News Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h5" weight="semibold">
              Noticias del sector
            </Text>
          </View>

          {noticias.map((noticia, index) => (
            <NewsCard key={noticia.id} noticia={noticia} index={index} />
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: spacing[8] }} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    overflow: 'hidden',
  },
  heroGradient: {
    flex: 1,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[5],
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[5],
  },
  logoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  title: {
    letterSpacing: 2,
  },
  searchContainer: {
    marginBottom: spacing[4],
  },
  searchTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderWidth: 1,
    borderColor: colors.border.light,
    ...layout.cardShadow,
  },
  searchPlaceholder: {
    marginLeft: spacing[2],
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    marginHorizontal: spacing[2],
  },
  searchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.primary,
    zIndex: 100,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  searchOverlayContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[5],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  tickerContainer: {
    height: 150,
    overflow: 'hidden',
  },
  tickerTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerItem: {
    width: 260,
    marginRight: spacing[3],
  },
  quickActionsSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[5],
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (SCREEN_WIDTH - spacing[4] * 2 - spacing[3] * 2) / 3,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    alignItems: 'center',
    ...layout.cardShadow,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
});

export default HomeScreen;
