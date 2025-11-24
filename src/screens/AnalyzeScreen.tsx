// AnalyzeScreen - Comprehensive data analysis with charts
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { spacing, borderRadius, layout } from '../theme/spacing';
import {
  Text,
  SearchBar,
  ChartCard,
  LineChart,
  BarChart,
  HistogramChart,
  ChartInsights,
  FloatingButton,
  FilterModal,
  AppModal,
  ChartFilters,
} from '../components';
import { ChartSeriesData, DataPoint, Insight } from '../components/charts';
import api, { PriceStatistics } from '../services/api';
import {
  Producto,
  PrecioObservacion,
  SearchResult,
  RootStackParamList,
  MainTabParamList,
  TipoProducto,
  Categoria,
} from '../types';
import { formatCurrency, formatDate, getTipoNombre, categorias, subcategorias, productos } from '../data/mockData';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type AnalyzeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Analyze'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type AnalyzeScreenRouteProp = RouteProp<MainTabParamList, 'Analyze'>;

interface ProductListItem {
  id: string;
  nombre: string;
  tipo: TipoProducto;
  tipoNombre: string;
  subcategoria?: string;
  categoria?: string;
}

const AnalyzeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AnalyzeScreenNavigationProp>();
  const route = useRoute<AnalyzeScreenRouteProp>();

  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [latestPrice, setLatestPrice] = useState<PrecioObservacion | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<ChartSeriesData[]>([]);
  const [histogramData, setHistogramData] = useState<number[]>([]);
  const [histogramLabels, setHistogramLabels] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<PriceStatistics | null>(null);

  // UI states
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentFilterTarget, setCurrentFilterTarget] = useState<'timeseries' | 'histogram'>('timeseries');
  const [filters, setFilters] = useState<ChartFilters>({
    serie: 'diario',
    dateRange: '1m',
  });

  // Product list for no selection state
  const [productList, setProductList] = useState<ProductListItem[]>([]);

  useEffect(() => {
    if (route.params?.productoId) {
      loadProducto(route.params.productoId);
    } else {
      buildProductList();
    }
  }, [route.params?.productoId]);

  const buildProductList = () => {
    const list: ProductListItem[] = productos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      tipo: p.tipo,
      tipoNombre: getTipoNombre(p.tipo),
      subcategoria: p.subcategoria,
      categoria: p.categoria,
    }));

    // Sort by tipo, then categoria, then subcategoria, then nombre
    list.sort((a, b) => {
      if (a.tipo !== b.tipo) return a.tipo.localeCompare(b.tipo);
      if (a.categoria !== b.categoria) return (a.categoria || '').localeCompare(b.categoria || '');
      if (a.subcategoria !== b.subcategoria) return (a.subcategoria || '').localeCompare(b.subcategoria || '');
      return a.nombre.localeCompare(b.nombre);
    });

    setProductList(list);
  };

  const loadProducto = async (productoId: string) => {
    setIsLoading(true);
    try {
      const producto = await api.getProductoById(productoId);
      if (producto) {
        setSelectedProducto(producto);
        await loadProductoData(productoId);
      }
    } catch (error) {
      console.error('Error loading producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProductoData = async (productoId: string) => {
    try {
      // Load latest price
      const latest = await api.getLatestPrecio(productoId);
      setLatestPrice(latest || null);

      // Load time series
      const timeSeries = await api.getPrecioTimeSeries(
        productoId,
        filters.dateRange,
        filters.mercadoId,
        filters.serie
      );

      if (timeSeries.length > 0) {
        const chartData: ChartSeriesData[] = [
          {
            id: 'main',
            name: 'Precio promedio',
            color: colors.chart.primary,
            data: timeSeries.map((p) => ({
              date: new Date(p.fecha),
              value: p.precioPromedio,
              valueMin: p.precioMinimo,
              valueMax: p.precioMaximo,
            })),
          },
        ];
        setTimeSeriesData(chartData);

        // Calculate statistics
        const stats = api.calculatePriceStatistics(timeSeries);
        setStatistics(stats);
      }

      // Load histogram data (prices across markets for latest date)
      const latestDate = latest?.fecha;
      if (latestDate) {
        const allPrices = await api.getPrecios({
          productoId,
          fechaInicio: latestDate,
          fechaFin: latestDate,
        });

        const prices = allPrices.map((p) => p.precioPromedio);
        const labels = allPrices.map((p) => p.mercado);
        setHistogramData(prices);
        setHistogramLabels(labels);
      }
    } catch (error) {
      console.error('Error loading producto data:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (selectedProducto) {
      await loadProductoData(selectedProducto.id);
    }
    setRefreshing(false);
  }, [selectedProducto, filters]);

  const handleSearchSelect = (result: SearchResult) => {
    setShowSearch(false);
    loadProducto(result.id);
  };

  const handleProductPress = (item: ProductListItem) => {
    loadProducto(item.id);
  };

  const handleGearPress = (target: 'timeseries' | 'histogram') => {
    setCurrentFilterTarget(target);
    setShowFilterModal(true);
  };

  const handleTablePress = (target: string) => {
    // Navigate to data table screen
    let data: any[] = [];
    let title = '';

    if (target === 'timeseries' && timeSeriesData.length > 0) {
      data = timeSeriesData[0].data.map((d) => ({
        Fecha: formatDate(d.date.toISOString()),
        Precio: formatCurrency(d.value),
      }));
      title = `Serie de tiempo - ${selectedProducto?.nombre}`;
    }

    navigation.navigate('DataTable', { title, data });
  };

  const handleApplyFilters = async (newFilters: ChartFilters) => {
    setFilters(newFilters);
    if (selectedProducto) {
      setIsLoading(true);
      try {
        await loadProductoData(selectedProducto.id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getInsights = (): Insight[] => {
    if (!statistics) return [];

    return [
      {
        label: 'Precio promedio',
        value: formatCurrency(statistics.promedio),
      },
      {
        label: 'Variación',
        value: `${statistics.variacion > 0 ? '+' : ''}${statistics.variacion}%`,
        trend: statistics.variacion > 0 ? 'up' : statistics.variacion < 0 ? 'down' : 'neutral',
      },
      {
        label: 'Mínimo',
        value: formatCurrency(statistics.minimo),
      },
      {
        label: 'Máximo',
        value: formatCurrency(statistics.maximo),
      },
      {
        label: 'Percentil 25',
        value: formatCurrency(statistics.percentil25),
      },
      {
        label: 'Percentil 75',
        value: formatCurrency(statistics.percentil75),
      },
    ];
  };

  const renderProductListItem = ({ item }: { item: ProductListItem }) => (
    <TouchableOpacity
      style={styles.productListItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productListContent}>
        <Text variant="bodyMd" weight="medium" numberOfLines={1}>
          {item.nombre}
        </Text>
        <Text variant="caption" color={colors.text.secondary} numberOfLines={1}>
          {item.categoria} {'>'} {item.subcategoria}
        </Text>
      </View>
      <View style={[styles.tipoBadge, { backgroundColor: colors.primary[100] }]}>
        <Text variant="caption" color={colors.primary[600]}>
          {item.tipoNombre}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );

  // No selection view
  if (!selectedProducto) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text variant="h4" weight="bold">
            Analizar
          </Text>
        </View>

        <FlatList
          data={productList}
          renderItem={renderProductListItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text variant="bodySm" color={colors.text.secondary} style={styles.listHeader}>
              Selecciona un producto para ver análisis detallado
            </Text>
          }
        />

        {/* Floating search button */}
        <FloatingButton
          icon="search"
          onPress={() => setShowSearch(true)}
          position={{ bottom: 100, right: 20 }}
        />

        {/* Search Modal */}
        <AppModal
          visible={showSearch}
          onClose={() => setShowSearch(false)}
          title="Buscar"
        >
          <SearchBar
            onSelect={handleSearchSelect}
            autoFocus
          />
        </AppModal>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedProducto(null)}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text variant="h5" weight="bold" numberOfLines={1}>
            {selectedProducto.nombre}
          </Text>
          <Text variant="caption" color={colors.text.secondary}>
            {selectedProducto.categoria} {'>'} {selectedProducto.subcategoria}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setShowSearch(true)}
        >
          <Ionicons name="search" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary[500]}
            />
          }
        >
          {/* Latest Price Card */}
          {latestPrice && (
            <ChartCard
              title="Precio actual"
              subtitle={formatDate(latestPrice.fecha)}
              showGear={false}
              showTable={false}
            >
              <View style={styles.priceDisplay}>
                <Text variant="priceMain" color={colors.primary[700]}>
                  {formatCurrency(latestPrice.precioMinimo)} - {formatCurrency(latestPrice.precioMaximo)}
                </Text>
                <Text variant="bodySm" color={colors.text.secondary}>
                  {latestPrice.presentacion} • {latestPrice.mercado}
                </Text>
              </View>
            </ChartCard>
          )}

          {/* Time Series Chart */}
          {timeSeriesData.length > 0 && (
            <ChartCard
              title="Histórico de precios"
              subtitle={`Últimos ${filters.dateRange === '1m' ? '30 días' : filters.dateRange}`}
              onGearPress={() => handleGearPress('timeseries')}
              onTablePress={() => handleTablePress('timeseries')}
            >
              {filters.dateRange === '1d' ? (
                <BarChart
                  data={timeSeriesData[0].data.map((d, i) => ({
                    label: i.toString(),
                    value: d.value,
                  }))}
                  formatValue={(v) => formatCurrency(v)}
                />
              ) : (
                <LineChart
                  data={timeSeriesData}
                  showArea
                  showLegend={timeSeriesData.length > 1}
                  formatYValue={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
              )}
              <ChartInsights insights={getInsights()} title="Estadísticas" />
            </ChartCard>
          )}

          {/* Histogram - Price Distribution */}
          {histogramData.length > 0 && (
            <ChartCard
              title="Distribución de precios por mercado"
              subtitle={latestPrice ? formatDate(latestPrice.fecha) : ''}
              onGearPress={() => handleGearPress('histogram')}
              onTablePress={() => handleTablePress('histogram')}
            >
              <HistogramChart
                data={histogramData}
                labels={histogramLabels}
                formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
                xAxisLabel="Precio (COP)"
                yAxisLabel="N° Mercados"
                color={colors.accent[500]}
              />
              <ChartInsights
                insights={[
                  {
                    label: 'Mediana',
                    value: statistics ? formatCurrency(statistics.mediana) : '-',
                  },
                  {
                    label: 'Rango intercuartil',
                    value: statistics
                      ? `${formatCurrency(statistics.percentil25)} - ${formatCurrency(statistics.percentil75)}`
                      : '-',
                  },
                ]}
              />
            </ChartCard>
          )}

          {/* Bottom spacing */}
          <View style={{ height: spacing[8] }} />
        </ScrollView>
      )}

      {/* Search Modal */}
      <AppModal
        visible={showSearch}
        onClose={() => setShowSearch(false)}
        title="Buscar producto"
      >
        <SearchBar onSelect={handleSearchSelect} autoFocus />
      </AppModal>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={handleApplyFilters}
        showDateRange={currentFilterTarget === 'timeseries'}
        showSerie
        showPresentacion={false}
        showGeography
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[2],
  },
  headerTitle: {
    flex: 1,
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[4],
  },
  priceDisplay: {
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  listContent: {
    padding: spacing[4],
  },
  listHeader: {
    marginBottom: spacing[4],
  },
  productListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[2],
    ...layout.cardShadow,
  },
  productListContent: {
    flex: 1,
  },
  tipoBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
  },
});

export default AnalyzeScreen;
