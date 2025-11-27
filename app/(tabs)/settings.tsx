/**
 * Settings Screen
 * User preferences and location configuration
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  MapPin,
  Bell,
  Globe,
  ChevronRight,
  User,
  Info,
  BookOpen,
  Mail,
  Star,
  Shield,
} from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, AgroColors } from '@/constants/theme';
import { AppModal } from '@/components/common/AppModal';
import { useAppContext } from '@/context/AppContext';
import { departamentos, municipios } from '@/data/mockData';

export default function SettingsScreen() {
  const { userSettings, setUserSettings, updateLocation } = useAppContext();
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState<string | null>(
    userSettings.ubicacion.departamentoCodigo
  );

  const handleDepartamentoSelect = (codigo: string, nombre: string) => {
    setSelectedDepartamento(codigo);
  };

  const handleMunicipioSelect = (codigo: string, nombre: string) => {
    const depto = departamentos.find((d) => d.codigo === selectedDepartamento);
    if (depto) {
      updateLocation(selectedDepartamento!, codigo, depto.nombre, nombre);
    }
    setIsLocationModalVisible(false);
  };

  const toggleNotifications = () => {
    setUserSettings({ notificaciones: !userSettings.notificaciones });
  };

  const filteredMunicipios = selectedDepartamento
    ? municipios.filter((m) => m.departamentoCodigo === selectedDepartamento)
    : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Configuración</Text>
          <Text style={styles.headerSubtitle}>Personaliza tu experiencia</Text>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => setIsLocationModalVisible(true)}
          >
            <View style={styles.settingIconContainer}>
              <MapPin size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Mi Ubicación</Text>
              <Text style={styles.settingValue}>
                {userSettings.ubicacion.municipioNombre}, {userSettings.ubicacion.departamentoNombre}
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notificaciones</Text>
              <Text style={styles.settingDescription}>
                Recibe alertas de cambios de precios
              </Text>
            </View>
            <Switch
              value={userSettings.notificaciones}
              onValueChange={toggleNotifications}
              trackColor={{ false: Colors.light.border, true: AgroColors.primary[200] }}
              thumbColor={userSettings.notificaciones ? Colors.light.primary : Colors.light.textTertiary}
            />
          </View>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Globe size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Idioma</Text>
              <Text style={styles.settingValue}>Español</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Watchlist Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lista de Seguimiento</Text>
          <View style={styles.watchlistInfo}>
            <Text style={styles.watchlistCount}>
              {userSettings.watchlist.length} productos
            </Text>
            <Text style={styles.watchlistDescription}>
              Administra los productos que sigues para ver sus precios en el inicio
            </Text>
          </View>

          <View style={styles.watchlistItems}>
            {userSettings.watchlist.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.watchlistItem}>
                <View style={styles.watchlistItemContent}>
                  <Text style={styles.watchlistItemName}>{item.productoNombre}</Text>
                  <Text style={styles.watchlistItemMeta}>
                    {item.mercadoNombre} - {item.ciudad}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.watchlistRemove}>Quitar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {userSettings.watchlist.length > 3 && (
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>
                Ver todos ({userSettings.watchlist.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Info size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Acerca de Agro Amigo</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <BookOpen size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Fuentes de Datos</Text>
              <Text style={styles.settingDescription}>DANE - SIPSA</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Política de Privacidad</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Mail size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Contacto</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Star size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Calificar la App</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Agro Amigo v1.0.0</Text>
          <Text style={styles.versionSubtext}>Datos: DANE - SIPSA Colombia</Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Location Modal */}
      <AppModal
        visible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
        title="Seleccionar Ubicación"
        fullHeight
      >
        <View style={styles.locationSelector}>
          {/* Departamento Selection */}
          <Text style={styles.locationSectionTitle}>Departamento</Text>
          <ScrollView
            style={styles.locationList}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {departamentos.map((depto) => (
              <TouchableOpacity
                key={depto.codigo}
                style={[
                  styles.locationItem,
                  selectedDepartamento === depto.codigo && styles.locationItemSelected,
                ]}
                onPress={() => handleDepartamentoSelect(depto.codigo, depto.nombre)}
              >
                <Text
                  style={[
                    styles.locationItemText,
                    selectedDepartamento === depto.codigo && styles.locationItemTextSelected,
                  ]}
                >
                  {depto.nombre}
                </Text>
                {selectedDepartamento === depto.codigo && (
                  <View style={styles.checkmark} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Municipio Selection */}
          {selectedDepartamento && filteredMunicipios.length > 0 && (
            <>
              <Text style={[styles.locationSectionTitle, { marginTop: Spacing.xl }]}>
                Municipio
              </Text>
              <ScrollView
                style={styles.locationList}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
              >
                {filteredMunicipios.map((muni) => (
                  <TouchableOpacity
                    key={muni.codigo}
                    style={[
                      styles.locationItem,
                      userSettings.ubicacion.municipioCodigo === muni.codigo &&
                        styles.locationItemSelected,
                    ]}
                    onPress={() => handleMunicipioSelect(muni.codigo, muni.nombre)}
                  >
                    <Text
                      style={[
                        styles.locationItemText,
                        userSettings.ubicacion.municipioCodigo === muni.codigo &&
                          styles.locationItemTextSelected,
                      ]}
                    >
                      {muni.nombre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
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
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
    ...Shadows.sm,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.light.text,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: AgroColors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...Typography.label,
    color: Colors.light.text,
  },
  settingValue: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    marginTop: 2,
  },
  settingDescription: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: 2,
  },
  watchlistInfo: {
    backgroundColor: AgroColors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  watchlistCount: {
    ...Typography.h4,
    color: Colors.light.primary,
  },
  watchlistDescription: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  watchlistItems: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  watchlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  watchlistItemContent: {
    flex: 1,
  },
  watchlistItemName: {
    ...Typography.label,
    color: Colors.light.text,
  },
  watchlistItemMeta: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: 2,
  },
  watchlistRemove: {
    ...Typography.label,
    color: Colors.light.error,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  viewAllText: {
    ...Typography.label,
    color: Colors.light.primary,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  versionText: {
    ...Typography.body,
    color: Colors.light.textTertiary,
  },
  versionSubtext: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
  },
  bottomPadding: {
    height: 100,
  },
  locationSelector: {
    flex: 1,
  },
  locationSectionTitle: {
    ...Typography.label,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  locationList: {
    maxHeight: 200,
    backgroundColor: Colors.light.surfaceSecondary,
    borderRadius: BorderRadius.lg,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  locationItemSelected: {
    backgroundColor: AgroColors.primary[50],
  },
  locationItemText: {
    ...Typography.body,
    color: Colors.light.text,
  },
  locationItemTextSelected: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
});
