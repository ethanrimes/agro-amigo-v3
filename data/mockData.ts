/**
 * Agro Amigo Mock Data
 * Comprehensive sample data for Colombian agricultural prices
 */

import {
  Categoria,
  Subcategoria,
  Producto,
  Presentacion,
  Departamento,
  Municipio,
  Mercado,
  PrecioObservacion,
  InsumoAgricola,
  PrecioInsumo,
  DistritoRiego,
  PrecioDistritoRiego,
  Abastecimiento,
  VehiculosIngreso,
  NewsItem,
  UserSettings,
  WatchlistItem,
} from '@/types';

// Departamentos
export const departamentos: Departamento[] = [
  { codigo: '05', nombre: 'Antioquia' },
  { codigo: '08', nombre: 'Atlántico' },
  { codigo: '11', nombre: 'Bogotá, D.C.' },
  { codigo: '13', nombre: 'Bolívar' },
  { codigo: '15', nombre: 'Boyacá' },
  { codigo: '17', nombre: 'Caldas' },
  { codigo: '19', nombre: 'Cauca' },
  { codigo: '20', nombre: 'Cesar' },
  { codigo: '23', nombre: 'Córdoba' },
  { codigo: '25', nombre: 'Cundinamarca' },
  { codigo: '41', nombre: 'Huila' },
  { codigo: '47', nombre: 'Magdalena' },
  { codigo: '54', nombre: 'Norte de Santander' },
  { codigo: '63', nombre: 'Quindío' },
  { codigo: '66', nombre: 'Risaralda' },
  { codigo: '68', nombre: 'Santander' },
  { codigo: '73', nombre: 'Tolima' },
  { codigo: '76', nombre: 'Valle del Cauca' },
  { codigo: '85', nombre: 'Casanare' },
];

// Municipios
export const municipios: Municipio[] = [
  { codigo: '05001', nombre: 'Medellín', departamentoCodigo: '05' },
  { codigo: '08001', nombre: 'Barranquilla', departamentoCodigo: '08' },
  { codigo: '11001', nombre: 'Bogotá, D.C.', departamentoCodigo: '11' },
  { codigo: '13001', nombre: 'Cartagena', departamentoCodigo: '13' },
  { codigo: '15001', nombre: 'Tunja', departamentoCodigo: '15' },
  { codigo: '17001', nombre: 'Manizales', departamentoCodigo: '17' },
  { codigo: '19001', nombre: 'Popayán', departamentoCodigo: '19' },
  { codigo: '20001', nombre: 'Valledupar', departamentoCodigo: '20' },
  { codigo: '23001', nombre: 'Montería', departamentoCodigo: '23' },
  { codigo: '25290', nombre: 'Fusagasugá', departamentoCodigo: '25' },
  { codigo: '41001', nombre: 'Neiva', departamentoCodigo: '41' },
  { codigo: '47001', nombre: 'Santa Marta', departamentoCodigo: '47' },
  { codigo: '54001', nombre: 'Cúcuta', departamentoCodigo: '54' },
  { codigo: '63001', nombre: 'Armenia', departamentoCodigo: '63' },
  { codigo: '66001', nombre: 'Pereira', departamentoCodigo: '66' },
  { codigo: '68001', nombre: 'Bucaramanga', departamentoCodigo: '68' },
  { codigo: '73001', nombre: 'Ibagué', departamentoCodigo: '73' },
  { codigo: '76001', nombre: 'Cali', departamentoCodigo: '76' },
];

// Mercados
export const mercados: Mercado[] = [
  { id: 'barranquillita', nombre: 'Barranquillita', municipioCodigo: '08001', ciudad: 'Barranquilla' },
  { id: 'granabastos', nombre: 'Granabastos', municipioCodigo: '08001', ciudad: 'Barranquilla' },
  { id: 'corabastos', nombre: 'Corabastos', municipioCodigo: '11001', ciudad: 'Bogotá, D.C.' },
  { id: 'paloquemao', nombre: 'Paloquemao', municipioCodigo: '11001', ciudad: 'Bogotá, D.C.' },
  { id: 'plaza-las-flores', nombre: 'Plaza Las Flores', municipioCodigo: '11001', ciudad: 'Bogotá, D.C.' },
  { id: 'plaza-samper-mendoza', nombre: 'Plaza Samper Mendoza', municipioCodigo: '11001', ciudad: 'Bogotá, D.C.' },
  { id: 'central-mayorista-antioquia', nombre: 'Central Mayorista de Antioquia', municipioCodigo: '05001', ciudad: 'Medellín' },
  { id: 'plaza-minorista', nombre: 'Plaza Minorista José María Villa', municipioCodigo: '05001', ciudad: 'Medellín' },
  { id: 'mercar', nombre: 'Mercar', municipioCodigo: '63001', ciudad: 'Armenia' },
  { id: 'cavasa', nombre: 'Cavasa', municipioCodigo: '76001', ciudad: 'Cali' },
  { id: 'santa-elena', nombre: 'Santa Elena', municipioCodigo: '76001', ciudad: 'Cali' },
  { id: 'bazurto', nombre: 'Bazurto', municipioCodigo: '13001', ciudad: 'Cartagena' },
  { id: 'centroabastos', nombre: 'Centroabastos', municipioCodigo: '68001', ciudad: 'Bucaramanga' },
  { id: 'cenabastos', nombre: 'Cenabastos', municipioCodigo: '54001', ciudad: 'Cúcuta' },
  { id: 'surabastos', nombre: 'Surabastos', municipioCodigo: '41001', ciudad: 'Neiva' },
  { id: 'centro-galerias', nombre: 'Centro Galerías', municipioCodigo: '17001', ciudad: 'Manizales' },
  { id: 'mercado-sur', nombre: 'Mercado del Sur', municipioCodigo: '23001', ciudad: 'Montería' },
];

