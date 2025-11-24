// API Service - FastAPI scaffolding for Agro Amigo
// This service will eventually connect to a real FastAPI backend
// Currently using mock data

import {
  PrecioObservacion,
  PrecioInsumo,
  PrecioDistritoRiego,
  AbastecimientoGrupo,
  VehiculosIngreso,
  NoticiaAgricola,
  Producto,
  Mercado,
  Departamento,
  Municipio,
  InsumoAgricola,
  DistritoRiego,
  Categoria,
  Subcategoria,
  Presentacion,
  SearchResult,
  TipoProducto,
  DateRangeOption,
  SerieOption,
} from '../types';

import {
  precioObservaciones,
  precioInsumos,
  precioDistritosRiego,
  abastecimientoGrupos,
  vehiculosIngreso,
  noticiasAgricolas,
  productos,
  mercados,
  departamentos,
  municipios,
  insumosAgricolas,
  distritosRiego,
  categorias,
  subcategorias,
  presentaciones,
} from '../data/mockData';

// Base URL for the FastAPI backend (will be configured later)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Simulated network delay for realistic UX
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============ GENERIC FETCH WRAPPER ============

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   ...options,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     ...options?.headers,
    //   },
    // });
    // const data = await response.json();
    // return { data, success: true };

    await simulateDelay();
    throw new Error('Not implemented - using mock data');
  } catch (error) {
    console.log(`API call to ${endpoint} using mock data`);
    throw error;
  }
}

// ============ PRODUCTOS AGRICOLAS ============

export const getProductos = async (): Promise<Producto[]> => {
  await simulateDelay(200);
  return productos;
};

export const getProductoById = async (id: string): Promise<Producto | undefined> => {
  await simulateDelay(100);
  return productos.find(p => p.id === id);
};

export const getProductosByCategoria = async (categoriaId: string): Promise<Producto[]> => {
  await simulateDelay(200);
  return productos.filter(p => p.categoriaId === categoriaId);
};

export const getProductosBySubcategoria = async (subcategoriaId: string): Promise<Producto[]> => {
  await simulateDelay(200);
  return productos.filter(p => p.subcategoriaId === subcategoriaId);
};

// ============ CATEGORIAS & SUBCATEGORIAS ============

export const getCategorias = async (tipo?: TipoProducto): Promise<Categoria[]> => {
  await simulateDelay(100);
  if (tipo) {
    return categorias.filter(c => c.tipo === tipo);
  }
  return categorias;
};

export const getSubcategorias = async (categoriaId?: string): Promise<Subcategoria[]> => {
  await simulateDelay(100);
  if (categoriaId) {
    return subcategorias.filter(s => s.categoriaId === categoriaId);
  }
  return subcategorias;
};

// ============ PRESENTACIONES ============

export const getPresentaciones = async (productoId?: string): Promise<Presentacion[]> => {
  await simulateDelay(100);
  if (productoId) {
    return presentaciones.filter(p => p.productoId === productoId);
  }
  return presentaciones;
};

// ============ PRECIOS PRODUCTOS AGRICOLAS ============

export interface GetPreciosParams {
  productoId?: string;
  mercadoId?: string;
  departamentoCodigo?: string;
  presentacionId?: string;
  fechaInicio?: string;
  fechaFin?: string;
  serie?: SerieOption;
  limit?: number;
}

