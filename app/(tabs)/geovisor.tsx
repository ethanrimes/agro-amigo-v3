/**
 * Geovisor Screen
 * Interactive map with price heatmap visualizations
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Settings, Layers, MapPin, Info } from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, AgroColors } from '@/constants/theme';
import { AppModal } from '@/components/common/AppModal';
import { SearchBar } from '@/components/common/SearchBar';
import { useAppContext } from '@/context/AppContext';
import { mercados, departamentos, productos } from '@/data/mockData';
import { SearchResult } from '@/types';
import { formatPrice } from '@/utils/formatting';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Colombia center coordinates
const COLOMBIA_CENTER = {
  latitude: 4.570868,
  longitude: -74.297333,
};

// Mock market data with coordinates
const marketLocations = [
  { id: 'corabastos', name: 'Corabastos', city: 'Bogotá', lat: 4.6097, lng: -74.0817, price: 40500 },
  { id: 'barranquillita', name: 'Barranquillita', city: 'Barranquilla', lat: 10.9639, lng: -74.7964, price: 41000 },
  { id: 'central-mayorista-antioquia', name: 'Central Mayorista', city: 'Medellín', lat: 6.2476, lng: -75.5658, price: 39800 },
  { id: 'cavasa', name: 'Cavasa', city: 'Cali', lat: 3.4516, lng: -76.5320, price: 42000 },
  { id: 'centroabastos', name: 'Centroabastos', city: 'Bucaramanga', lat: 7.1193, lng: -73.1227, price: 38500 },
  { id: 'bazurto', name: 'Bazurto', city: 'Cartagena', lat: 10.3932, lng: -75.4832, price: 43000 },
  { id: 'mercar', name: 'Mercar', city: 'Armenia', lat: 4.5389, lng: -75.6723, price: 37500 },
  { id: 'cenabastos', name: 'Cenabastos', city: 'Cúcuta', lat: 7.8939, lng: -72.5078, price: 40000 },
];

export default function GeovisorScreen() {
  const { setSelectedItem } = useAppContext();
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false);
  const [isMarketInfoVisible, setIsMarketInfoVisible] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<typeof marketLocations[0] | null>(null);
  const [aggregationLevel, setAggregationLevel] = useState<'departamento' | 'municipio' | 'mercado'>('mercado');
  const [selectedProduct, setSelectedProduct] = useState<string>('limon-tahiti');

  const handleMarkerPress = (market: typeof marketLocations[0]) => {
    setSelectedMarket(market);
    setIsMarketInfoVisible(true);
  };

  const handleSearchSelect = (result: SearchResult) => {
    if (result.tipo === 'producto_agricola') {
      setSelectedProduct(result.id);
    }
    setIsConfigModalVisible(false);
  };

  const getPriceColor = (price: number) => {
    const minPrice = 35000;
    const maxPrice = 45000;
    const normalized = (price - minPrice) / (maxPrice - minPrice);

    if (normalized < 0.33) return AgroColors.primary[500];
    if (normalized < 0.66) return AgroColors.gold[500];
    return AgroColors.orange[500];
  };

  return (
    <View style={styles.container}>
      {/* Map Placeholder - In production, use @rnmapbox/maps */}
      <View style={styles.mapContainer}>
        {/* Mock map background */}
        <View style={styles.mockMap}>
          <Text style={styles.mockMapText}>Mapa de Colombia</Text>
          <Text style={styles.mockMapSubtext}>
            Conectar con @rnmapbox/maps para visualización completa
          </Text>

          {/* Market markers */}
          {marketLocations.map((market) => (
            <TouchableOpacity
              key={market.id}
              style={[
                styles.marketMarker,
                {
                  backgroundColor: getPriceColor(market.price),
                  // Position markers roughly on mock map
                  left: `${20 + (market.lng + 79) * 8}%`,
                  top: `${80 - (market.lat - 2) * 8}%`,
                },
              ]}
              onPress={() => handleMarkerPress(market)}
            >
              <MapPin size={16} color={Colors.light.textInverse} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Precio por kg</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: AgroColors.primary[500] }]} />
              <Text style={styles.legendLabel}>Bajo</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: AgroColors.gold[500] }]} />
              <Text style={styles.legendLabel}>Medio</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: AgroColors.orange[500] }]} />
              <Text style={styles.legendLabel}>Alto</Text>
            </View>
          </View>
        </View>

        {/* Current Product Badge */}
        <View style={styles.productBadge}>
          <Text style={styles.productBadgeText}>
            {productos.find((p) => p.id === selectedProduct)?.nombre || 'Limón tahití'}
          </Text>
        </View>
      </View>

      {/* Floating Config Button */}
      <TouchableOpacity
        style={styles.configButton}
        onPress={() => setIsConfigModalVisible(true)}
      >
        <Settings size={20} color={Colors.light.textInverse} />
      </TouchableOpacity>

      {/* Layers Button */}
      <TouchableOpacity
        style={[styles.configButton, styles.layersButton]}
        onPress={() => {}}
      >
        <Layers size={20} color={Colors.light.textInverse} />
      </TouchableOpacity>

      {/* Market Info Panel */}
      {selectedMarket && (
        <View style={[styles.infoPanel, { opacity: isMarketInfoVisible ? 1 : 0 }]}>
          <View style={styles.infoPanelHeader}>
            <View>
              <Text style={styles.infoPanelCity}>{selectedMarket.city}</Text>
              <Text style={styles.infoPanelName}>{selectedMarket.name}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsMarketInfoVisible(false)}>
              <Text style={styles.infoPanelClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoPanelContent}>
            <View style={styles.infoPanelRow}>
              <Text style={styles.infoPanelLabel}>Producto</Text>
              <Text style={styles.infoPanelValue}>
                {productos.find((p) => p.id === selectedProduct)?.nombre}
              </Text>
            </View>
            <View style={styles.infoPanelRow}>
              <Text style={styles.infoPanelLabel}>Precio</Text>
              <Text style={styles.infoPanelValue}>
                ${formatPrice(selectedMarket.price)} COP/kg
              </Text>
            </View>
            <View style={styles.infoPanelRow}>
              <Text style={styles.infoPanelLabel}>Fecha</Text>
              <Text style={styles.infoPanelValue}>21 Nov 2025</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => {
              setSelectedItem({
                id: selectedMarket.id,
                tipo: 'mercado_mayorista',
                nombre: selectedMarket.name,
                lineageDisplay: `${selectedMarket.city} > ${selectedMarket.name}`,
                matchedPart: selectedMarket.name,
                data: selectedMarket,
              });
            }}
          >
            <Text style={styles.viewDetailsText}>Ver Detalles del Mercado</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Config Modal */}
      <AppModal
        visible={isConfigModalVisible}
        onClose={() => setIsConfigModalVisible(false)}
        title="Configuración del Mapa"
      >
        <View style={styles.configSection}>
          <Text style={styles.configLabel}>Nivel de Agregación</Text>
          <View style={styles.configOptions}>
            {[
              { id: 'departamento', label: 'Departamento' },
              { id: 'municipio', label: 'Municipio' },
              { id: 'mercado', label: 'Mercado' },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.configOption,
                  aggregationLevel === option.id && styles.configOptionActive,
                ]}
                onPress={() => setAggregationLevel(option.id as typeof aggregationLevel)}
              >
                <Text
                  style={[
                    styles.configOptionText,
                    aggregationLevel === option.id && styles.configOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.configSection}>
          <Text style={styles.configLabel}>Producto para Heatmap</Text>
          <SearchBar
            onSelect={handleSearchSelect}
            placeholder="Buscar producto..."
          />
        </View>

        <View style={styles.configSection}>
          <Text style={styles.configLabel}>Tipo de Datos</Text>
          <View style={styles.configOptions}>
            {['Producto Agrícola', 'Insumo Agrícola', 'Distrito de Riego'].map((tipo) => (
              <TouchableOpacity key={tipo} style={styles.configOption}>
                <Text style={styles.configOptionText}>{tipo}</Text>
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#E8F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mockMapText: {
    ...Typography.h3,
    color: Colors.light.textTertiary,
  },
  mockMapSubtext: {
    ...Typography.bodySmall,
    color: Colors.light.textTertiary,
    marginTop: Spacing.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  marketMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
    borderWidth: 2,
    borderColor: Colors.light.surface,
  },
  legend: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.md,
  },
  legendTitle: {
    ...Typography.labelSmall,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
  },
  legendItems: {
    gap: Spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendLabel: {
    ...Typography.caption,
    color: Colors.light.text,
  },
  productBadge: {
    position: 'absolute',
    top: 60,
    left: Spacing.xl,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  productBadgeText: {
    ...Typography.label,
    color: Colors.light.textInverse,
  },
  configButton: {
    position: 'absolute',
    top: 60,
    right: Spacing.xl,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  layersButton: {
    top: 112,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.xl,
    right: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.xl,
  },
  infoPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  infoPanelCity: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
  },
  infoPanelName: {
    ...Typography.h5,
    color: Colors.light.text,
  },
  infoPanelClose: {
    ...Typography.label,
    color: Colors.light.primary,
  },
  infoPanelContent: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  infoPanelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoPanelLabel: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  infoPanelValue: {
    ...Typography.label,
    color: Colors.light.text,
  },
  viewDetailsButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  viewDetailsText: {
    ...Typography.label,
    color: Colors.light.textInverse,
  },
  configSection: {
    marginBottom: Spacing.xl,
  },
  configLabel: {
    ...Typography.label,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  configOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  configOption: {
    backgroundColor: Colors.light.surfaceSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  configOptionActive: {
    backgroundColor: Colors.light.primaryLight,
    borderColor: Colors.light.primary,
  },
  configOptionText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
  configOptionTextActive: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
});