// Categorias - Producto Agrícola
export const categorias: Categoria[] = [
  { id: 'frutas', nombre: 'Frutas', tipo: 'producto_agricola' },
  { id: 'tuberculos', nombre: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  { id: 'verduras', nombre: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'pescados', nombre: 'Pescados frescos y congelados', tipo: 'producto_agricola' },
  { id: 'otros', nombre: 'Otros grupos', tipo: 'producto_agricola' },
  // Insumos Agrícolas
  { id: 'bioinsumos', nombre: 'Bioinsumos', tipo: 'insumo_agricola' },
  { id: 'coadyuvantes', nombre: 'Coadyuvantes, molusquicidas, reguladores fisiológicos y otros', tipo: 'insumo_agricola' },
  { id: 'fertilizantes', nombre: 'Fertilizantes, enmiendas y acondicionadores de suelo', tipo: 'insumo_agricola' },
  { id: 'fungicidas', nombre: 'Fungicidas', tipo: 'insumo_agricola' },
  { id: 'herbicidas', nombre: 'Herbicidas', tipo: 'insumo_agricola' },
  { id: 'insecticidas', nombre: 'Insecticidas, acaricidas y nematicidas', tipo: 'insumo_agricola' },
  // Distritos de Riego
  { id: 'distritos-riego', nombre: 'Distritos de riego', tipo: 'distrito_riego' },
  // Material de propagación
  { id: 'material-propagacion', nombre: 'Material de propagación', tipo: 'insumo_agricola' },
];

// Subcategorias
export const subcategorias: Subcategoria[] = [
  // Frutas
  { id: 'citricos', nombre: 'Cítricos', categoriaId: 'frutas' },
  { id: 'otras-frutas', nombre: 'Otras frutas', categoriaId: 'frutas' },
  // Tubérculos
  { id: 'platano', nombre: 'Plátano', categoriaId: 'tuberculos' },
  { id: 'papa', nombre: 'Papa', categoriaId: 'tuberculos' },
  { id: 'yuca', nombre: 'Yuca', categoriaId: 'tuberculos' },
  // Verduras
  { id: 'leguminosas', nombre: 'Leguminosas', categoriaId: 'verduras' },
  { id: 'otras-hortalizas', nombre: 'Otras hortalizas y verduras', categoriaId: 'verduras' },
  { id: 'cebollas', nombre: 'Cebollas', categoriaId: 'verduras' },
  { id: 'tomates', nombre: 'Tomates', categoriaId: 'verduras' },
  { id: 'hortalizas', nombre: 'Hortalizas', categoriaId: 'verduras' },
];

// Productos
export const productos: Producto[] = [
  // Cítricos
  { id: 'limon-tahiti', nombre: 'Limón tahití', subcategoriaId: 'citricos', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'mandarina-comun', nombre: 'Mandarina común', subcategoriaId: 'citricos', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'naranja-valencia', nombre: 'Naranja valencia', subcategoriaId: 'citricos', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'naranja-comun', nombre: 'Naranja común', subcategoriaId: 'citricos', categoriaId: 'frutas', tipo: 'producto_agricola' },
  // Otras frutas
  { id: 'banano-uraba', nombre: 'Banano urabá', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'banano-criollo', nombre: 'Banano criollo', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'coco', nombre: 'Coco', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-atlantico', nombre: 'Guayaba atlántico', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-comun', nombre: 'Guayaba común', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-pera', nombre: 'Guayaba pera', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'lulo', nombre: 'Lulo', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'mango-tommy', nombre: 'Mango tommy', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'mango-azucar', nombre: 'Mango de azúcar', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'maracuya-antioqueno', nombre: 'Maracuyá antioqueño', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'mora-castilla', nombre: 'Mora de castilla', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'papaya-tainung', nombre: 'Papaya tainung', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'pina-perolera', nombre: 'Piña perolera', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  { id: 'tomate-arbol', nombre: 'Tomate de árbol', subcategoriaId: 'otras-frutas', categoriaId: 'frutas', tipo: 'producto_agricola' },
  // Tubérculos
  { id: 'platano-harton', nombre: 'Plátano hartón verde', subcategoriaId: 'platano', categoriaId: 'tuberculos', tipo: 'producto_agricola' },
  { id: 'papa-criolla', nombre: 'Papa criolla limpia', subcategoriaId: 'papa', categoriaId: 'tuberculos', tipo: 'producto_agricola' },
  { id: 'papa-unica', nombre: 'Papa única', subcategoriaId: 'papa', categoriaId: 'tuberculos', tipo: 'producto_agricola' },
  { id: 'yuca-criolla', nombre: 'Yuca criolla', subcategoriaId: 'yuca', categoriaId: 'tuberculos', tipo: 'producto_agricola' },
  // Verduras
  { id: 'arveja-verde', nombre: 'Arveja verde en vaina', subcategoriaId: 'leguminosas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'frijol-verde', nombre: 'Frijol verde en vaina', subcategoriaId: 'leguminosas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'habichuela', nombre: 'Habichuela', subcategoriaId: 'leguminosas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'ajo-importado', nombre: 'Ajo importado', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'berenjena', nombre: 'Berenjena', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'pepino-cohombro', nombre: 'Pepino cohombro', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'pimenton', nombre: 'Pimentón', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'remolacha', nombre: 'Remolacha', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'zanahoria', nombre: 'Zanahoria', subcategoriaId: 'otras-hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'cebolla-blanca', nombre: 'Cebolla cabezona blanca', subcategoriaId: 'cebollas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'cebolla-roja', nombre: 'Cebolla cabezona roja', subcategoriaId: 'cebollas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'tomate-riogrande', nombre: 'Tomate riogrande bumangués', subcategoriaId: 'tomates', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'tomate-chonto', nombre: 'Tomate chonto', subcategoriaId: 'tomates', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'cilantro', nombre: 'Cilantro', subcategoriaId: 'hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'lechuga-batavia', nombre: 'Lechuga batavia', subcategoriaId: 'hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'brocoli', nombre: 'Brócoli', subcategoriaId: 'hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
  { id: 'espinaca', nombre: 'Espinaca', subcategoriaId: 'hortalizas', categoriaId: 'verduras', tipo: 'producto_agricola' },
];

// Presentaciones
export const presentaciones: Presentacion[] = [
  { id: 'limon-tahiti-bulto', nombre: 'Bulto 24 Kilogramo', unidad: 'Kilogramo', cantidad: 24, productoId: 'limon-tahiti' },
  { id: 'mandarina-caja', nombre: 'Caja de cartón 24 Kilogramo', unidad: 'Kilogramo', cantidad: 24, productoId: 'mandarina-comun' },
  { id: 'naranja-valencia-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'naranja-valencia' },
  { id: 'naranja-comun-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'naranja-comun' },
  { id: 'banano-uraba-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'banano-uraba' },
  { id: 'banano-criollo-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'banano-criollo' },
  { id: 'coco-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'coco' },
  { id: 'guayaba-atlantico-canastilla', nombre: 'Canastilla 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'guayaba-atlantico' },
  { id: 'guayaba-comun-canastilla', nombre: 'Canastilla 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'guayaba-comun' },
  { id: 'guayaba-pera-caja', nombre: 'Caja de madera 10 Kilogramo', unidad: 'Kilogramo', cantidad: 10, productoId: 'guayaba-pera' },
  { id: 'lulo-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'lulo' },
  { id: 'mango-tommy-canastilla', nombre: 'Canastilla 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'mango-tommy' },
  { id: 'mango-azucar-canastilla', nombre: 'Canastilla 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'mango-azucar' },
  { id: 'maracuya-bolsa', nombre: 'Bolsa 10 Kilogramo', unidad: 'Kilogramo', cantidad: 10, productoId: 'maracuya-antioqueno' },
  { id: 'mora-caja-pequena', nombre: 'Caja de cartón 2.5 Kilogramo', unidad: 'Kilogramo', cantidad: 2.5, productoId: 'mora-castilla' },
  { id: 'mora-caja-grande', nombre: 'Caja de cartón 12.5 Kilogramo', unidad: 'Kilogramo', cantidad: 12.5, productoId: 'mora-castilla' },
  { id: 'papaya-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'papaya-tainung' },
  { id: 'pina-caja', nombre: 'Caja de madera 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'pina-perolera' },
  { id: 'tomate-arbol-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'tomate-arbol' },
  { id: 'platano-harton-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'platano-harton' },
  { id: 'papa-criolla-bulto', nombre: 'Bulto 50 Kilogramo', unidad: 'Kilogramo', cantidad: 50, productoId: 'papa-criolla' },
  { id: 'papa-unica-bulto', nombre: 'Bulto 50 Kilogramo', unidad: 'Kilogramo', cantidad: 50, productoId: 'papa-unica' },
  { id: 'yuca-bolsa', nombre: 'Bolsa 40 Kilogramo', unidad: 'Kilogramo', cantidad: 40, productoId: 'yuca-criolla' },
  { id: 'arveja-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'arveja-verde' },
  { id: 'frijol-verde-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'frijol-verde' },
  { id: 'habichuela-saco', nombre: 'Saco 20 Kilogramo', unidad: 'Kilogramo', cantidad: 20, productoId: 'habichuela' },
  { id: 'ajo-caja', nombre: 'Caja de cartón 10 Kilogramo', unidad: 'Kilogramo', cantidad: 10, productoId: 'ajo-importado' },
  { id: 'berenjena-bolsa', nombre: 'Bolsa 10 Kilogramo', unidad: 'Kilogramo', cantidad: 10, productoId: 'berenjena' },
  { id: 'pepino-bulto', nombre: 'Bulto 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'pepino-cohombro' },
  { id: 'pimenton-caja', nombre: 'Caja de cartón 12 Kilogramo', unidad: 'Kilogramo', cantidad: 12, productoId: 'pimenton' },
  { id: 'remolacha-bulto', nombre: 'Bulto 60 Kilogramo', unidad: 'Kilogramo', cantidad: 60, productoId: 'remolacha' },
  { id: 'zanahoria-bulto', nombre: 'Bulto 60 Kilogramo', unidad: 'Kilogramo', cantidad: 60, productoId: 'zanahoria' },
  { id: 'cebolla-blanca-bulto', nombre: 'Bulto 50 Kilogramo', unidad: 'Kilogramo', cantidad: 50, productoId: 'cebolla-blanca' },
  { id: 'cebolla-roja-bulto', nombre: 'Bulto 45 Kilogramo', unidad: 'Kilogramo', cantidad: 45, productoId: 'cebolla-roja' },
  { id: 'tomate-riogrande-caja', nombre: 'Caja de cartón 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'tomate-riogrande' },
  { id: 'tomate-chonto-caja', nombre: 'Caja de cartón 25 Kilogramo', unidad: 'Kilogramo', cantidad: 25, productoId: 'tomate-chonto' },
  { id: 'cilantro-atado', nombre: 'Atado 1 Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'cilantro' },
  { id: 'lechuga-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'lechuga-batavia' },
  { id: 'brocoli-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'brocoli' },
  { id: 'espinaca-kg', nombre: 'Kilogramo', unidad: 'Kilogramo', cantidad: 1, productoId: 'espinaca' },
];

// Helper to generate dates for the last N days
const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Helper to generate random price with variance
const generatePrice = (base: number, variance: number): number => {
  return Math.round(base + (Math.random() - 0.5) * 2 * variance);
};

// Generate price observations for all products
export const generatePrecioObservaciones = (): PrecioObservacion[] => {
  const observaciones: PrecioObservacion[] = [];
  const dates = generateDates(90); // Last 90 days

  const priceBaselines: { [key: string]: number } = {
    'limon-tahiti': 40500,
    'mandarina-comun': 59000,
    'naranja-valencia': 2200,
    'naranja-comun': 1200,
    'banano-uraba': 1800,
    'banano-criollo': 1680,
    'coco': 5850,
    'guayaba-atlantico': 49000,
    'guayaba-comun': 58500,
    'guayaba-pera': 36500,
    'lulo': 6550,
    'mango-tommy': 77500,
    'mango-azucar': 179000,
    'maracuya-antioqueno': 49500,
    'mora-castilla': 15500,
    'papaya-tainung': 2350,
    'pina-perolera': 80500,
    'tomate-arbol': 2450,
    'platano-harton': 2400,
    'papa-criolla': 219500,
    'papa-unica': 55500,
    'yuca-criolla': 77500,
    'arveja-verde': 7050,
    'frijol-verde': 7950,
    'habichuela': 63500,
    'ajo-importado': 72500,
    'berenjena': 23500,
    'pepino-cohombro': 39500,
    'pimenton': 39000,
    'remolacha': 89000,
    'zanahoria': 119500,
    'cebolla-blanca': 98000,
    'cebolla-roja': 115500,
    'tomate-riogrande': 39500,
    'tomate-chonto': 35500,
    'cilantro': 4950,
    'lechuga-batavia': 2250,
    'brocoli': 6150,
    'espinaca': 6050,
  };

  const presentacionMap: { [key: string]: string } = {
    'limon-tahiti': 'limon-tahiti-bulto',
    'mandarina-comun': 'mandarina-caja',
    'naranja-valencia': 'naranja-valencia-kg',
    'naranja-comun': 'naranja-comun-kg',
    'banano-uraba': 'banano-uraba-kg',
    'banano-criollo': 'banano-criollo-kg',
    'coco': 'coco-kg',
    'guayaba-atlantico': 'guayaba-atlantico-canastilla',
    'guayaba-comun': 'guayaba-comun-canastilla',
    'guayaba-pera': 'guayaba-pera-caja',
    'lulo': 'lulo-kg',
    'mango-tommy': 'mango-tommy-canastilla',
    'mango-azucar': 'mango-azucar-canastilla',
    'maracuya-antioqueno': 'maracuya-bolsa',
    'mora-castilla': 'mora-caja-pequena',
    'papaya-tainung': 'papaya-kg',
    'pina-perolera': 'pina-caja',
    'tomate-arbol': 'tomate-arbol-kg',
    'platano-harton': 'platano-harton-kg',
    'papa-criolla': 'papa-criolla-bulto',
    'papa-unica': 'papa-unica-bulto',
    'yuca-criolla': 'yuca-bolsa',
    'arveja-verde': 'arveja-kg',
    'frijol-verde': 'frijol-verde-kg',
    'habichuela': 'habichuela-saco',
    'ajo-importado': 'ajo-caja',
    'berenjena': 'berenjena-bolsa',
    'pepino-cohombro': 'pepino-bulto',
    'pimenton': 'pimenton-caja',
    'remolacha': 'remolacha-bulto',
    'zanahoria': 'zanahoria-bulto',
    'cebolla-blanca': 'cebolla-blanca-bulto',
    'cebolla-roja': 'cebolla-roja-bulto',
    'tomate-riogrande': 'tomate-riogrande-caja',
    'tomate-chonto': 'tomate-chonto-caja',
    'cilantro': 'cilantro-atado',
    'lechuga-batavia': 'lechuga-kg',
    'brocoli': 'brocoli-kg',
    'espinaca': 'espinaca-kg',
  };

  let id = 0;
  productos.forEach((producto) => {
    if (producto.tipo !== 'producto_agricola') return;

    const basePrice = priceBaselines[producto.id] || 10000;
    const presentacionId = presentacionMap[producto.id];
    if (!presentacionId) return;

    // Generate for multiple markets
    mercados.slice(0, 8).forEach((mercado) => {
      // Add some market-specific variance
      const marketVariance = (Math.random() - 0.5) * 0.2;

      dates.forEach((fecha) => {
        const variance = basePrice * 0.05;
        const marketAdjustedBase = basePrice * (1 + marketVariance);
        const precioMinimo = generatePrice(marketAdjustedBase, variance);
        const precioMaximo = precioMinimo + generatePrice(variance * 0.5, variance * 0.25);

        observaciones.push({
          id: `obs-${id++}`,
          productoId: producto.id,
          presentacionId,
          mercadoId: mercado.id,
          fecha,
          precioMinimo,
          precioMaximo,
          precioPromedio: (precioMinimo + precioMaximo) / 2,
          seriesTemporal: 'diario',
        });
      });
    });
  });

  return observaciones;
};

// Pre-generate observations
export const precioObservaciones: PrecioObservacion[] = generatePrecioObservaciones();

// Insumos Agrícolas
export const insumosAgricolas: InsumoAgricola[] = [
  { id: 'alisin', codigoCPC: '3466106', nombre: 'Alisin', categoriaInsumo: 'Bioinsumos' },
  { id: 'boveotropico', codigoCPC: '3466105', nombre: 'Bovetrópico Wp', categoriaInsumo: 'Bioinsumos' },
  { id: 'capsialil', codigoCPC: '3466106', nombre: 'CapsiAlil Ec', categoriaInsumo: 'Bioinsumos' },
  { id: 'bassar', codigoCPC: '3466105', nombre: 'Bassar Wp', categoriaInsumo: 'Bioinsumos' },
  { id: 'glifosato', codigoCPC: '3466201', nombre: 'Glifosato', categoriaInsumo: 'Herbicidas' },
  { id: 'urea', codigoCPC: '3461100', nombre: 'Urea', categoriaInsumo: 'Fertilizantes' },
  { id: 'triple-15', codigoCPC: '3461200', nombre: 'Triple 15', categoriaInsumo: 'Fertilizantes' },
  { id: 'dap', codigoCPC: '3461300', nombre: 'DAP', categoriaInsumo: 'Fertilizantes' },
];

// Precio Insumos
export const precioInsumos: PrecioInsumo[] = [
  { id: 'pi-1', insumoId: 'alisin', municipioCodigo: '05001', presentacion: '1 litro', precioPromedioAnterior: 64149, precioPromedioActual: 64156.67, variacionPorcentual: 0.01, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-2', insumoId: 'alisin', municipioCodigo: '11001', presentacion: '1 litro', precioPromedioAnterior: 65912.5, precioPromedioActual: 66325, variacionPorcentual: 0.63, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-3', insumoId: 'alisin', municipioCodigo: '15001', presentacion: '1 litro', precioPromedioAnterior: 66500, precioPromedioActual: 65833.33, variacionPorcentual: -1.0, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-4', insumoId: 'boveotropico', municipioCodigo: '05001', presentacion: '1 kilogramo', precioPromedioAnterior: 73735.5, precioPromedioActual: 73523, variacionPorcentual: -0.29, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-5', insumoId: 'capsialil', municipioCodigo: '05001', presentacion: '1 litro', precioPromedioAnterior: 214500, precioPromedioActual: 214500, variacionPorcentual: 0, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-6', insumoId: 'urea', municipioCodigo: '05001', presentacion: '50 kilogramos', precioPromedioAnterior: 95000, precioPromedioActual: 97500, variacionPorcentual: 2.63, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
  { id: 'pi-7', insumoId: 'triple-15', municipioCodigo: '11001', presentacion: '50 kilogramos', precioPromedioAnterior: 125000, precioPromedioActual: 127500, variacionPorcentual: 2.0, mesAnterior: 'septiembre 2025', mesActual: 'octubre 2025' },
];

// Distritos de Riego
export const distritosRiego: DistritoRiego[] = [
  { id: 'el-altillo', nombre: 'El Altillo', municipioCodigo: '19001', tipoPago: 'Hectárea/Anual' },
  { id: 'el-saladito', nombre: 'El Saladito', municipioCodigo: '19001', tipoPago: 'Hectárea/Anual' },
  { id: 'los-cedros', nombre: 'Los Cedros', municipioCodigo: '19548', tipoPago: 'Hectárea/Anual' },
  { id: 'villa-nueva', nombre: 'Villa Nueva', municipioCodigo: '19548', tipoPago: 'Hectárea/Anual' },
  { id: 'mocari', nombre: 'Mocarí', municipioCodigo: '23001', tipoPago: 'Hectárea/Anual' },
  { id: 'la-doctrina', nombre: 'La Doctrina', municipioCodigo: '23417', tipoPago: 'Hectárea/Anual' },
  { id: 'asodistricharte', nombre: 'Asodistricharte', municipioCodigo: '85010', tipoPago: 'Hectárea/Anual' },
  { id: 'uso-chicamocha', nombre: 'Uso Chicamocha', municipioCodigo: '15238', tipoPago: 'Hectárea/Bimestral' },
  { id: 'caravi', nombre: 'Caravi', municipioCodigo: '66045', tipoPago: 'Hectárea/Mensual' },
  { id: 'asojuncal', nombre: 'Asojuncal', municipioCodigo: '41524', tipoPago: 'Hectárea/Semestral' },
];

// Precios Distritos de Riego
export const preciosDistritosRiego: PrecioDistritoRiego[] = [
  { id: 'pdr-1', distritoId: 'el-altillo', precioAnterior: 103000, precioActual: 108000, variacionPorcentual: 4.85, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-2', distritoId: 'el-saladito', precioAnterior: 94000, precioActual: 98000, variacionPorcentual: 4.26, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-3', distritoId: 'los-cedros', precioAnterior: 80000, precioActual: 83000, variacionPorcentual: 3.75, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-4', distritoId: 'villa-nueva', precioAnterior: 83000, precioActual: 86000, variacionPorcentual: 3.61, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-5', distritoId: 'mocari', precioAnterior: 252771, precioActual: 252771, variacionPorcentual: 0, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-6', distritoId: 'la-doctrina', precioAnterior: 187449, precioActual: 187449, variacionPorcentual: 0, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-7', distritoId: 'asodistricharte', precioAnterior: 19000, precioActual: 19000, variacionPorcentual: 0, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-8', distritoId: 'uso-chicamocha', precioAnterior: 31694, precioActual: 31639, variacionPorcentual: -0.17, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-9', distritoId: 'caravi', precioAnterior: 15000, precioActual: 22000, variacionPorcentual: 46.67, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
  { id: 'pdr-10', distritoId: 'asojuncal', precioAnterior: 65063, precioActual: 63063, variacionPorcentual: -3.07, periodoAnterior: 'abril 2025', periodoActual: 'octubre 2025' },
];

// Abastecimiento
export const abastecimientoData: Abastecimiento[] = [
  // Total 32 mercados
  { mercadoId: 'total', mes: 'octubre 2025', grupoAlimento: 'Frutas', cantidadToneladas: 149233, participacionPorcentual: 22.16 },
  { mercadoId: 'total', mes: 'octubre 2025', grupoAlimento: 'Tubérculos, raíces y plátanos', cantidadToneladas: 182828, participacionPorcentual: 27.14 },
  { mercadoId: 'total', mes: 'octubre 2025', grupoAlimento: 'Verduras y hortalizas', cantidadToneladas: 187515, participacionPorcentual: 27.84 },
  { mercadoId: 'total', mes: 'octubre 2025', grupoAlimento: 'Otros grupos', cantidadToneladas: 153950, participacionPorcentual: 22.86 },
  // Mercar Armenia
  { mercadoId: 'mercar', mes: 'octubre 2025', grupoAlimento: 'Frutas', cantidadToneladas: 2567, participacionPorcentual: 24.24 },
  { mercadoId: 'mercar', mes: 'octubre 2025', grupoAlimento: 'Tubérculos, raíces y plátanos', cantidadToneladas: 2887, participacionPorcentual: 27.26 },
  { mercadoId: 'mercar', mes: 'octubre 2025', grupoAlimento: 'Verduras y hortalizas', cantidadToneladas: 3669, participacionPorcentual: 34.64 },
  { mercadoId: 'mercar', mes: 'octubre 2025', grupoAlimento: 'Otros grupos', cantidadToneladas: 1467, participacionPorcentual: 13.86 },
  // Barranquillita
  { mercadoId: 'barranquillita', mes: 'octubre 2025', grupoAlimento: 'Frutas', cantidadToneladas: 6892, participacionPorcentual: 16.55 },
  { mercadoId: 'barranquillita', mes: 'octubre 2025', grupoAlimento: 'Tubérculos, raíces y plátanos', cantidadToneladas: 10335, participacionPorcentual: 24.81 },
  { mercadoId: 'barranquillita', mes: 'octubre 2025', grupoAlimento: 'Verduras y hortalizas', cantidadToneladas: 7865, participacionPorcentual: 18.89 },
  { mercadoId: 'barranquillita', mes: 'octubre 2025', grupoAlimento: 'Otros grupos', cantidadToneladas: 16555, participacionPorcentual: 39.75 },
  // Corabastos
  { mercadoId: 'corabastos', mes: 'octubre 2025', grupoAlimento: 'Frutas', cantidadToneladas: 35000, participacionPorcentual: 23.50 },
  { mercadoId: 'corabastos', mes: 'octubre 2025', grupoAlimento: 'Tubérculos, raíces y plátanos', cantidadToneladas: 42000, participacionPorcentual: 28.20 },
  { mercadoId: 'corabastos', mes: 'octubre 2025', grupoAlimento: 'Verduras y hortalizas', cantidadToneladas: 40000, participacionPorcentual: 26.85 },
  { mercadoId: 'corabastos', mes: 'octubre 2025', grupoAlimento: 'Otros grupos', cantidadToneladas: 32000, participacionPorcentual: 21.45 },
];

// Vehiculos Ingreso
export const vehiculosIngresoData: VehiculosIngreso[] = [
  { mercadoId: 'mercar', mes: 'octubre 2025', vehiculosLivianos: 1592, vehiculosPesados: 1045, total: 2637 },
  { mercadoId: 'barranquillita', mes: 'octubre 2025', vehiculosLivianos: 9, vehiculosPesados: 3685, total: 3694 },
  { mercadoId: 'granabastos', mes: 'octubre 2025', vehiculosLivianos: 5, vehiculosPesados: 700, total: 705 },
  { mercadoId: 'corabastos', mes: 'octubre 2025', vehiculosLivianos: 2595, vehiculosPesados: 29515, total: 32110 },
  { mercadoId: 'paloquemao', mes: 'octubre 2025', vehiculosLivianos: 636, vehiculosPesados: 1129, total: 1765 },
  { mercadoId: 'plaza-las-flores', mes: 'octubre 2025', vehiculosLivianos: 423, vehiculosPesados: 1785, total: 2208 },
  { mercadoId: 'plaza-samper-mendoza', mes: 'octubre 2025', vehiculosLivianos: 146, vehiculosPesados: 481, total: 627 },
  { mercadoId: 'centroabastos', mes: 'octubre 2025', vehiculosLivianos: 1815, vehiculosPesados: 8061, total: 9876 },
  { mercadoId: 'cavasa', mes: 'octubre 2025', vehiculosLivianos: 760, vehiculosPesados: 4251, total: 5011 },
  { mercadoId: 'santa-elena', mes: 'octubre 2025', vehiculosLivianos: 231, vehiculosPesados: 3639, total: 3870 },
  { mercadoId: 'bazurto', mes: 'octubre 2025', vehiculosLivianos: 46, vehiculosPesados: 2870, total: 2916 },
  { mercadoId: 'cenabastos', mes: 'octubre 2025', vehiculosLivianos: 371, vehiculosPesados: 3328, total: 3699 },
  { mercadoId: 'surabastos', mes: 'octubre 2025', vehiculosLivianos: 767, vehiculosPesados: 1669, total: 2436 },
  { mercadoId: 'centro-galerias', mes: 'octubre 2025', vehiculosLivianos: 1101, vehiculosPesados: 1712, total: 2813 },
  { mercadoId: 'central-mayorista-antioquia', mes: 'octubre 2025', vehiculosLivianos: 200, vehiculosPesados: 10681, total: 10881 },
  { mercadoId: 'plaza-minorista', mes: 'octubre 2025', vehiculosLivianos: 445, vehiculosPesados: 3119, total: 3564 },
  { mercadoId: 'mercado-sur', mes: 'octubre 2025', vehiculosLivianos: 924, vehiculosPesados: 863, total: 1787 },
];

// News Items
export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    titulo: 'Precios del limón tahití alcanzan máximos históricos en mercados mayoristas',
    fuente: 'DANE - SIPSA',
    fecha: '2025-11-21',
    url: 'https://www.dane.gov.co/sipsa',
  },
  {
    id: 'news-2',
    titulo: 'Incremento en la oferta de frutas tropicales reduce precios en Corabastos',
    fuente: 'El Tiempo',
    fecha: '2025-11-20',
    url: 'https://www.eltiempo.com',
  },
  {
    id: 'news-3',
    titulo: 'Productores de papa reportan cosecha récord en Boyacá',
    fuente: 'Ministerio de Agricultura',
    fecha: '2025-11-19',
    url: 'https://www.minagricultura.gov.co',
  },
  {
    id: 'news-4',
    titulo: 'Fenómeno de La Niña impacta precios de hortalizas en la región Andina',
    fuente: 'IDEAM',
    fecha: '2025-11-18',
    url: 'https://www.ideam.gov.co',
  },
  {
    id: 'news-5',
    titulo: 'Exportaciones de aguacate Hass superan proyecciones del trimestre',
    fuente: 'ProColombia',
    fecha: '2025-11-17',
    url: 'https://www.procolombia.co',
  },
  {
    id: 'news-6',
    titulo: 'Nuevo distrito de riego beneficiará a 500 familias en Tolima',
    fuente: 'ADR',
    fecha: '2025-11-16',
    url: 'https://www.adr.gov.co',
  },
];

// Default User Settings
export const defaultUserSettings: UserSettings = {
  ubicacion: {
    departamentoCodigo: '11',
    municipioCodigo: '11001',
    departamentoNombre: 'Bogotá, D.C.',
    municipioNombre: 'Bogotá, D.C.',
  },
  idioma: 'es',
  notificaciones: true,
  watchlist: [
    {
      id: 'watch-1',
      productoId: 'limon-tahiti',
      presentacionId: 'limon-tahiti-bulto',
      mercadoId: 'corabastos',
      productoNombre: 'Limón tahití',
      presentacionNombre: 'Bulto 24 kg',
      mercadoNombre: 'Corabastos',
      ciudad: 'Bogotá, D.C.',
    },
    {
      id: 'watch-2',
      productoId: 'papa-criolla',
      presentacionId: 'papa-criolla-bulto',
      mercadoId: 'corabastos',
      productoNombre: 'Papa criolla limpia',
      presentacionNombre: 'Bulto 50 kg',
      mercadoNombre: 'Corabastos',
      ciudad: 'Bogotá, D.C.',
    },
    {
      id: 'watch-3',
      productoId: 'tomate-chonto',
      presentacionId: 'tomate-chonto-caja',
      mercadoId: 'corabastos',
      productoNombre: 'Tomate chonto',
      presentacionNombre: 'Caja 25 kg',
      mercadoNombre: 'Corabastos',
      ciudad: 'Bogotá, D.C.',
    },
    {
      id: 'watch-4',
      productoId: 'cebolla-roja',
      presentacionId: 'cebolla-roja-bulto',
      mercadoId: 'central-mayorista-antioquia',
      productoNombre: 'Cebolla cabezona roja',
      presentacionNombre: 'Bulto 45 kg',
      mercadoNombre: 'Central Mayorista',
      ciudad: 'Medellín',
    },
  ],
};

// Helper functions
export const getProductoById = (id: string) => productos.find((p) => p.id === id);
export const getPresentacionById = (id: string) => presentaciones.find((p) => p.id === id);
export const getMercadoById = (id: string) => mercados.find((m) => m.id === id);
export const getCategoriaById = (id: string) => categorias.find((c) => c.id === id);
export const getSubcategoriaById = (id: string) => subcategorias.find((s) => s.id === id);
export const getDepartamentoById = (codigo: string) => departamentos.find((d) => d.codigo === codigo);
export const getMunicipioById = (codigo: string) => municipios.find((m) => m.codigo === codigo);

export const getLatestPriceForProduct = (
  productoId: string,
  mercadoId: string,
  presentacionId?: string
): PrecioObservacion | undefined => {
  return precioObservaciones
    .filter(
      (o) =>
        o.productoId === productoId &&
        o.mercadoId === mercadoId &&
        (!presentacionId || o.presentacionId === presentacionId)
    )
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
};

export const getPriceHistory = (
  productoId: string,
  mercadoId: string,
  presentacionId?: string,
  days: number = 30
): PrecioObservacion[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return precioObservaciones
    .filter(
      (o) =>
        o.productoId === productoId &&
        o.mercadoId === mercadoId &&
        (!presentacionId || o.presentacionId === presentacionId) &&
        new Date(o.fecha) >= cutoffDate
    )
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
};

export const getProductLineage = (productoId: string): string => {
  const producto = getProductoById(productoId);
  if (!producto) return '';

  const subcategoria = getSubcategoriaById(producto.subcategoriaId);
  const categoria = getCategoriaById(producto.categoriaId);

  return `${categoria?.nombre || ''} > ${subcategoria?.nombre || ''} > ${producto.nombre}`;
};
