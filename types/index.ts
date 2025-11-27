/**
 * Agro Amigo Data Types
 * Colombian Agricultural Price Explorer
 */

// Data Hierarchy Types
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
}

export interface Producto {
  id: string;
  nombre: string;
  subcategoriaId: string;
  categoriaId: string;
  tipo: TipoProducto;
}

export interface Presentacion {
  id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
  productoId: string;
}

// Geographic Types
export interface Departamento {
  codigo: string;
  nombre: string;
}

export interface Municipio {
  codigo: string;
  nombre: string;
  departamentoCodigo: string;
}

export interface Mercado {
  id: string;
  nombre: string;
  municipioCodigo: string;
  ciudad: string;
}

// Price Data Types
export interface PrecioObservacion {
  id: string;
  productoId: string;
  presentacionId: string;
  mercadoId: string;
  fecha: string;
  precioMinimo: number;
  precioMaximo: number;
  precioPromedio?: number;
  seriesTemporal: 'diario' | 'mensual';
}

export interface PrecioHistorico {
  fecha: string;
  precioMinimo: number;
  precioMaximo: number;
  precioPromedio: number;
}

// Insumo Agricola Types
export interface InsumoAgricola {
  id: string;
  codigoCPC: string;
  nombre: string;
  categoriaInsumo: string;
  subcategoriaInsumo?: string;
}

export interface PrecioInsumo {
  id: string;
  insumoId: string;
  municipioCodigo: string;
  presentacion: string;
  precioPromedioAnterior: number;
  precioPromedioActual: number;
  variacionPorcentual: number;
  mesAnterior: string;
  mesActual: string;
}

// Distrito de Riego Types
export interface DistritoRiego {
  id: string;
  nombre: string;
  municipioCodigo: string;
  tipoPago: string;
}

export interface PrecioDistritoRiego {
  id: string;
  distritoId: string;
  precioAnterior: number;
  precioActual: number;
  variacionPorcentual: number;
  periodoAnterior: string;
  periodoActual: string;
}

// Abastecimiento Types
export interface Abastecimiento {
  mercadoId: string;
  mes: string;
  grupoAlimento: string;
  cantidadToneladas: number;
  participacionPorcentual: number;
}

export interface VehiculosIngreso {
  mercadoId: string;
  mes: string;
  vehiculosLivianos: number;
  vehiculosPesados: number;
  total: number;
}

// Search Result Types
export interface SearchResult {
  id: string;
  tipo: TipoProducto | 'categoria' | 'subcategoria' | 'mercado';
  nombre: string;
  lineageDisplay: string;
  matchedPart: string;
  data: any;
}

// Watchlist Types
export interface WatchlistItem {
  id: string;
  productoId: string;
  presentacionId: string;
  mercadoId: string;
  productoNombre: string;
  presentacionNombre: string;
  mercadoNombre: string;
  ciudad: string;
}

// News Types
export interface NewsItem {
  id: string;
  titulo: string;
  fuente: string;
  fecha: string;
  url: string;
}

// User Settings Types
export interface UserSettings {
  ubicacion: {
    departamentoCodigo: string;
    municipioCodigo: string;
    departamentoNombre: string;
    municipioNombre: string;
  };
  idioma: 'es' | 'en';
  notificaciones: boolean;
  watchlist: WatchlistItem[];
}

// Chart Configuration Types
export interface ChartConfig {
  presentacionId?: string;
  mercadoId?: string;
  geografiaTipo: 'colombia' | 'departamento' | 'municipio' | 'mercado';
  geografiaId?: string;
  seriesTemporal: 'diario' | 'mensual';
  fechaInicio?: string;
  fechaFin?: string;
  rangoPreset?: '1d' | '1w' | '1m' | '6m' | 'ytd' | '1y' | '2y';
}

export interface ChartSeries {
  id: string;
  productoId: string;
  presentacionId: string;
  geografiaTipo: 'colombia' | 'departamento' | 'municipio' | 'mercado';
  geografiaId?: string;
  seriesTemporal: 'diario' | 'mensual';
  color: string;
  label: string;
}

// Filter Types
export interface FilterOptions {
  tipos?: TipoProducto[];
  categorias?: string[];
  subcategorias?: string[];
  departamentos?: string[];
  municipios?: string[];
  mercados?: string[];
  rangoTemporal?: {
    desde: string;
    hasta: string;
  };
  disponibilidadGeografica?: number; // minimum number of geographies with data
}

// Market Comparison Types
export interface MarketComparison {
  producto: string;
  subcategoria: string;
  categoria: string;
  precioMercado1: number;
  precioMercado2: number;
  diferenciaPorcentual: number;
}

export interface MarketComparisonSummary {
  mercado1: {
    id: string;
    nombre: string;
  };
  mercado2: {
    id: string;
    nombre: string;
  };
  comparaciones: MarketComparison[];
  promedioCategoria: { [key: string]: number };
  promedioTotal: number;
}
