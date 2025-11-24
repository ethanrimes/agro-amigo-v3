// SearchBar component with dropdown results
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { layout, spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { SearchResult, TipoProducto } from '../types';
import api from '../services/api';
import Text from './Text';

interface SearchBarProps {
  placeholder?: string;
  onSelect: (result: SearchResult) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  expanded?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar productos, mercados...',
  onSelect,
  onFocus,
  onBlur,
  autoFocus = false,
  expanded = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await api.search(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      searchProducts(text);
    }, 300);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    // Delay blur to allow selection
    setTimeout(() => {
      setIsFocused(false);
      onBlur?.();
    }, 150);
  };

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setResults([]);
    Keyboard.dismiss();
    onSelect(result);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const targetHeight = results.length > 0 && isFocused ? Math.min(results.length * 70, 280) : 0;
    Animated.spring(animatedHeight, {
      toValue: targetHeight,
      useNativeDriver: false,
      tension: 100,
      friction: 10,
    }).start();
  }, [results.length, isFocused, animatedHeight]);

  const getTipoColor = (tipo: TipoProducto): string => {
    switch (tipo) {
      case 'producto_agricola':
        return colors.primary[500];
      case 'insumo_agricola':
        return colors.accent[500];
      case 'distrito_riego':
        return colors.chart.primary;
      case 'mercado_mayorista':
        return colors.secondary[500];
      default:
        return colors.text.secondary;
    }
  };

  const getTipoLabel = (tipo: TipoProducto): string => {
    switch (tipo) {
      case 'producto_agricola':
        return 'Agrícola';
      case 'insumo_agricola':
        return 'Insumo';
      case 'distrito_riego':
        return 'Riego';
      case 'mercado_mayorista':
        return 'Mercado';
      default:
        return '';
    }
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;

    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + searchTerm.length);
    const after = text.substring(index + searchTerm.length);

    return (
      <Text style={styles.lineageText}>
        {before}
        <Text style={styles.highlightedText}>{match}</Text>
        {after}
      </Text>
    );
  };

  const renderResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultName} numberOfLines={1}>
            {item.nombre}
          </Text>
          <View style={[styles.tipoBadge, { backgroundColor: getTipoColor(item.tipoProducto) + '20' }]}>
            <Text style={[styles.tipoBadgeText, { color: getTipoColor(item.tipoProducto) }]}>
              {getTipoLabel(item.tipoProducto)}
            </Text>
          </View>
        </View>
        <Text style={styles.lineageText} numberOfLines={1}>
          {item.lineage.map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Text style={styles.lineageSeparator}> {'>'} </Text>}
              {highlightMatch(part, query)}
            </React.Fragment>
          ))}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <Ionicons
          name="search"
          size={20}
          color={isFocused ? colors.primary[500] : colors.text.tertiary}
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={query}
          onChangeText={handleQueryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <Ionicons name="sync" size={18} color={colors.primary[500]} />
          </View>
        )}
      </View>

      <Animated.View style={[styles.resultsContainer, { maxHeight: animatedHeight }]}>
        {results.length > 0 && isFocused && (
          <FlatList
            data={results}
            renderItem={renderResult}
            keyExtractor={(item) => `${item.tipo}-${item.id}`}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  expandedContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    height: layout.inputHeight,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: colors.primary[500],
    backgroundColor: colors.background.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: spacing[2],
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    paddingVertical: spacing[2],
  },
  clearButton: {
    padding: spacing[1],
  },
  loadingIndicator: {
    marginLeft: spacing[2],
  },
  resultsContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    marginTop: spacing[2],
    overflow: 'hidden',
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
  resultsList: {
    paddingVertical: spacing[2],
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  resultContent: {
    flex: 1,
    marginRight: spacing[2],
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  resultName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
  },
  tipoBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing[2],
  },
  tipoBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  lineageText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  lineageSeparator: {
    color: colors.text.tertiary,
  },
  highlightedText: {
    color: colors.primary[600],
    fontWeight: typography.fontWeight.semibold,
  },
});

export default SearchBar;
