/**
 * Analyze Screen
 * Dynamic visualizations for selected products
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Filter,
  Settings,
  Table,
  ChevronRight,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, AgroColors } from '@/constants/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { AppModal } from '@/components/common/AppModal';
import { LineChart, BarChart, Histogram } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import {
  productos,
  categorias,
  subcategorias,
  precioObservaciones,
  mercados,
  getPriceHistory,
  getProductoById,
  getCategoriaById,
  getSubcategoriaById,
  getProductLineage,
  insumosAgricolas,
  distritosRiego,
  preciosDistritosRiego,
} from '@/data/mockData';
import { SearchResult, PrecioObservacion } from '@/types';
import { formatPrice, formatDate, formatPercent, calculateStats } from '@/utils/formatting';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AnalyzeScreen() {
  const router = useRouter();
  const { selectedItem, setSelectedItem, chartConfig, setChartConfig } = useAppContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isChartConfigModalVisible, setIsChartConfigModalVisible] = useState(false);
  const [activeChartConfig, setActiveChartConfig] = useState<string | null>(null);

  const handleSearchSelect = (result: SearchResult) => {
    setSelectedItem(result);
    setIsSearchVisible(false);
  };

  // Get organized list of all items for no-selection state
  const organizedItems = useMemo(() => {
    const items: { tipo: string; categoria?: string; subcategoria?: string; items: any[] }[] = [];

    // Productos Agricolas
    categorias
      .filter((c) => c.tipo === 'producto_agricola')
      .forEach((categoria) => {
        const subs = subcategorias.filter((s) => s.categoriaId === categoria.id);
        subs.forEach((sub) => {
          const prods = productos.filter((p) => p.subcategoriaId === sub.id);
          if (prods.length > 0) {
            items.push({
              tipo: 'Producto Agrícola',
              categoria: categoria.nombre,
              subcategoria: sub.nombre,
              items: prods,
            });
          }
        });
      });

    // Insumos
    items.push({
      tipo: 'Insumo Agrícola',
      items: insumosAgricolas,
    });

    // Distritos de Riego
    items.push({
      tipo: 'Distrito de Riego',
      items: distritosRiego,
    });

    // Mercados
    items.push({
      tipo: 'Mercado Mayorista',
      items: mercados,
    });

    return items;
  }, []);

  // Render content based on selection
  const renderContent = () => {
    if (!selectedItem) {
      return renderNoSelection();
    }

    switch (selectedItem.tipo) {
      case 'producto_agricola':
        return renderProductoAgricola();
      case 'insumo_agricola':
        return renderInsumoAgricola();
      case 'distrito_riego':
        return renderDistritoRiego();
      case 'mercado_mayorista':
        return renderMercado();
      case 'categoria':
        return renderCategoria();
      default:
        return renderNoSelection();
    }
  };

  const renderNoSelection = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.noSelectionHeader}>
        <Text style={styles.noSelectionTitle}>Explorar Datos</Text>
        <Text style={styles.noSelectionSubtitle}>
          Seleccione un producto, insumo o mercado para ver análisis detallados
        </Text>
      </View>

      {organizedItems.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.tipo}</Text>
          {group.categoria && (
            <Text style={styles.groupSubtitle}>
              {group.categoria} › {group.subcategoria}
            </Text>
          )}
          <View style={styles.itemsContainer}>
            {group.items.slice(0, 5).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => {
                  let tipo: SearchResult['tipo'] = 'producto_agricola';
                  if (group.tipo === 'Insumo Agrícola') tipo = 'insumo_agricola';
                  if (group.tipo === 'Distrito de Riego') tipo = 'distrito_riego';
                  if (group.tipo === 'Mercado Mayorista') tipo = 'mercado_mayorista';

                  setSelectedItem({
                    id: item.id,
                    tipo,
                    nombre: item.nombre,
                    lineageDisplay: item.nombre,
                    matchedPart: item.nombre,
                    data: item,
                  });
                }}
              >
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.nombre}
                </Text>
                <ChevronRight size={16} color={Colors.light.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );

  const renderProductoAgricola = () => {
    if (!selectedItem) return null;

    const producto = getProductoById(selectedItem.id);
    if (!producto) return null;

    const lineage = getProductLineage(producto.id);
    const priceHistory = getPriceHistory(producto.id, 'corabastos', undefined, 30);
    const latestPrice = priceHistory[priceHistory.length - 1];
    const previousPrice = priceHistory[priceHistory.length - 2];

    // Get prices across markets for histogram
    const marketPrices = precioObservaciones
      .filter(
        (o) =>
          o.productoId === producto.id &&
          o.fecha === latestPrice?.fecha
      )
      .map((o) => ({
        value: o.precioPromedio || (o.precioMinimo + o.precioMaximo) / 2,
        label: mercados.find((m) => m.id === o.mercadoId)?.nombre || o.mercadoId,
      }));

    const chartData = priceHistory.map((p) => ({
      date: p.fecha,
      value: p.precioPromedio || (p.precioMinimo + p.precioMaximo) / 2,
      min: p.precioMinimo,
      max: p.precioMaximo,
    }));

    const percentChange =
      previousPrice && latestPrice
        ? ((latestPrice.precioPromedio! - previousPrice.precioPromedio!) /
            previousPrice.precioPromedio!) *
          100
        : 0;

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.productHeader}>
          <Text style={styles.productLineage}>{lineage}</Text>
          <Text style={styles.productName}>{producto.nombre}</Text>
        </View>

        {/* Price Ticker Visualization */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Precio Actual</Text>
            <TouchableOpacity
              style={styles.vizAction}
              onPress={() => {
                setActiveChartConfig('priceTicker');
                setIsChartConfigModalVisible(true);
              }}
            >
              <Settings size={18} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>

          {latestPrice ? (
            <View style={styles.priceTickerContainer}>
              <View style={styles.priceMain}>
                <Text style={styles.priceValue}>
                  ${formatPrice(latestPrice.precioMinimo)} - $
                  {formatPrice(latestPrice.precioMaximo)}
                </Text>
                <Text style={styles.priceCurrency}>COP</Text>
              </View>
              <View style={styles.priceChange}>
                {percentChange >= 0 ? (
                  <TrendingUp size={20} color={Colors.light.chartPositive} />
                ) : (
                  <TrendingDown size={20} color={Colors.light.chartNegative} />
                )}
                <Text
                  style={[
                    styles.priceChangeText,
                    {
                      color:
                        percentChange >= 0
                          ? Colors.light.chartPositive
                          : Colors.light.chartNegative,
                    },
                  ]}
                >
                  {formatPercent(percentChange)}
                </Text>
              </View>
              <View style={styles.priceMeta}>
                <View style={styles.priceMetaItem}>
                  <MapPin size={12} color={Colors.light.textTertiary} />
                  <Text style={styles.priceMetaText}>Corabastos, Bogotá</Text>
                </View>
                <View style={styles.priceMetaItem}>
                  <Calendar size={12} color={Colors.light.textTertiary} />
                  <Text style={styles.priceMetaText}>{formatDate(latestPrice.fecha)}</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No hay datos disponibles</Text>
          )}
        </View>

        {/* Historical Line Chart */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Histórico de Precios</Text>
            <View style={styles.vizActions}>
              <TouchableOpacity
                style={styles.vizAction}
                onPress={() => {
                  setActiveChartConfig('lineChart');
                  setIsChartConfigModalVisible(true);
                }}
              >
                <Settings size={18} color={Colors.light.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.vizAction}>
                <Table size={18} color={Colors.light.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <LineChart
            series={[
              {
                id: 'main',
                label: producto.nombre,
                data: chartData,
                color: Colors.light.chartPrimary,
              },
            ]}
            showInsights={true}
          />
        </View>

        {/* Market Histogram */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Comparación por Mercados</Text>
            <View style={styles.vizActions}>
              <TouchableOpacity
                style={styles.vizAction}
                onPress={() => {
                  setActiveChartConfig('histogram');
                  setIsChartConfigModalVisible(true);
                }}
              >
                <Settings size={18} color={Colors.light.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.vizAction}>
                <Table size={18} color={Colors.light.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <Histogram data={marketPrices} showStats={true} />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  };

  const renderInsumoAgricola = () => {
    if (!selectedItem) return null;

    const insumo = insumosAgricolas.find((i) => i.id === selectedItem.id);
    if (!insumo) return null;

    // Generate mock historical data
    const dates: string[] = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    const basePrice = 65000;
    const chartData = dates.map((date, i) => ({
      date,
      value: basePrice + Math.sin(i * 0.3) * 3000 + Math.random() * 1000,
    }));

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Text style={styles.productLineage}>{insumo.categoriaInsumo}</Text>
          <Text style={styles.productName}>{insumo.nombre}</Text>
        </View>

        {/* Price Ticker */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Precio Actual</Text>
            <TouchableOpacity style={styles.vizAction}>
              <Settings size={18} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.priceTickerContainer}>
            <View style={styles.priceMain}>
              <Text style={styles.priceValue}>$64,157 - $66,325</Text>
              <Text style={styles.priceCurrency}>COP</Text>
            </View>
            <View style={styles.priceChange}>
              <TrendingUp size={20} color={Colors.light.chartPositive} />
              <Text style={[styles.priceChangeText, { color: Colors.light.chartPositive }]}>
                +0.63%
              </Text>
            </View>
            <View style={styles.priceMeta}>
              <Text style={styles.priceMetaText}>Presentación: 1 litro</Text>
              <Text style={styles.priceMetaText}>Octubre 2025</Text>
            </View>
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Histórico de Precios</Text>
            <View style={styles.vizActions}>
              <TouchableOpacity style={styles.vizAction}>
                <Settings size={18} color={Colors.light.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.vizAction}>
                <Table size={18} color={Colors.light.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <LineChart
            series={[
              {
                id: 'main',
                label: insumo.nombre,
                data: chartData,
                color: Colors.light.chartPrimary,
              },
            ]}
            showInsights={true}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  };

  const renderDistritoRiego = () => {
    if (!selectedItem) return null;

    const distrito = distritosRiego.find((d) => d.id === selectedItem.id);
    const precioDistrito = preciosDistritosRiego.find((p) => p.distritoId === selectedItem.id);

    if (!distrito) return null;

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Text style={styles.productLineage}>Distritos de Riego</Text>
          <Text style={styles.productName}>{distrito.nombre}</Text>
        </View>

        {/* Description */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Los distritos de riego son infraestructuras hidráulicas que permiten la distribución de
            agua para uso agrícola. Los precios corresponden al costo por hectárea según el periodo
            de pago ({distrito.tipoPago}).
          </Text>
        </View>

        {/* Price Ticker */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Precio Actual</Text>
            <TouchableOpacity style={styles.vizAction}>
              <Settings size={18} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>

          {precioDistrito ? (
            <View style={styles.priceTickerContainer}>
              <View style={styles.priceMain}>
                <Text style={styles.priceValue}>${formatPrice(precioDistrito.precioActual)}</Text>
                <Text style={styles.priceCurrency}>COP</Text>
              </View>
              <View style={styles.priceChange}>
                {precioDistrito.variacionPorcentual >= 0 ? (
                  <TrendingUp size={20} color={Colors.light.chartPositive} />
                ) : (
                  <TrendingDown size={20} color={Colors.light.chartNegative} />
                )}
                <Text
                  style={[
                    styles.priceChangeText,
                    {
                      color:
                        precioDistrito.variacionPorcentual >= 0
                          ? Colors.light.chartPositive
                          : Colors.light.chartNegative,
                    },
                  ]}
                >
                  {formatPercent(precioDistrito.variacionPorcentual)}
                </Text>
              </View>
              <View style={styles.priceMeta}>
                <Text style={styles.priceMetaText}>Tipo: {distrito.tipoPago}</Text>
                <Text style={styles.priceMetaText}>{precioDistrito.periodoActual}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No hay datos disponibles</Text>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  };

  const renderMercado = () => {
    if (!selectedItem) return null;

    const mercado = mercados.find((m) => m.id === selectedItem.id);
    if (!mercado) return null;

    // Mock comparison data
    const comparisons = [
      { producto: 'Limón tahití', subcategoria: 'Cítricos', categoria: 'FRUTAS', precio1: 40500, precio2: 48000, diff: 18.52 },
      { producto: 'Naranja valencia', subcategoria: 'Cítricos', categoria: 'FRUTAS', precio1: 2200, precio2: 2800, diff: 27.27 },
      { producto: 'Banano urabá', subcategoria: 'Otras frutas', categoria: 'FRUTAS', precio1: 1800, precio2: 2200, diff: 22.22 },
      { producto: 'Tomate chonto', subcategoria: 'Tomates', categoria: 'VERDURAS', precio1: 35500, precio2: 38000, diff: 7.04 },
      { producto: 'Cebolla roja', subcategoria: 'Cebollas', categoria: 'VERDURAS', precio1: 115500, precio2: 120000, diff: 3.9 },
    ];

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Text style={styles.productLineage}>{mercado.ciudad}</Text>
          <Text style={styles.productName}>{mercado.nombre}</Text>
        </View>

        {/* Comparison Table */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Comparador de Precios</Text>
            <TouchableOpacity style={styles.vizAction}>
              <Settings size={18} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonHeaderCell}>Producto</Text>
            <Text style={styles.comparisonHeaderCell}>{mercado.nombre}</Text>
            <Text style={styles.comparisonHeaderCell}>Colombia</Text>
            <Text style={styles.comparisonHeaderCell}>Dif %</Text>
          </View>

          {comparisons.map((item, index) => (
            <View key={index} style={styles.comparisonRow}>
              <View style={styles.comparisonProductCell}>
                <Text style={styles.comparisonProductName}>{item.producto}</Text>
                <Text style={styles.comparisonProductMeta}>{item.subcategoria}</Text>
              </View>
              <Text style={styles.comparisonPrice}>${formatPrice(item.precio1)}</Text>
              <Text style={styles.comparisonPrice}>${formatPrice(item.precio2)}</Text>
              <Text
                style={[
                  styles.comparisonDiff,
                  { color: item.diff >= 0 ? Colors.light.chartPositive : Colors.light.chartNegative },
                ]}
              >
                {item.diff >= 0 ? '+' : ''}
                {item.diff.toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  };

  const renderCategoria = () => {
    if (!selectedItem) return null;

    // Mock abastecimiento data for the category
    const dates: string[] = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    const chartData = dates.map((date, i) => ({
      date,
      value: 140000 + Math.sin(i * 0.5) * 15000 + Math.random() * 5000,
    }));

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Text style={styles.productLineage}>Categoría</Text>
          <Text style={styles.productName}>{selectedItem.nombre}</Text>
        </View>

        {/* Total Abastecimiento */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Abastecimiento Total</Text>
            <TouchableOpacity style={styles.vizAction}>
              <Settings size={18} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.abastecimientoContainer}>
            <Text style={styles.abastecimientoValue}>149,233</Text>
            <Text style={styles.abastecimientoUnit}>toneladas</Text>
            <Text style={styles.abastecimientoPeriod}>Octubre 2025 - 32 mercados</Text>
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.vizContainer}>
          <View style={styles.vizHeader}>
            <Text style={styles.vizTitle}>Tendencia de Abastecimiento</Text>
            <View style={styles.vizActions}>
              <TouchableOpacity style={styles.vizAction}>
                <Settings size={18} color={Colors.light.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.vizAction}>
                <Table size={18} color={Colors.light.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <LineChart
            series={[
              {
                id: 'main',
                label: `${selectedItem.nombre} - Toneladas`,
                data: chartData,
                color: Colors.light.chartPrimary,
              },
            ]}
            yAxisLabel="Toneladas"
            showInsights={true}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Floating Action Buttons */}
      <View style={styles.floatingActions}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsSearchVisible(!isSearchVisible)}
        >
          <Search size={20} color={Colors.light.textInverse} />
        </TouchableOpacity>
        {!selectedItem && (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Filter size={20} color={Colors.light.textInverse} />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Overlay */}
      {isSearchVisible && (
        <View style={styles.searchOverlay}>
          <View style={styles.searchContainer}>
            <SearchBar
              onSelect={handleSearchSelect}
              autoFocus={true}
              placeholder="Buscar productos, mercados..."
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsSearchVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content */}
      {renderContent()}

      {/* Filter Modal */}
      <AppModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        title="Filtros"
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Tipo de Producto</Text>
          <View style={styles.filterOptions}>
            {['Producto Agrícola', 'Insumo Agrícola', 'Distrito de Riego', 'Mercado'].map((tipo) => (
              <TouchableOpacity key={tipo} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>{tipo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Disponibilidad Temporal</Text>
          <View style={styles.filterOptions}>
            {['Últimas 24 horas', 'Última semana', 'Último mes', 'Último año'].map((tiempo) => (
              <TouchableOpacity key={tiempo} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>{tiempo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </AppModal>

      {/* Chart Config Modal */}
      <AppModal
        visible={isChartConfigModalVisible}
        onClose={() => setIsChartConfigModalVisible(false)}
        title="Configuración"
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Rango de Tiempo</Text>
          <View style={styles.filterOptions}>
            {['1 día', '1 semana', '1 mes', '6 meses', '1 año'].map((rango) => (
              <TouchableOpacity key={rango} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>{rango}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Geografía</Text>
          <View style={styles.filterOptions}>
            {['Colombia', 'Departamento', 'Municipio', 'Mercado'].map((geo) => (
              <TouchableOpacity key={geo} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>{geo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Serie Temporal</Text>
          <View style={styles.filterOptions}>
            {['Diario', 'Mensual'].map((serie) => (
              <TouchableOpacity key={serie} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>{serie}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </AppModal>
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
  floatingActions: {
    position: 'absolute',
    top: 60,
    right: Spacing.xl,
    zIndex: 100,
    gap: Spacing.sm,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.surface,
    paddingTop: 60,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    zIndex: 200,
    ...Shadows.xl,
  },
  searchContainer: {
    gap: Spacing.md,
  },
  cancelButton: {
    alignSelf: 'center',
    padding: Spacing.sm,
  },
  cancelButtonText: {
    ...Typography.label,
    color: Colors.light.primary,
  },
  noSelectionHeader: {
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  noSelectionTitle: {
    ...Typography.h2,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  noSelectionSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  groupContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  groupTitle: {
    ...Typography.h5,
    color: Colors.light.primary,
    marginBottom: Spacing.xs,
  },
  groupSubtitle: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  itemsContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  itemName: {
    ...Typography.body,
    color: Colors.light.text,
    flex: 1,
  },
  productHeader: {
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  productLineage: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.xs,
  },
  productName: {
    ...Typography.h2,
    color: Colors.light.text,
  },
  vizContainer: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  vizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  vizTitle: {
    ...Typography.h5,
    color: Colors.light.text,
  },
  vizActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  vizAction: {
    padding: Spacing.xs,
  },
  priceTickerContainer: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  priceMain: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  priceValue: {
    ...Typography.priceMain,
    color: Colors.light.text,
  },
  priceCurrency: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  priceChangeText: {
    ...Typography.label,
    fontWeight: '600',
  },
  priceMeta: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  priceMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  priceMetaText: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },
  noDataText: {
    ...Typography.body,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    padding: Spacing.xl,
  },
  infoBox: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: AgroColors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  abastecimientoContainer: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  abastecimientoValue: {
    ...Typography.dataLarge,
    color: Colors.light.primary,
  },
  abastecimientoUnit: {
    ...Typography.label,
    color: Colors.light.textSecondary,
  },
  abastecimientoPeriod: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.sm,
  },
  comparisonHeader: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.border,
    marginBottom: Spacing.sm,
  },
  comparisonHeaderCell: {
    ...Typography.labelSmall,
    color: Colors.light.textSecondary,
    flex: 1,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  comparisonProductCell: {
    flex: 1.5,
  },
  comparisonProductName: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
  comparisonProductMeta: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },
  comparisonPrice: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    flex: 1,
    textAlign: 'center',
  },
  comparisonDiff: {
    ...Typography.label,
    flex: 0.8,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: Spacing.xl,
  },
  filterLabel: {
    ...Typography.label,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  filterOption: {
    backgroundColor: Colors.light.surfaceSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterOptionText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
  bottomPadding: {
    height: 120,
  },
});