export const getPrecios = async (params: GetPreciosParams = {}): Promise<PrecioObservacion[]> => {
  await simulateDelay(300);

  let filtered = [...precioObservaciones];

  if (params.productoId) {
    filtered = filtered.filter(p => p.productoId === params.productoId);
  }
  if (params.mercadoId) {
    filtered = filtered.filter(p => p.mercadoId === params.mercadoId);
  }
  if (params.departamentoCodigo) {
    const mercadosEnDpto = mercados.filter(m => m.departamentoCodigo === params.departamentoCodigo);
    const mercadoIds = mercadosEnDpto.map(m => m.id);
    filtered = filtered.filter(p => mercadoIds.includes(p.mercadoId));
  }
  if (params.presentacionId) {
    filtered = filtered.filter(p => p.presentacionId === params.presentacionId);
  }
  if (params.fechaInicio) {
    filtered = filtered.filter(p => p.fecha >= params.fechaInicio!);
  }
  if (params.fechaFin) {
    filtered = filtered.filter(p => p.fecha <= params.fechaFin!);
  }
  if (params.serie) {
    filtered = filtered.filter(p => p.serie === params.serie);
  }

  // Sort by date descending
  filtered.sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (params.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return filtered;
};

export const getLatestPrecio = async (
  productoId: string,
  mercadoId?: string
): Promise<PrecioObservacion | undefined> => {
  const precios = await getPrecios({
    productoId,
    mercadoId,
    limit: 1,
  });
  return precios[0];
};

export const getPrecioTimeSeries = async (
  productoId: string,
  dateRange: DateRangeOption,
  mercadoId?: string,
  serie: SerieOption = 'diario'
): Promise<PrecioObservacion[]> => {
  const today = new Date();
  let fechaInicio: string;

  switch (dateRange) {
    case '1d':
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case '1w':
      today.setDate(today.getDate() - 7);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case '1m':
      today.setMonth(today.getMonth() - 1);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case '3m':
      today.setMonth(today.getMonth() - 3);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case '6m':
      today.setMonth(today.getMonth() - 6);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case 'ytd':
      fechaInicio = `${today.getFullYear()}-01-01`;
      break;
    case '1y':
      today.setFullYear(today.getFullYear() - 1);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    case '2y':
      today.setFullYear(today.getFullYear() - 2);
      fechaInicio = today.toISOString().split('T')[0];
      break;
    default:
      fechaInicio = '2020-01-01';
  }

  return getPrecios({
    productoId,
    mercadoId,
    fechaInicio,
    serie,
  });
};

// ============ MERCADOS ============

export const getMercados = async (): Promise<Mercado[]> => {
  await simulateDelay(100);
  return mercados;
};

export const getMercadoById = async (id: string): Promise<Mercado | undefined> => {
  await simulateDelay(100);
  return mercados.find(m => m.id === id);
};

export const getMercadosByDepartamento = async (departamentoCodigo: string): Promise<Mercado[]> => {
  await simulateDelay(100);
  return mercados.filter(m => m.departamentoCodigo === departamentoCodigo);
};

export const getMercadosByMunicipio = async (municipioCodigo: string): Promise<Mercado[]> => {
  await simulateDelay(100);
  return mercados.filter(m => m.municipioCodigo === municipioCodigo);
};

// ============ GEOGRAFIA ============

export const getDepartamentos = async (): Promise<Departamento[]> => {
  await simulateDelay(100);
  return departamentos;
};

export const getMunicipios = async (departamentoCodigo?: string): Promise<Municipio[]> => {
  await simulateDelay(100);
  if (departamentoCodigo) {
    return municipios.filter(m => m.departamentoCodigo === departamentoCodigo);
  }
  return municipios;
};

// ============ INSUMOS AGRICOLAS ============

export const getInsumosAgricolas = async (): Promise<InsumoAgricola[]> => {
  await simulateDelay(200);
  return insumosAgricolas;
};

export const getInsumoById = async (id: string): Promise<InsumoAgricola | undefined> => {
  await simulateDelay(100);
  return insumosAgricolas.find(i => i.id === id);
};

export interface GetPreciosInsumosParams {
  insumoId?: string;
  municipioCodigo?: string;
  departamentoCodigo?: string;
  fechaInicio?: string;
  fechaFin?: string;
  limit?: number;
}

export const getPreciosInsumos = async (params: GetPreciosInsumosParams = {}): Promise<PrecioInsumo[]> => {
  await simulateDelay(300);

  let filtered = [...precioInsumos];

  if (params.insumoId) {
    filtered = filtered.filter(p => p.insumoId === params.insumoId);
  }
  if (params.municipioCodigo) {
    filtered = filtered.filter(p => p.municipioCodigo === params.municipioCodigo);
  }
  if (params.departamentoCodigo) {
    filtered = filtered.filter(p => p.departamentoCodigo === params.departamentoCodigo);
  }
  if (params.fechaInicio) {
    filtered = filtered.filter(p => p.fecha >= params.fechaInicio!);
  }
  if (params.fechaFin) {
    filtered = filtered.filter(p => p.fecha <= params.fechaFin!);
  }

  filtered.sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (params.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return filtered;
};

// ============ DISTRITOS DE RIEGO ============

export const getDistritosRiego = async (): Promise<DistritoRiego[]> => {
  await simulateDelay(200);
  return distritosRiego;
};

export const getDistritoRiegoById = async (id: string): Promise<DistritoRiego | undefined> => {
  await simulateDelay(100);
  return distritosRiego.find(d => d.id === id);
};

export const getPreciosDistritosRiego = async (distritoId?: string): Promise<PrecioDistritoRiego[]> => {
  await simulateDelay(200);
  if (distritoId) {
    return precioDistritosRiego.filter(p => p.distritoId === distritoId);
  }
  return precioDistritosRiego;
};

// ============ ABASTECIMIENTO ============

export const getAbastecimiento = async (mercadoId?: string): Promise<AbastecimientoGrupo[]> => {
  await simulateDelay(200);
  if (mercadoId) {
    return abastecimientoGrupos.filter(a => a.mercadoId === mercadoId);
  }
  return abastecimientoGrupos;
};

export const getVehiculosIngreso = async (mercadoId?: string): Promise<VehiculosIngreso[]> => {
  await simulateDelay(200);
  if (mercadoId) {
    return vehiculosIngreso.filter(v => v.mercadoId === mercadoId);
  }
  return vehiculosIngreso;
};

// ============ NOTICIAS ============

export const getNoticias = async (limit?: number): Promise<NoticiaAgricola[]> => {
  await simulateDelay(200);
  const sorted = [...noticiasAgricolas].sort((a, b) => b.fecha.localeCompare(a.fecha));
  if (limit) {
    return sorted.slice(0, limit);
  }
  return sorted;
};

// ============ SEARCH ============

export const search = async (query: string): Promise<SearchResult[]> => {
  await simulateDelay(200);

  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return [];
  }

  const results: SearchResult[] = [];

  // Search in categorias
  for (const cat of categorias) {
    if (cat.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: cat.id,
        tipo: 'categoria',
        nombre: cat.nombre,
        lineage: [cat.nombre],
        matchedPart: cat.nombre,
        tipoProducto: cat.tipo,
      });
    }
  }

  // Search in subcategorias
  for (const subcat of subcategorias) {
    if (subcat.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: subcat.id,
        tipo: 'subcategoria',
        nombre: subcat.nombre,
        lineage: [subcat.categoria, subcat.nombre],
        matchedPart: subcat.nombre,
        tipoProducto: 'producto_agricola',
      });
    }
  }

  // Search in productos
  for (const prod of productos) {
    if (prod.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: prod.id,
        tipo: 'producto',
        nombre: prod.nombre,
        lineage: [prod.categoria, prod.subcategoria, prod.nombre],
        matchedPart: prod.nombre,
        tipoProducto: prod.tipo,
      });
    }
  }

  // Search in mercados
  for (const mercado of mercados) {
    if (mercado.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: mercado.id,
        tipo: 'mercado',
        nombre: mercado.nombre,
        lineage: [mercado.departamento, mercado.municipio, mercado.nombre],
        matchedPart: mercado.nombre,
        tipoProducto: 'mercado_mayorista',
      });
    }
  }

  // Search in insumos
  for (const insumo of insumosAgricolas) {
    if (insumo.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: insumo.id,
        tipo: 'producto',
        nombre: insumo.nombre,
        lineage: [insumo.categoria, insumo.subcategoria, insumo.nombre],
        matchedPart: insumo.nombre,
        tipoProducto: 'insumo_agricola',
      });
    }
  }

  // Search in distritos de riego
  for (const distrito of distritosRiego) {
    if (distrito.nombre.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: distrito.id,
        tipo: 'producto',
        nombre: distrito.nombre,
        lineage: [distrito.departamento, distrito.municipio, distrito.nombre],
        matchedPart: distrito.nombre,
        tipoProducto: 'distrito_riego',
      });
    }
  }

  return results.slice(0, 20); // Limit results
};

