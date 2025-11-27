/**
 * SearchBar Component
 * Hierarchical search with dropdown results
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Keyboard,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import {
  productos,
  categorias,
  subcategorias,
  mercados,
  insumosAgricolas,
  distritosRiego,
  getProductLineage,
  getCategoriaById,
  getSubcategoriaById,
} from '@/data/mockData';
import { SearchResult, TipoProducto } from '@/types';

interface SearchBarProps {
  onSelect: (result: SearchResult) => void;
  placeholder?: string;
  autoFocus?: boolean;
  expanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  placeholder = 'Buscar productos, mercados...',
  autoFocus = false,
  expanded: controlledExpanded,
  onExpandChange,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const setExpanded = (value: boolean) => {
    if (onExpandChange) {
      onExpandChange(value);
    } else {
      setInternalExpanded(value);
    }
  };

  const search = useCallback((text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerText = text.toLowerCase();

    // Search productos
    productos.forEach((producto) => {
      if (producto.nombre.toLowerCase().includes(lowerText)) {
        const lineage = getProductLineage(producto.id);
        searchResults.push({
          id: producto.id,
          tipo: producto.tipo,
          nombre: producto.nombre,
          lineageDisplay: lineage,
          matchedPart: producto.nombre,
          data: producto,
        });
      }
    });

    // Search categorias
    categorias.forEach((categoria) => {
      if (categoria.nombre.toLowerCase().includes(lowerText)) {
        searchResults.push({
          id: categoria.id,
          tipo: 'categoria',
          nombre: categoria.nombre,
          lineageDisplay: categoria.nombre,
          matchedPart: categoria.nombre,
          data: categoria,
        });
      }
    });

    // Search subcategorias
    subcategorias.forEach((subcategoria) => {
      if (subcategoria.nombre.toLowerCase().includes(lowerText)) {
        const categoria = getCategoriaById(subcategoria.categoriaId);
        searchResults.push({
          id: subcategoria.id,
          tipo: 'subcategoria',
          nombre: subcategoria.nombre,
          lineageDisplay: `${categoria?.nombre || ''} > ${subcategoria.nombre}`,
          matchedPart: subcategoria.nombre,
          data: subcategoria,
        });
      }
    });

    // Search mercados
    mercados.forEach((mercado) => {
      if (
        mercado.nombre.toLowerCase().includes(lowerText) ||
        mercado.ciudad.toLowerCase().includes(lowerText)
      ) {
        searchResults.push({
          id: mercado.id,
          tipo: 'mercado_mayorista',
          nombre: mercado.nombre,
          lineageDisplay: `${mercado.ciudad} > ${mercado.nombre}`,
          matchedPart: mercado.nombre,
          data: mercado,
        });
      }
    });

    // Search insumos
    insumosAgricolas.forEach((insumo) => {
      if (insumo.nombre.toLowerCase().includes(lowerText)) {
        searchResults.push({
          id: insumo.id,
          tipo: 'insumo_agricola',
          nombre: insumo.nombre,
          lineageDisplay: `${insumo.categoriaInsumo} > ${insumo.nombre}`,
          matchedPart: insumo.nombre,
          data: insumo,
        });
      }
    });

    // Search distritos de riego
    distritosRiego.forEach((distrito) => {
      if (distrito.nombre.toLowerCase().includes(lowerText)) {
        searchResults.push({
          id: distrito.id,
          tipo: 'distrito_riego',
          nombre: distrito.nombre,
          lineageDisplay: `Distritos de Riego > ${distrito.nombre}`,
          matchedPart: distrito.nombre,
          data: distrito,
        });
      }
    });

    setResults(searchResults.slice(0, 20)); // Limit results
  }, []);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded && results.length > 0 ? 300 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded, results.length]);

  const handleFocus = () => {
    setExpanded(true);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.blur();
    setExpanded(false);
  };

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setResults([]);
    setExpanded(false);
    Keyboard.dismiss();
    onSelect(result);
  };

  const getTipoLabel = (tipo: TipoProducto | 'categoria' | 'subcategoria' | 'mercado'): string => {
    const labels: Record<string, string> = {
      producto_agricola: 'Producto',
      insumo_agricola: 'Insumo',
      distrito_riego: 'Distrito',
      mercado_mayorista: 'Mercado',
      categoria: 'Categoría',
      subcategoria: 'Subcategoría',
    };
    return labels[tipo] || tipo;
  };

  const getTipoColor = (tipo: TipoProducto | 'categoria' | 'subcategoria' | 'mercado'): string => {
    const colors: Record<string, string> = {
      producto_agricola: Colors.light.primary,
      insumo_agricola: Colors.light.accent,
      distrito_riego: Colors.light.info,
      mercado_mayorista: Colors.light.brown,
      categoria: Colors.light.textSecondary,
      subcategoria: Colors.light.textSecondary,
    };
    return colors[tipo] || Colors.light.textSecondary;
  };

  const highlightMatch = (text: string, match: string) => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return <Text style={styles.resultLineage}>{text}</Text>;

    return (
      <Text style={styles.resultLineage}>
        {text.substring(0, index)}
        <Text style={styles.resultHighlight}>{text.substring(index, index + query.length)}</Text>
        {text.substring(index + query.length)}
      </Text>
    );
  };

  const renderResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleSelect(item)}>
      <View style={styles.resultContent}>
        <View style={[styles.tipoBadge, { backgroundColor: getTipoColor(item.tipo) + '20' }]}>
          <Text style={[styles.tipoText, { color: getTipoColor(item.tipo) }]}>
            {getTipoLabel(item.tipo)}
          </Text>
        </View>
        {highlightMatch(item.lineageDisplay, item.matchedPart)}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={20} color={Colors.light.icon} style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.textTertiary}
          value={query}
          onChangeText={search}
          onFocus={handleFocus}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={Colors.light.icon} />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={[styles.resultsContainer, { maxHeight: animatedHeight }]}>
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.tipo}-${item.id}`}
          renderItem={renderResult}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.light.text,
  },
  clearButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  resultsContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xs,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  resultItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  resultContent: {
    gap: Spacing.xs,
  },
  tipoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  tipoText: {
    ...Typography.labelSmall,
  },
  resultLineage: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  resultHighlight: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
});

export default SearchBar;
