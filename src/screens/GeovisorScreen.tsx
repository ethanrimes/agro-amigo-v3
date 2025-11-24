// GeovisorScreen - Interactive map of Colombia with price heatmaps
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3';

import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { Text, AppModal, FloatingButton, SearchBar } from '../components';
import api from '../services/api';
import { Departamento, Mercado, Producto, SearchResult, MapAggregationLevel, TipoProducto } from '../types';
import { departamentos, mercados, productos, formatCurrency } from '../data/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Colombia bounding box approximately
const COLOMBIA_BOUNDS = {
  minLon: -79.5,
  maxLon: -66.8,
  minLat: -4.2,
  maxLat: 12.5,
};

// Simplified department coordinates (centroids) for demo
const DEPARTMENT_COORDS: { [key: string]: { lat: number; lon: number } } = {
  '05': { lat: 6.25, lon: -75.56 }, // Antioquia
  '08': { lat: 10.96, lon: -74.79 }, // Atlántico
  '11': { lat: 4.71, lon: -74.07 }, // Bogotá
  '13': { lat: 10.39, lon: -75.51 }, // Bolívar
  '15': { lat: 5.53, lon: -73.35 }, // Boyacá
  '17': { lat: 5.07, lon: -75.52 }, // Caldas
  '19': { lat: 2.44, lon: -76.61 }, // Cauca
  '20': { lat: 9.34, lon: -73.52 }, // Cesar
  '23': { lat: 8.75, lon: -75.88 }, // Córdoba
  '25': { lat: 5.03, lon: -74.03 }, // Cundinamarca
  '41': { lat: 2.93, lon: -75.28 }, // Huila
  '47': { lat: 10.46, lon: -74.21 }, // Magdalena
  '52': { lat: 1.21, lon: -77.27 }, // Nariño
  '54': { lat: 7.89, lon: -72.5 }, // Norte de Santander
  '63': { lat: 4.54, lon: -75.67 }, // Quindío
  '66': { lat: 4.81, lon: -75.68 }, // Risaralda
  '68': { lat: 7.13, lon: -73.13 }, // Santander
  '73': { lat: 4.44, lon: -75.23 }, // Tolima
  '76': { lat: 3.45, lon: -76.52 }, // Valle del Cauca
  '85': { lat: 5.34, lon: -72.4 }, // Casanare
};

interface MapDataPoint {
  id: string;
  nombre: string;
  lat: number;
  lon: number;
  precio: number;
  nivel: MapAggregationLevel;
}

interface GeovisorFilters {
  aggregationLevel: MapAggregationLevel;
  productoId: string;
  tipoProducto: TipoProducto;
}

const GeovisorScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<MapDataPoint | null>(null);

  const [filters, setFilters] = useState<GeovisorFilters>({
    aggregationLevel: 'departamento',
    productoId: 'papa-criolla',
    tipoProducto: 'producto_agricola',
  });

  const [mapData, setMapData] = useState<MapDataPoint[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);

  // Map dimensions
  const mapWidth = SCREEN_WIDTH;
  const mapHeight = SCREEN_HEIGHT - insets.top - insets.bottom - 100;

  // Projection
  const projection = d3.geoMercator()
    .center([-74, 4.5]) // Center of Colombia
    .scale(mapWidth * 2.5)
    .translate([mapWidth / 2, mapHeight / 2]);

  useEffect(() => {
    loadMapData();
    loadSelectedProducto();
  }, [filters]);

  const loadSelectedProducto = async () => {
    const producto = await api.getProductoById(filters.productoId);
    setSelectedProducto(producto || null);
  };

  const loadMapData = async () => {
    setIsLoading(true);
    try {
      // Get prices for the selected product
      const precios = await api.getPrecios({ productoId: filters.productoId, limit: 100 });

      // Aggregate by department or market
      const dataMap = new Map<string, { total: number; count: number; nombre: string; lat: number; lon: number }>();

      for (const precio of precios) {
        let key: string;
        let nombre: string;
        let coords: { lat: number; lon: number } | undefined;

        if (filters.aggregationLevel === 'departamento') {
          const mercado = mercados.find(m => m.id === precio.mercadoId);
          if (!mercado) continue;
          key = mercado.departamentoCodigo;
          nombre = mercado.departamento;
          coords = DEPARTMENT_COORDS[key];
        } else {
          key = precio.mercadoId;
          nombre = precio.mercado;
          const mercado = mercados.find(m => m.id === precio.mercadoId);
          if (mercado) {
            coords = DEPARTMENT_COORDS[mercado.departamentoCodigo];
            // Add small offset for market-level to differentiate from department
            if (coords) {
              coords = {
                lat: coords.lat + (Math.random() - 0.5) * 0.5,
                lon: coords.lon + (Math.random() - 0.5) * 0.5,
              };
            }
          }
        }

        if (!coords) continue;

        const existing = dataMap.get(key);
        if (existing) {
          existing.total += precio.precioPromedio;
          existing.count += 1;
        } else {
          dataMap.set(key, {
            total: precio.precioPromedio,
            count: 1,
            nombre,
            lat: coords.lat,
            lon: coords.lon,
          });
        }
      }

      const points: MapDataPoint[] = [];
      dataMap.forEach((value, key) => {
        points.push({
          id: key,
          nombre: value.nombre,
          lat: value.lat,
          lon: value.lon,
          precio: value.total / value.count,
          nivel: filters.aggregationLevel,
        });
      });

      setMapData(points);
    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorForPrice = (precio: number): string => {
    const prices = mapData.map(d => d.precio);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const normalized = (precio - minPrice) / (maxPrice - minPrice);

    // Color scale from green (low) to orange to red (high)
    if (normalized < 0.33) {
      return colors.chart.positive;
    } else if (normalized < 0.66) {
      return colors.accent[500];
    } else {
      return colors.chart.negative;
    }
  };

  const handleSearchSelect = (result: SearchResult) => {
    setShowSearchModal(false);
    setFilters({
      ...filters,
      productoId: result.id,
      tipoProducto: result.tipoProducto,
    });
  };

  const handleAggregationChange = (level: MapAggregationLevel) => {
    setFilters({
      ...filters,
      aggregationLevel: level,
    });
  };

  const handlePointPress = (point: MapDataPoint) => {
    setSelectedPoint(point);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Map Container */}
      <View style={styles.mapContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary[500]} />
            <Text variant="bodySm" color={colors.text.secondary} style={styles.loadingText}>
              Cargando mapa...
            </Text>
          </View>
        ) : (
          <Svg width={mapWidth} height={mapHeight}>
            {/* Background */}
            <G>
              {/* Colombia outline (simplified) */}
              <Path
                d="M 180,50 L 280,80 L 320,150 L 300,300 L 250,400 L 180,450 L 120,400 L 80,300 L 100,150 L 150,80 Z"
                fill={colors.background.secondary}
                stroke={colors.border.medium}
                strokeWidth={1}
                transform={`translate(${mapWidth / 2 - 200}, ${mapHeight / 2 - 250}) scale(1.2)`}
              />
            </G>

            {/* Data points */}
            {mapData.map((point) => {
              const coords = projection([point.lon, point.lat]);
              if (!coords) return null;

              const [x, y] = coords;
              const radius = filters.aggregationLevel === 'mercado' ? 8 : 15;
              const color = getColorForPrice(point.precio);

              return (
                <G key={point.id}>
                  {/* Outer glow */}
                  <Circle
                    cx={x}
                    cy={y}
                    r={radius + 4}
                    fill={color}
                    opacity={0.2}
                  />
                  {/* Main circle */}
                  <Circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    stroke={colors.background.primary}
                    strokeWidth={2}
                    onPress={() => handlePointPress(point)}
                  />
                  {/* Label */}
                  {filters.aggregationLevel === 'departamento' && (
                    <SvgText
                      x={x}
                      y={y + radius + 14}
                      fontSize={10}
                      fill={colors.text.secondary}
                      textAnchor="middle"
                    >
                      {point.nombre.substring(0, 10)}
                    </SvgText>
                  )}
                </G>
              );
            })}
          </Svg>
        )}

        {/* Selected product badge */}
        <View style={[styles.productBadge, { top: insets.top + spacing[2] }]}>
          <TouchableOpacity
            style={styles.productBadgeContent}
            onPress={() => setShowSearchModal(true)}
          >
            <Text variant="bodySm" weight="medium" numberOfLines={1}>
              {selectedProducto?.nombre || 'Seleccionar producto'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text variant="caption" weight="medium" style={styles.legendTitle}>
            Precio
          </Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.chart.positive }]} />
              <Text variant="caption">Bajo</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.accent[500] }]} />
              <Text variant="caption">Medio</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.chart.negative }]} />
              <Text variant="caption">Alto</Text>
            </View>
          </View>
        </View>

        {/* Settings button */}
        <FloatingButton
          icon="settings-outline"
          onPress={() => setShowSettingsModal(true)}
          position={{ top: insets.top + 60, right: 20 }}
          size="small"
          backgroundColor={colors.background.card}
          iconColor={colors.text.primary}
        />
      </View>

      {/* Selected point info */}
      {selectedPoint && (
        <View style={[styles.infoCard, { bottom: insets.bottom + 20 }]}>
          <View style={styles.infoHeader}>
            <Text variant="label" weight="semibold">
              {selectedPoint.nombre}
            </Text>
            <TouchableOpacity onPress={() => setSelectedPoint(null)}>
              <Ionicons name="close" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          </View>
          <Text variant="h5" weight="bold" color={colors.primary[700]}>
            {formatCurrency(selectedPoint.precio)}
          </Text>
          <Text variant="caption" color={colors.text.secondary}>
            Precio promedio • {selectedProducto?.nombre}
          </Text>
        </View>
      )}

      {/* Settings Modal */}
      <AppModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Configuración del mapa"
      >
        <View style={styles.settingsSection}>
          <Text variant="label" weight="medium" style={styles.settingLabel}>
            Nivel de agregación
          </Text>
          <View style={styles.optionsRow}>
            {(['departamento', 'mercado'] as MapAggregationLevel[]).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  filters.aggregationLevel === level && styles.optionButtonActive,
                ]}
                onPress={() => handleAggregationChange(level)}
              >
                <Text
                  variant="bodySm"
                  weight={filters.aggregationLevel === level ? 'semibold' : 'regular'}
                  color={filters.aggregationLevel === level ? colors.text.inverse : colors.text.primary}
                >
                  {level === 'departamento' ? 'Departamento' : 'Mercado'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text variant="label" weight="medium" style={styles.settingLabel}>
            Producto
          </Text>
          <TouchableOpacity
            style={styles.productSelector}
            onPress={() => {
              setShowSettingsModal(false);
              setShowSearchModal(true);
            }}
          >
            <Text variant="bodyMd">
              {selectedProducto?.nombre || 'Seleccionar'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </View>
      </AppModal>

      {/* Search Modal */}
      <AppModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        title="Buscar producto"
      >
        <SearchBar onSelect={handleSearchSelect} autoFocus />
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing[2],
  },
  productBadge: {
    position: 'absolute',
    left: spacing[4],
    right: spacing[16],
  },
  productBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  legend: {
    position: 'absolute',
    bottom: spacing[4],
    left: spacing[4],
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  legendTitle: {
    marginBottom: spacing[2],
    color: colors.text.secondary,
  },
  legendItems: {
    gap: spacing[2],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing[2],
  },
  infoCard: {
    position: 'absolute',
    left: spacing[4],
    right: spacing[4],
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  settingsSection: {
    marginBottom: spacing[5],
  },
  settingLabel: {
    marginBottom: spacing[3],
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  optionButton: {
    flex: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: colors.primary[500],
  },
  productSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
});

export default GeovisorScreen;
