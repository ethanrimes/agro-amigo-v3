// DataTableScreen - Display data in table format
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { Text } from '../components';
import { RootStackParamList } from '../types';

type DataTableRouteProp = RouteProp<RootStackParamList, 'DataTable'>;

interface TableRow {
  [key: string]: string | number;
}

const DataTableScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<DataTableRouteProp>();
  const { title, data } = route.params;

  // Get columns from first row
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map((column, index) => (
        <View key={column} style={[styles.headerCell, index === 0 && styles.firstCell]}>
          <Text variant="label" weight="semibold" color={colors.text.secondary}>
            {column}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderRow = ({ item, index }: { item: TableRow; index: number }) => (
    <View style={[styles.dataRow, index % 2 === 0 && styles.evenRow]}>
      {columns.map((column, colIndex) => (
        <View key={column} style={[styles.dataCell, colIndex === 0 && styles.firstCell]}>
          <Text variant="bodySm" numberOfLines={2}>
            {String(item[column])}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyMd" color={colors.text.secondary}>
            No hay datos disponibles
          </Text>
        </View>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View>
            {renderHeader()}
            <FlatList
              data={data}
              renderItem={renderRow}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: insets.bottom + spacing[4] }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 2,
    borderBottomColor: colors.border.medium,
  },
  headerCell: {
    width: 120,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    justifyContent: 'center',
  },
  firstCell: {
    width: 150,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  evenRow: {
    backgroundColor: colors.background.tertiary,
  },
  dataCell: {
    width: 120,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    justifyContent: 'center',
  },
});

export default DataTableScreen;
