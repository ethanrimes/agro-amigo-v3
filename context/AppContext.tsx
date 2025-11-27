/**
 * App Context
 * Global state management for Agro Amigo
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  UserSettings,
  WatchlistItem,
  SearchResult,
  FilterOptions,
  ChartConfig,
} from '@/types';
import { defaultUserSettings } from '@/data/mockData';

interface AppState {
  userSettings: UserSettings;
  selectedItem: SearchResult | null;
  filterOptions: FilterOptions;
  chartConfig: ChartConfig;
  isSearchExpanded: boolean;
}

interface AppContextType extends AppState {
  setUserSettings: (settings: Partial<UserSettings>) => void;
  setSelectedItem: (item: SearchResult | null) => void;
  setFilterOptions: (options: FilterOptions) => void;
  setChartConfig: (config: Partial<ChartConfig>) => void;
  setIsSearchExpanded: (expanded: boolean) => void;
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;
  updateLocation: (departamentoCodigo: string, municipioCodigo: string, departamentoNombre: string, municipioNombre: string) => void;
}

const defaultChartConfig: ChartConfig = {
  geografiaTipo: 'colombia',
  seriesTemporal: 'diario',
  rangoPreset: '1m',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSettings, setUserSettingsState] = useState<UserSettings>(defaultUserSettings);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [chartConfig, setChartConfigState] = useState<ChartConfig>(defaultChartConfig);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const setUserSettings = useCallback((settings: Partial<UserSettings>) => {
    setUserSettingsState((prev) => ({ ...prev, ...settings }));
  }, []);

  const setChartConfig = useCallback((config: Partial<ChartConfig>) => {
    setChartConfigState((prev) => ({ ...prev, ...config }));
  }, []);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setUserSettingsState((prev) => ({
      ...prev,
      watchlist: [...prev.watchlist, item],
    }));
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setUserSettingsState((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((item) => item.id !== id),
    }));
  }, []);

  const updateLocation = useCallback(
    (
      departamentoCodigo: string,
      municipioCodigo: string,
      departamentoNombre: string,
      municipioNombre: string
    ) => {
      setUserSettingsState((prev) => ({
        ...prev,
        ubicacion: {
          departamentoCodigo,
          municipioCodigo,
          departamentoNombre,
          municipioNombre,
        },
      }));
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        userSettings,
        selectedItem,
        filterOptions,
        chartConfig,
        isSearchExpanded,
        setUserSettings,
        setSelectedItem,
        setFilterOptions,
        setChartConfig,
        setIsSearchExpanded,
        addToWatchlist,
        removeFromWatchlist,
        updateLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