// ============ WATCHLIST PRICES ============

export interface WatchlistPrice {
  id: string;
  productoId: string;
  producto: string;
  presentacion: string;
  mercado: string;
  municipio: string;
  fecha: string;
  precioMinimo: number;
  precioMaximo: number;
  variacionDiaria: number;
  tipo: TipoProducto;
}

export const getWatchlistPrices = async (): Promise<WatchlistPrice[]> => {
  await simulateDelay(300);

  // Get latest prices for a selection of popular products
  const popularProductos = ['limon-tahiti', 'papa-criolla', 'tomate-chonto', 'banano-uraba', 'cebolla-roja'];
  const watchlist: WatchlistPrice[] = [];

  for (const productoId of popularProductos) {
    const precios = precioObservaciones
      .filter(p => p.productoId === productoId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));

    if (precios.length > 0) {
      const latest = precios[0];
      const yesterday = precios.find(p => p.fecha !== latest.fecha && p.mercadoId === latest.mercadoId);

      const variacion = yesterday
        ? ((latest.precioPromedio - yesterday.precioPromedio) / yesterday.precioPromedio) * 100
        : 0;

      watchlist.push({
        id: latest.id,
        productoId: latest.productoId,
        producto: latest.producto,
        presentacion: latest.presentacion,
        mercado: latest.mercado,
        municipio: latest.municipio,
        fecha: latest.fecha,
        precioMinimo: latest.precioMinimo,
        precioMaximo: latest.precioMaximo,
        variacionDiaria: parseFloat(variacion.toFixed(2)),
        tipo: 'producto_agricola',
      });
    }
  }

  return watchlist;
};

