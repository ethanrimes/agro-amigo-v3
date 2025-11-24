// SettingsScreen - User settings and preferences
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { spacing, borderRadius, layout } from '../theme/spacing';
import { Text, AppModal } from '../components';
import { departamentos, municipios, defaultUbicacion } from '../data/mockData';
import { Departamento, Municipio, UbicacionUsuario } from '../types';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.settingIconContainer}>
      <Ionicons name={icon as any} size={22} color={colors.primary[600]} />
    </View>
    <View style={styles.settingContent}>
      <Text variant="bodyMd" weight="medium">
        {title}
      </Text>
      {subtitle && (
        <Text variant="caption" color={colors.text.secondary}>
          {subtitle}
        </Text>
      )}
    </View>
    {rightElement}
    {showChevron && onPress && (
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    )}
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [ubicacion, setUbicacion] = useState<UbicacionUsuario>(defaultUbicacion);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>(ubicacion.departamentoCodigo);

  // Notification preferences
  const [notificacionesPrecio, setNotificacionesPrecio] = useState(true);
  const [notificacionesNoticias, setNotificacionesNoticias] = useState(true);

  const handleDepartamentoSelect = (depto: Departamento) => {
    setSelectedDepartamento(depto.codigo);
    // For simplicity, auto-select first municipio
    const munis = municipios.filter(m => m.departamentoCodigo === depto.codigo);
    if (munis.length > 0) {
      setUbicacion({
        departamentoCodigo: depto.codigo,
        departamento: depto.nombre,
        municipioCodigo: munis[0].codigo,
        municipio: munis[0].nombre,
      });
    }
  };

  const handleMunicipioSelect = (muni: Municipio) => {
    setUbicacion({
      ...ubicacion,
      municipioCodigo: muni.codigo,
      municipio: muni.nombre,
    });
    setShowLocationModal(false);
  };

  const filteredMunicipios = municipios.filter(
    m => m.departamentoCodigo === selectedDepartamento
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="h4" weight="bold">
          Ajustes
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Section */}
        <View style={styles.section}>
          <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
            UBICACIÓN
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="location"
              title="Mi ubicación"
              subtitle={`${ubicacion.municipio}, ${ubicacion.departamento}`}
              onPress={() => setShowLocationModal(true)}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
            NOTIFICACIONES
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="pricetag"
              title="Alertas de precios"
              subtitle="Recibe alertas cuando cambien los precios"
              showChevron={false}
              rightElement={
                <Switch
                  value={notificacionesPrecio}
                  onValueChange={setNotificacionesPrecio}
                  trackColor={{ false: colors.border.medium, true: colors.primary[300] }}
                  thumbColor={notificacionesPrecio ? colors.primary[600] : colors.background.primary}
                />
              }
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="newspaper"
              title="Noticias del sector"
              subtitle="Recibe las últimas noticias agrícolas"
              showChevron={false}
              rightElement={
                <Switch
                  value={notificacionesNoticias}
                  onValueChange={setNotificacionesNoticias}
                  trackColor={{ false: colors.border.medium, true: colors.primary[300] }}
                  thumbColor={notificacionesNoticias ? colors.primary[600] : colors.background.primary}
                />
              }
            />
          </View>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
            DATOS
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="cloud-download"
              title="Datos sin conexión"
              subtitle="Descargar datos para uso offline"
              onPress={() => {}}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="refresh"
              title="Actualizar datos"
              subtitle="Última actualización: Hace 5 minutos"
              onPress={() => {}}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="trash"
              title="Limpiar caché"
              subtitle="Liberar espacio de almacenamiento"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
            ACERCA DE
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information-circle"
              title="Acerca de SIPSA"
              subtitle="Sistema de Información de Precios"
              onPress={() => {}}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="document-text"
              title="Términos y condiciones"
              onPress={() => {}}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="shield-checkmark"
              title="Política de privacidad"
              onPress={() => {}}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="help-circle"
              title="Ayuda y soporte"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text variant="caption" color={colors.text.tertiary}>
            Agro Amigo v1.0.0
          </Text>
          <Text variant="caption" color={colors.text.tertiary}>
            Datos: DANE - SIPSA
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: spacing[8] }} />
      </ScrollView>

      {/* Location Modal */}
      <AppModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        title="Seleccionar ubicación"
        fullHeight
      >
        <View style={styles.locationSection}>
          <Text variant="label" weight="medium" style={styles.locationLabel}>
            Departamento
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.departamentosContainer}
          >
            {departamentos.map((depto) => (
              <TouchableOpacity
                key={depto.codigo}
                style={[
                  styles.departamentoChip,
                  selectedDepartamento === depto.codigo && styles.departamentoChipActive,
                ]}
                onPress={() => handleDepartamentoSelect(depto)}
              >
                <Text
                  variant="bodySm"
                  weight={selectedDepartamento === depto.codigo ? 'semibold' : 'regular'}
                  color={
                    selectedDepartamento === depto.codigo
                      ? colors.text.inverse
                      : colors.text.primary
                  }
                >
                  {depto.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.locationSection}>
          <Text variant="label" weight="medium" style={styles.locationLabel}>
            Municipio
          </Text>
          {filteredMunicipios.map((muni) => (
            <TouchableOpacity
              key={muni.codigo}
              style={[
                styles.municipioItem,
                ubicacion.municipioCodigo === muni.codigo && styles.municipioItemActive,
              ]}
              onPress={() => handleMunicipioSelect(muni)}
            >
              <Text
                variant="bodyMd"
                weight={ubicacion.municipioCodigo === muni.codigo ? 'semibold' : 'regular'}
              >
                {muni.nombre}
              </Text>
              {ubicacion.municipioCodigo === muni.codigo && (
                <Ionicons name="checkmark" size={20} color={colors.primary[600]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing[4],
  },
  section: {
    marginBottom: spacing[5],
  },
  sectionTitle: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.background.card,
    marginHorizontal: spacing[4],
    borderRadius: borderRadius.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  settingContent: {
    flex: 1,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginLeft: spacing[4] + 36 + spacing[3],
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  locationSection: {
    marginBottom: spacing[4],
  },
  locationLabel: {
    marginBottom: spacing[3],
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  departamentosContainer: {
    paddingBottom: spacing[2],
  },
  departamentoChip: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.secondary,
    marginRight: spacing[2],
  },
  departamentoChipActive: {
    backgroundColor: colors.primary[500],
  },
  municipioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
  },
  municipioItemActive: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
});

export default SettingsScreen;
