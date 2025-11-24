// Type definitions for Agro Amigo

// ============ HIERARCHICAL DATA TYPES ============

export type TipoProducto =
  | 'producto_agricola'
  | 'insumo_agricola'
  | 'distrito_riego'
  | 'mercado_mayorista';

export interface Categoria {
  id: string;
  nombre: string;
  tipo: TipoProducto;
}

export interface Subcategoria {
  id: string;
  nombre: string;
  categoriaId: string;
  categoria: string;
}

export interface Producto {
  id: string;
  nombre: string;
  subcategoriaId: string;
  subcategoria: string;
  categoriaId: string;
  categoria: string;
  tipo: TipoProducto;
}

export interface Presentacion {
  id: string;
  nombre: string;
  unidades: string;
  kilogramos: number;
  productoId: string;
}

// Full product hierarchy
export interface ProductoCompleto {
  id: string;
  nombre: string;
  presentacion: Presentacion;
  subcategoria: string;
  categoria: string;
  tipo: TipoProducto;
  tipoNombre: string;
  lineage: string[]; // Full path: ['Frutas', 'Cítricos', 'Limón tahití']
}

// ============ GEOGRAPHIC TYPES ============

export interface Departamento {
  codigo: string;
  nombre: string;
}

export interface Municipio {
  codigo: string;
  nombre: string;
  departamentoCodigo: string;
  departamento: string;
}

export interface Mercado {
  id: string;
  nombre: string;
  municipioCodigo: string;
  municipio: string;
  departamentoCodigo: string;
  departamento: string;
}

// ============ PRICE DATA TYPES ============

export interface PrecioObservacion {
  id: string;
  fecha: string;
  productoId: string;
  producto: string;
  presentacionId: string;
  presentacion: string;
  mercadoId: string;
  mercado: string;
  municipio: string;
  departamento: string;
  precioMinimo: number;
  precioMaximo: number;
  precioPromedio: number;
  unidad: string;
  serie: 'diario' | 'mensual';
}

export interface PrecioRango {
  minimo: number;
  maximo: number;
  promedio: number;
}

// ============ INSUMOS TYPES ============

export interface InsumoAgricola {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  presentacion: string;
}

export interface PrecioInsumo {
  id: string;
  fecha: string;
  insumoId: string;
  insumo: string;
  presentacion: string;
  municipioCodigo: string;
  municipio: string;
  departamentoCodigo: string;
  departamento: string;
  precioPromedio: number;
  variacionPorcentual: number | null;
}

// ============ DISTRITO DE RIEGO TYPES ============

export interface DistritoRiego {
  id: string;
  nombre: string;
  municipioCodigo: string;
  municipio: string;
  departamentoCodigo: string;
  departamento: string;
  tipoPago: string;
}

export interface PrecioDistritoRiego {
  id: string;
  fechaAnterior: string;
  fechaActual: string;
  distritoId: string;
  distrito: string;
  municipio: string;
  departamento: string;
  tipoPago: string;
  precioAnterior: number;
  precioActual: number;
  variacionPorcentual: number;
}

// ============ ABASTECIMIENTO TYPES ============

export interface AbastecimientoGrupo {
  id: string;
  mercadoId: string;
  mercado: string;
  mes: string;
  grupo: string;
  cantidadToneladas: number;
  participacionPorcentual: number;
  variacionPorcentual: number;
}

export interface VehiculosIngreso {
  id: string;
  mercadoId: string;
  mercado: string;
  mes: string;
  vehiculosLivianos: number;
  vehiculosPesados: number;
  total: number;
}

// ============ NEWS TYPES ============

export interface NoticiaAgricola {
  id: string;
  titulo: string;
  fuente: string;
  fecha: string;
  url: string;
}

// ============ USER PREFERENCES ============

export interface UbicacionUsuario {
  departamentoCodigo: string;
  departamento: string;
  municipioCodigo: string;
  municipio: string;
}

export interface WatchlistItem {
  id: string;
  productoId: string;
  producto: string;
  presentacionId: string;
  presentacion: string;
  mercadoId: string;
  mercado: string;
  tipo: TipoProducto;
}

// ============ SEARCH TYPES ============

export interface SearchResult {
  id: string;
  tipo: 'categoria' | 'subcategoria' | 'producto' | 'presentacion' | 'mercado';
  nombre: string;
  lineage: string[];
  matchedPart: string;
  tipoProducto: TipoProducto;
}

// ============ CHART TYPES ============

export interface TimeSeriesDataPoint {
  fecha: Date;
  valor: number;
  valorMinimo?: number;
  valorMaximo?: number;
}

export interface ChartSeries {
  id: string;
  nombre: string;
  color: string;
  data: TimeSeriesDataPoint[];
}

export interface HistogramDataPoint {
  rango: string;
  count: number;
  mercados: string[];
}

// ============ FILTER TYPES ============

export type DateRangeOption =
  | '1d'
  | '1w'
  | '1m'
  | '3m'
  | '6m'
  | 'ytd'
  | '1y'
  | '2y'
  | 'all';

export type SerieOption = 'diario' | 'mensual';

export interface AnalyzeFilters {
  presentacionId?: string;
  mercadoId?: string;
  departamentoCodigo?: string;
  serie: SerieOption;
  dateRange: DateRangeOption;
  fecha?: string;
}

// ============ NAVIGATION TYPES ============

export type RootStackParamList = {
  MainTabs: undefined;
  ProductoDetalle: { productoId: string; tipo: TipoProducto };
  MercadoDetalle: { mercadoId: string };
  CategoriaDetalle: { categoriaId: string };
  InsumoDetalle: { insumoId: string };
  DistritoRiegoDetalle: { distritoId: string };
  DataTable: { title: string; data: any[] };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Analyze: { productoId?: string; tipo?: TipoProducto };
  Geovisor: undefined;
  Settings: undefined;
};

// ============ MAP TYPES ============

export type MapAggregationLevel = 'departamento' | 'municipio' | 'mercado';

export interface MapVisualizationConfig {
  aggregationLevel: MapAggregationLevel;
  productoId?: string;
  tipoProducto: TipoProducto;
}

export interface GeoFeature {
  type: 'Feature';
  properties: {
    codigo: string;
    nombre: string;
    precio?: number;
    nivel: MapAggregationLevel;
  };
  geometry: any;
}
