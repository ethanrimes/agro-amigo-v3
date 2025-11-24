// FilterModal - Modal for filtering chart/data options
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Text from './Text';
import AppModal from './AppModal';
import { DateRangeOption, SerieOption } from '../types';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selected,
  onSelect,
}) => (
  <View style={styles.section}>
    <Text variant="label" weight="medium" style={styles.sectionTitle}>
      {title}
    </Text>
    <View style={styles.optionsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            selected === option.value && styles.optionButtonSelected,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            variant="bodySm"
            weight={selected === option.value ? 'semibold' : 'regular'}
            color={
              selected === option.value
                ? colors.text.inverse
                : colors.text.primary
            }
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export interface ChartFilters {
  presentacionId?: string;
  mercadoId?: string;
  departamentoCodigo?: string;
  serie: SerieOption;
  dateRange: DateRangeOption;
  fecha?: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: ChartFilters;
  onApply: (filters: ChartFilters) => void;
  presentacionOptions?: FilterOption[];
  mercadoOptions?: FilterOption[];
  departamentoOptions?: FilterOption[];
  showDateRange?: boolean;
  showSerie?: boolean;
  showPresentacion?: boolean;
  showGeography?: boolean;
}

const dateRangeOptions: FilterOption[] = [
  { label: '1 día', value: '1d' },
  { label: '1 semana', value: '1w' },
  { label: '1 mes', value: '1m' },
  { label: '3 meses', value: '3m' },
  { label: '6 meses', value: '6m' },
  { label: 'YTD', value: 'ytd' },
  { label: '1 año', value: '1y' },
  { label: '2 años', value: '2y' },
];

const serieOptions: FilterOption[] = [
  { label: 'Diario', value: 'diario' },
  { label: 'Mensual', value: 'mensual' },
];

const geographyLevelOptions: FilterOption[] = [
  { label: 'Colombia', value: 'colombia' },
  { label: 'Departamento', value: 'departamento' },
  { label: 'Municipio', value: 'municipio' },
  { label: 'Mercado', value: 'mercado' },
];

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApply,
  presentacionOptions = [],
  mercadoOptions = [],
  departamentoOptions = [],
  showDateRange = true,
  showSerie = true,
  showPresentacion = true,
  showGeography = true,
}) => {
  const [localFilters, setLocalFilters] = useState<ChartFilters>(filters);
  const [geographyLevel, setGeographyLevel] = useState<string>('colombia');

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      serie: 'diario',
      dateRange: '1m',
    });
    setGeographyLevel('colombia');
  };

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title="Filtros"
      headerRight={
        <TouchableOpacity onPress={handleReset}>
          <Text variant="bodySm" color={colors.primary[500]}>
            Restablecer
          </Text>
        </TouchableOpacity>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {showDateRange && (
          <FilterSection
            title="Rango de fechas"
            options={dateRangeOptions}
            selected={localFilters.dateRange}
            onSelect={(value) =>
              setLocalFilters({ ...localFilters, dateRange: value as DateRangeOption })
            }
          />
        )}

        {showSerie && (
          <FilterSection
            title="Serie de datos"
            options={serieOptions}
            selected={localFilters.serie}
            onSelect={(value) =>
              setLocalFilters({ ...localFilters, serie: value as SerieOption })
            }
          />
        )}

        {showPresentacion && presentacionOptions.length > 0 && (
          <FilterSection
            title="Presentación"
            options={presentacionOptions}
            selected={localFilters.presentacionId || ''}
            onSelect={(value) =>
              setLocalFilters({ ...localFilters, presentacionId: value })
            }
          />
        )}

        {showGeography && (
          <>
            <FilterSection
              title="Nivel geográfico"
              options={geographyLevelOptions}
              selected={geographyLevel}
              onSelect={setGeographyLevel}
            />

            {geographyLevel === 'departamento' && departamentoOptions.length > 0 && (
              <FilterSection
                title="Departamento"
                options={departamentoOptions}
                selected={localFilters.departamentoCodigo || ''}
                onSelect={(value) =>
                  setLocalFilters({ ...localFilters, departamentoCodigo: value })
                }
              />
            )}

            {geographyLevel === 'mercado' && mercadoOptions.length > 0 && (
              <FilterSection
                title="Mercado"
                options={mercadoOptions}
                selected={localFilters.mercadoId || ''}
                onSelect={(value) =>
                  setLocalFilters({ ...localFilters, mercadoId: value })
                }
              />
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text variant="bodyMd" weight="medium" color={colors.text.secondary}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text variant="bodyMd" weight="semibold" color={colors.text.inverse}>
            Aplicar
          </Text>
        </TouchableOpacity>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing[5],
  },
  sectionTitle: {
    marginBottom: spacing[3],
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[1],
  },
  optionButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    margin: spacing[1],
  },
  optionButtonSelected: {
    backgroundColor: colors.primary[500],
  },
  footer: {
    flexDirection: 'row',
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing[3],
    alignItems: 'center',
    marginRight: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
  },
  applyButton: {
    flex: 1,
    paddingVertical: spacing[3],
    alignItems: 'center',
    marginLeft: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[500],
  },
});

export default FilterModal;