// ============ STATISTICS ============

export interface PriceStatistics {
  promedio: number;
  minimo: number;
  maximo: number;
  variacion: number;
  volatilidad: number;
  mediana: number;
  percentil25: number;
  percentil75: number;
}

export const calculatePriceStatistics = (precios: PrecioObservacion[]): PriceStatistics => {
  if (precios.length === 0) {
    return {
      promedio: 0,
      minimo: 0,
      maximo: 0,
      variacion: 0,
      volatilidad: 0,
      mediana: 0,
      percentil25: 0,
      percentil75: 0,
    };
  }

  const valores = precios.map(p => p.precioPromedio).sort((a, b) => a - b);
  const n = valores.length;

  const suma = valores.reduce((acc, v) => acc + v, 0);
  const promedio = suma / n;

  const minimo = valores[0];
  const maximo = valores[n - 1];

  // Calculate variation from first to last
  const primero = precios[precios.length - 1]?.precioPromedio || 0;
  const ultimo = precios[0]?.precioPromedio || 0;
  const variacion = primero > 0 ? ((ultimo - primero) / primero) * 100 : 0;

  // Calculate volatility (standard deviation)
  const varianza = valores.reduce((acc, v) => acc + Math.pow(v - promedio, 2), 0) / n;
  const volatilidad = Math.sqrt(varianza);

  // Calculate percentiles
  const mediana = valores[Math.floor(n / 2)];
  const percentil25 = valores[Math.floor(n * 0.25)];
  const percentil75 = valores[Math.floor(n * 0.75)];

  return {
    promedio: Math.round(promedio),
    minimo,
    maximo,
    variacion: parseFloat(variacion.toFixed(2)),
    volatilidad: Math.round(volatilidad),
    mediana,
    percentil25,
    percentil75,
  };
};

// Export all functions as a default API object
const api = {
  // Productos
  getProductos,
  getProductoById,
  getProductosByCategoria,
  getProductosBySubcategoria,
  getCategorias,
  getSubcategorias,
  getPresentaciones,

  // Precios
  getPrecios,
  getLatestPrecio,
  getPrecioTimeSeries,
  calculatePriceStatistics,

  // Mercados
  getMercados,
  getMercadoById,
  getMercadosByDepartamento,
  getMercadosByMunicipio,

  // Geografia
  getDepartamentos,
  getMunicipios,

  // Insumos
  getInsumosAgricolas,
  getInsumoById,
  getPreciosInsumos,

  // Distritos de Riego
  getDistritosRiego,
  getDistritoRiegoById,
  getPreciosDistritosRiego,

  // Abastecimiento
  getAbastecimiento,
  getVehiculosIngreso,

  // Noticias
  getNoticias,

  // Search
  search,

  // Watchlist
  getWatchlistPrices,
};

export default api;
