// Comprehensive mock data for Agro Amigo
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
  AbastecimientoGrupo,
  VehiculosIngreso,
  NoticiaAgricola,
  TipoProducto,
} from '../types';

// ============ DEPARTAMENTOS ============
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
  { codigo: '52', nombre: 'Nariño' },
  { codigo: '54', nombre: 'Norte de Santander' },
  { codigo: '63', nombre: 'Quindío' },
  { codigo: '66', nombre: 'Risaralda' },
  { codigo: '68', nombre: 'Santander' },
  { codigo: '73', nombre: 'Tolima' },
  { codigo: '76', nombre: 'Valle del Cauca' },
  { codigo: '85', nombre: 'Casanare' },
];

// ============ MUNICIPIOS ============
export const municipios: Municipio[] = [
  { codigo: '05001', nombre: 'Medellín', departamentoCodigo: '05', departamento: 'Antioquia' },
  { codigo: '08001', nombre: 'Barranquilla', departamentoCodigo: '08', departamento: 'Atlántico' },
  { codigo: '11001', nombre: 'Bogotá, D.C.', departamentoCodigo: '11', departamento: 'Bogotá, D.C.' },
  { codigo: '13001', nombre: 'Cartagena', departamentoCodigo: '13', departamento: 'Bolívar' },
  { codigo: '15001', nombre: 'Tunja', departamentoCodigo: '15', departamento: 'Boyacá' },
  { codigo: '17001', nombre: 'Manizales', departamentoCodigo: '17', departamento: 'Caldas' },
  { codigo: '19001', nombre: 'Popayán', departamentoCodigo: '19', departamento: 'Cauca' },
  { codigo: '41001', nombre: 'Neiva', departamentoCodigo: '41', departamento: 'Huila' },
  { codigo: '52001', nombre: 'Pasto', departamentoCodigo: '52', departamento: 'Nariño' },
  { codigo: '54001', nombre: 'Cúcuta', departamentoCodigo: '54', departamento: 'Norte de Santander' },
  { codigo: '63001', nombre: 'Armenia', departamentoCodigo: '63', departamento: 'Quindío' },
  { codigo: '66001', nombre: 'Pereira', departamentoCodigo: '66', departamento: 'Risaralda' },
  { codigo: '68001', nombre: 'Bucaramanga', departamentoCodigo: '68', departamento: 'Santander' },
  { codigo: '73001', nombre: 'Ibagué', departamentoCodigo: '73', departamento: 'Tolima' },
  { codigo: '76001', nombre: 'Cali', departamentoCodigo: '76', departamento: 'Valle del Cauca' },
];

// ============ MERCADOS ============
export const mercados: Mercado[] = [
  { id: 'barranquillita', nombre: 'Barranquillita', municipioCodigo: '08001', municipio: 'Barranquilla', departamentoCodigo: '08', departamento: 'Atlántico' },
  { id: 'granabastos', nombre: 'Granabastos', municipioCodigo: '08001', municipio: 'Barranquilla', departamentoCodigo: '08', departamento: 'Atlántico' },
  { id: 'corabastos', nombre: 'Corabastos', municipioCodigo: '11001', municipio: 'Bogotá, D.C.', departamentoCodigo: '11', departamento: 'Bogotá, D.C.' },
  { id: 'paloquemao', nombre: 'Paloquemao', municipioCodigo: '11001', municipio: 'Bogotá, D.C.', departamentoCodigo: '11', departamento: 'Bogotá, D.C.' },
  { id: 'plaza-las-flores', nombre: 'Plaza Las Flores', municipioCodigo: '11001', municipio: 'Bogotá, D.C.', departamentoCodigo: '11', departamento: 'Bogotá, D.C.' },
  { id: 'plaza-samper-mendoza', nombre: 'Plaza Samper Mendoza', municipioCodigo: '11001', municipio: 'Bogotá, D.C.', departamentoCodigo: '11', departamento: 'Bogotá, D.C.' },
  { id: 'central-mayorista', nombre: 'Central Mayorista de Antioquia', municipioCodigo: '05001', municipio: 'Medellín', departamentoCodigo: '05', departamento: 'Antioquia' },
  { id: 'plaza-minorista', nombre: 'Plaza Minorista José María Villa', municipioCodigo: '05001', municipio: 'Medellín', departamentoCodigo: '05', departamento: 'Antioquia' },
  { id: 'cavasa', nombre: 'Cavasa', municipioCodigo: '76001', municipio: 'Cali', departamentoCodigo: '76', departamento: 'Valle del Cauca' },
  { id: 'santa-elena', nombre: 'Santa Elena', municipioCodigo: '76001', municipio: 'Cali', departamentoCodigo: '76', departamento: 'Valle del Cauca' },
  { id: 'centroabastos', nombre: 'Centroabastos', municipioCodigo: '68001', municipio: 'Bucaramanga', departamentoCodigo: '68', departamento: 'Santander' },
  { id: 'mercar', nombre: 'Mercar', municipioCodigo: '63001', municipio: 'Armenia', departamentoCodigo: '63', departamento: 'Quindío' },
  { id: 'bazurto', nombre: 'Bazurto', municipioCodigo: '13001', municipio: 'Cartagena', departamentoCodigo: '13', departamento: 'Bolívar' },
  { id: 'cenabastos', nombre: 'Cenabastos', municipioCodigo: '54001', municipio: 'Cúcuta', departamentoCodigo: '54', departamento: 'Norte de Santander' },
  { id: 'centro-galerias', nombre: 'Centro Galerías', municipioCodigo: '17001', municipio: 'Manizales', departamentoCodigo: '17', departamento: 'Caldas' },
  { id: 'surabastos', nombre: 'Surabastos', municipioCodigo: '41001', municipio: 'Neiva', departamentoCodigo: '41', departamento: 'Huila' },
];

// ============ CATEGORIAS ============
export const categorias: Categoria[] = [
  { id: 'frutas', nombre: 'Frutas', tipo: 'producto_agricola' },
  { id: 'tuberculos', nombre: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  { id: 'verduras', nombre: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'pescados', nombre: 'Pescados Frescos y congelados', tipo: 'producto_agricola' },
  { id: 'otros', nombre: 'Otros grupos', tipo: 'producto_agricola' },
  { id: 'bioinsumos', nombre: 'Bioinsumos', tipo: 'insumo_agricola' },
  { id: 'fertilizantes', nombre: 'Fertilizantes, enmiendas y acondicionadores de suelo', tipo: 'insumo_agricola' },
  { id: 'fungicidas', nombre: 'Fungicidas', tipo: 'insumo_agricola' },
  { id: 'herbicidas', nombre: 'Herbicidas', tipo: 'insumo_agricola' },
  { id: 'insecticidas', nombre: 'Insecticidas, acaricidas y nematicidas', tipo: 'insumo_agricola' },
  { id: 'distritos', nombre: 'Distritos de riego', tipo: 'distrito_riego' },
  { id: 'propagacion', nombre: 'Material de propagación', tipo: 'insumo_agricola' },
];

// ============ SUBCATEGORIAS ============
export const subcategorias: Subcategoria[] = [
  { id: 'citricos', nombre: 'Cítricos', categoriaId: 'frutas', categoria: 'Frutas' },
  { id: 'otras-frutas', nombre: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas' },
  { id: 'platano', nombre: 'Plátano', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos' },
  { id: 'papa', nombre: 'Papa', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos' },
  { id: 'yuca', nombre: 'Yuca', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos' },
  { id: 'leguminosas', nombre: 'Leguminosas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas' },
  { id: 'otras-hortalizas', nombre: 'Otras hortalizas y verduras', categoriaId: 'verduras', categoria: 'Verduras y hortalizas' },
  { id: 'cebollas', nombre: 'Cebollas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas' },
  { id: 'tomates', nombre: 'Tomates', categoriaId: 'verduras', categoria: 'Verduras y hortalizas' },
  { id: 'hortalizas-verdes', nombre: 'Hortalizas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas' },
  { id: 'pescados-frescos', nombre: 'Pescados Frescos y congelados', categoriaId: 'pescados', categoria: 'Pescados Frescos y congelados' },
];

// ============ PRODUCTOS ============
export const productos: Producto[] = [
  // Cítricos
  { id: 'limon-tahiti', nombre: 'Limón tahití', subcategoriaId: 'citricos', subcategoria: 'Cítricos', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'mandarina-comun', nombre: 'Mandarina común', subcategoriaId: 'citricos', subcategoria: 'Cítricos', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'naranja-valencia', nombre: 'Naranja valencia', subcategoriaId: 'citricos', subcategoria: 'Cítricos', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'naranja-comun', nombre: 'Naranja común', subcategoriaId: 'citricos', subcategoria: 'Cítricos', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  // Otras frutas
  { id: 'banano-uraba', nombre: 'Banano urabá', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'banano-criollo', nombre: 'Banano criollo', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'coco', nombre: 'Coco', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-atlantico', nombre: 'Guayaba atlántico', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-comun', nombre: 'Guayaba común', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'guayaba-pera', nombre: 'Guayaba pera', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'lulo', nombre: 'Lulo', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'mango-tommy', nombre: 'Mango tommy', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'mango-azucar', nombre: 'Mango de azúcar', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'maracuya', nombre: 'Maracuyá antioqueño', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'mora-castilla', nombre: 'Mora de castilla', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'papaya-tainung', nombre: 'Papaya tainung', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'pina-perolera', nombre: 'Piña perolera', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  { id: 'tomate-arbol', nombre: 'Tomate de árbol', subcategoriaId: 'otras-frutas', subcategoria: 'Otras frutas', categoriaId: 'frutas', categoria: 'Frutas', tipo: 'producto_agricola' },
  // Tubérculos
  { id: 'platano-harton', nombre: 'Plátano hartón verde', subcategoriaId: 'platano', subcategoria: 'Plátano', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  { id: 'papa-criolla', nombre: 'Papa criolla limpia', subcategoriaId: 'papa', subcategoria: 'Papa', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  { id: 'papa-unica', nombre: 'Papa única', subcategoriaId: 'papa', subcategoria: 'Papa', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  { id: 'yuca-criolla', nombre: 'Yuca criolla', subcategoriaId: 'yuca', subcategoria: 'Yuca', categoriaId: 'tuberculos', categoria: 'Tubérculos, raíces y plátanos', tipo: 'producto_agricola' },
  // Verduras
  { id: 'arveja-verde', nombre: 'Arveja verde en vaina', subcategoriaId: 'leguminosas', subcategoria: 'Leguminosas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'frijol-verde', nombre: 'Frijol verde en vaina', subcategoriaId: 'leguminosas', subcategoria: 'Leguminosas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'habichuela', nombre: 'Habichuela', subcategoriaId: 'leguminosas', subcategoria: 'Leguminosas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'cebolla-blanca', nombre: 'Cebolla cabezona blanca', subcategoriaId: 'cebollas', subcategoria: 'Cebollas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'cebolla-roja', nombre: 'Cebolla cabezona roja', subcategoriaId: 'cebollas', subcategoria: 'Cebollas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'tomate-chonto', nombre: 'Tomate chonto', subcategoriaId: 'tomates', subcategoria: 'Tomates', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'zanahoria', nombre: 'Zanahoria', subcategoriaId: 'otras-hortalizas', subcategoria: 'Otras hortalizas y verduras', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'lechuga-batavia', nombre: 'Lechuga batavia', subcategoriaId: 'hortalizas-verdes', subcategoria: 'Hortalizas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
  { id: 'cilantro', nombre: 'Cilantro', subcategoriaId: 'hortalizas-verdes', subcategoria: 'Hortalizas', categoriaId: 'verduras', categoria: 'Verduras y hortalizas', tipo: 'producto_agricola' },
];

// ============ PRESENTACIONES ============
export const presentaciones: Presentacion[] = [
  // Limón tahití
  { id: 'limon-tahiti-bulto', nombre: 'Bulto 24 Kilogramo', unidades: 'Bulto', kilogramos: 24, productoId: 'limon-tahiti' },
  { id: 'limon-tahiti-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'limon-tahiti' },
  // Mandarina
  { id: 'mandarina-caja', nombre: 'Caja de cartón 24 Kilogramo', unidades: 'Caja de cartón', kilogramos: 24, productoId: 'mandarina-comun' },
  // Naranja
  { id: 'naranja-valencia-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'naranja-valencia' },
  { id: 'naranja-comun-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'naranja-comun' },
  // Banano
  { id: 'banano-uraba-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'banano-uraba' },
  { id: 'banano-criollo-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'banano-criollo' },
  // Guayaba
  { id: 'guayaba-canastilla', nombre: 'Canastilla 25 Kilogramo', unidades: 'Canastilla', kilogramos: 25, productoId: 'guayaba-atlantico' },
  { id: 'guayaba-comun-canastilla', nombre: 'Canastilla 25 Kilogramo', unidades: 'Canastilla', kilogramos: 25, productoId: 'guayaba-comun' },
  // Mango
  { id: 'mango-tommy-canastilla', nombre: 'Canastilla 25 Kilogramo', unidades: 'Canastilla', kilogramos: 25, productoId: 'mango-tommy' },
  { id: 'mango-azucar-canastilla', nombre: 'Canastilla 25 Kilogramo', unidades: 'Canastilla', kilogramos: 25, productoId: 'mango-azucar' },
  // Papa
  { id: 'papa-criolla-bulto', nombre: 'Bulto 50 Kilogramo', unidades: 'Bulto', kilogramos: 50, productoId: 'papa-criolla' },
  { id: 'papa-unica-bulto', nombre: 'Bulto 50 Kilogramo', unidades: 'Bulto', kilogramos: 50, productoId: 'papa-unica' },
  // Yuca
  { id: 'yuca-bolsa', nombre: 'Bolsa 40 Kilogramo', unidades: 'Bolsa', kilogramos: 40, productoId: 'yuca-criolla' },
  // Cebolla
  { id: 'cebolla-blanca-bulto', nombre: 'Bulto 50 Kilogramo', unidades: 'Bulto', kilogramos: 50, productoId: 'cebolla-blanca' },
  { id: 'cebolla-roja-bulto', nombre: 'Bulto 45 Kilogramo', unidades: 'Bulto', kilogramos: 45, productoId: 'cebolla-roja' },
  // Tomate
  { id: 'tomate-chonto-caja', nombre: 'Caja de cartón 25 Kilogramo', unidades: 'Caja de cartón', kilogramos: 25, productoId: 'tomate-chonto' },
  // Zanahoria
  { id: 'zanahoria-bulto', nombre: 'Bulto 60 Kilogramo', unidades: 'Bulto', kilogramos: 60, productoId: 'zanahoria' },
  // Others (per kilo)
  { id: 'lulo-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'lulo' },
  { id: 'papaya-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'papaya-tainung' },
  { id: 'arveja-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'arveja-verde' },
  { id: 'platano-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'platano-harton' },
  { id: 'cilantro-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'cilantro' },
  { id: 'lechuga-kg', nombre: 'Kilogramo', unidades: 'Kilogramo', kilogramos: 1, productoId: 'lechuga-batavia' },
];

// ============ HELPER FUNCTION TO GENERATE TIME SERIES DATA ============
const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const randomVariation = (base: number, percent: number): number => {
  const variation = base * (percent / 100);
  return Math.round(base + (Math.random() * variation * 2 - variation));
};

// ============ PRECIO OBSERVACIONES ============
const generatePrecioObservaciones = (): PrecioObservacion[] => {
  const observaciones: PrecioObservacion[] = [];
  const dates = generateDates(90); // Last 90 days

  const productPrices: { [key: string]: { min: number; max: number } } = {
    'limon-tahiti': { min: 38000, max: 42000 },
    'mandarina-comun': { min: 55000, max: 62000 },
    'naranja-valencia': { min: 2000, max: 2500 },
    'banano-uraba': { min: 1600, max: 2000 },
    'mango-tommy': { min: 70000, max: 85000 },
    'papa-criolla': { min: 200000, max: 240000 },
    'papa-unica': { min: 50000, max: 65000 },
    'tomate-chonto': { min: 30000, max: 45000 },
    'cebolla-blanca': { min: 90000, max: 110000 },
    'zanahoria': { min: 110000, max: 130000 },
  };

  let id = 1;
  for (const mercado of mercados.slice(0, 8)) {
    for (const date of dates) {
      for (const [productoId, priceRange] of Object.entries(productPrices)) {
        const producto = productos.find(p => p.id === productoId);
        const presentacion = presentaciones.find(p => p.productoId === productoId);
        if (!producto || !presentacion) continue;

        const baseMin = randomVariation(priceRange.min, 15);
        const baseMax = randomVariation(priceRange.max, 15);

        observaciones.push({
          id: `obs-${id++}`,
          fecha: date,
          productoId: producto.id,
          producto: producto.nombre,
          presentacionId: presentacion.id,
          presentacion: presentacion.nombre,
          mercadoId: mercado.id,
          mercado: mercado.nombre,
          municipio: mercado.municipio,
          departamento: mercado.departamento,
          precioMinimo: Math.min(baseMin, baseMax),
          precioMaximo: Math.max(baseMin, baseMax),
          precioPromedio: Math.round((baseMin + baseMax) / 2),
          unidad: 'COP',
          serie: 'diario',
        });
      }
    }
  }

  return observaciones;
};

export const precioObservaciones = generatePrecioObservaciones();

// ============ INSUMOS AGRICOLAS ============
export const insumosAgricolas: InsumoAgricola[] = [
  { id: 'alisin', codigo: '3466106', nombre: 'Alisin', categoria: 'Bioinsumos', subcategoria: 'Bioinsumos', presentacion: '1 litro' },
  { id: 'alisin-250', codigo: '3466106', nombre: 'Alisin', categoria: 'Bioinsumos', subcategoria: 'Bioinsumos', presentacion: '250 centímetros cúbicos' },
  { id: 'bassar-wp', codigo: '3466105', nombre: 'Bassar Wp', categoria: 'Bioinsumos', subcategoria: 'Bioinsumos', presentacion: '500 gramos' },
  { id: 'bovetropico', codigo: '3466105', nombre: 'Bovetrópico Wp', categoria: 'Bioinsumos', subcategoria: 'Bioinsumos', presentacion: '1 kilogramo' },
  { id: 'capsialil', codigo: '3466106', nombre: 'CapsiAlil Ec', categoria: 'Bioinsumos', subcategoria: 'Bioinsumos', presentacion: '1 litro' },
  { id: 'urea', codigo: '3120001', nombre: 'Urea', categoria: 'Fertilizantes', subcategoria: 'Fertilizantes, enmiendas y acondicionadores de suelo', presentacion: '50 kilogramos' },
  { id: 'triple-15', codigo: '3120002', nombre: 'Triple 15', categoria: 'Fertilizantes', subcategoria: 'Fertilizantes, enmiendas y acondicionadores de suelo', presentacion: '50 kilogramos' },
  { id: 'dap', codigo: '3120003', nombre: 'DAP', categoria: 'Fertilizantes', subcategoria: 'Fertilizantes, enmiendas y acondicionadores de suelo', presentacion: '50 kilogramos' },
];

// ============ PRECIO INSUMOS ============
const generatePrecioInsumos = (): PrecioInsumo[] => {
  const precios: PrecioInsumo[] = [];
  const dates = generateDates(60);

  const insumoPrices: { [key: string]: number } = {
    'alisin': 65000,
    'alisin-250': 28500,
    'bassar-wp': 54000,
    'bovetropico': 73500,
    'capsialil': 215000,
    'urea': 180000,
    'triple-15': 195000,
    'dap': 220000,
  };

  let id = 1;
  for (const municipio of municipios.slice(0, 10)) {
    for (const date of dates) {
      for (const insumo of insumosAgricolas) {
        const basePrice = insumoPrices[insumo.id] || 50000;
        const precio = randomVariation(basePrice, 10);
        const prevPrecio = randomVariation(basePrice, 10);

        precios.push({
          id: `insumo-${id++}`,
          fecha: date,
          insumoId: insumo.id,
          insumo: insumo.nombre,
          presentacion: insumo.presentacion,
          municipioCodigo: municipio.codigo,
          municipio: municipio.nombre,
          departamentoCodigo: municipio.departamentoCodigo,
          departamento: municipio.departamento,
          precioPromedio: precio,
          variacionPorcentual: parseFloat(((precio - prevPrecio) / prevPrecio * 100).toFixed(2)),
        });
      }
    }
  }

  return precios;
};

export const precioInsumos = generatePrecioInsumos();

// ============ DISTRITOS DE RIEGO ============
export const distritosRiego: DistritoRiego[] = [
  { id: 'el-altillo', nombre: 'El Altillo', municipioCodigo: '19001', municipio: 'Popayán', departamentoCodigo: '19', departamento: 'Cauca', tipoPago: 'Hectárea/Anual' },
  { id: 'el-saladito', nombre: 'El Saladito', municipioCodigo: '19001', municipio: 'Popayán', departamentoCodigo: '19', departamento: 'Cauca', tipoPago: 'Hectárea/Anual' },
  { id: 'los-cedros', nombre: 'Los Cedros', municipioCodigo: '19548', municipio: 'Piendamó - Tunía', departamentoCodigo: '19', departamento: 'Cauca', tipoPago: 'Hectárea/Anual' },
  { id: 'mocari', nombre: 'Mocarí', municipioCodigo: '23001', municipio: 'Montería', departamentoCodigo: '23', departamento: 'Córdoba', tipoPago: 'Hectárea/Anual' },
  { id: 'la-doctrina', nombre: 'La Doctrina', municipioCodigo: '23417', municipio: 'Lorica', departamentoCodigo: '23', departamento: 'Córdoba', tipoPago: 'Hectárea/Anual' },
  { id: 'asodistricharte', nombre: 'Asodistricharte', municipioCodigo: '85010', municipio: 'Aguazul', departamentoCodigo: '85', departamento: 'Casanare', tipoPago: 'Hectárea/Anual' },
  { id: 'uso-chicamocha', nombre: 'Uso Chicamocha', municipioCodigo: '15238', municipio: 'Duitama', departamentoCodigo: '15', departamento: 'Boyacá', tipoPago: 'Hectárea/Bimestral' },
  { id: 'caravi', nombre: 'Caravi', municipioCodigo: '66045', municipio: 'Apía', departamentoCodigo: '66', departamento: 'Risaralda', tipoPago: 'Hectárea/Mensual' },
  { id: 'asojuncal', nombre: 'Asojuncal', municipioCodigo: '41524', municipio: 'Palermo', departamentoCodigo: '41', departamento: 'Huila', tipoPago: 'Hectárea/Semestral' },
  { id: 'asozulia', nombre: 'Asozulia', municipioCodigo: '54001', municipio: 'San José de Cúcuta', departamentoCodigo: '54', departamento: 'Norte de Santander', tipoPago: 'Hectárea/Semestral' },
];

// ============ PRECIO DISTRITOS DE RIEGO ============
export const precioDistritosRiego: PrecioDistritoRiego[] = [
  { id: 'dr-1', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'el-altillo', distrito: 'El Altillo', municipio: 'Popayán', departamento: 'Cauca', tipoPago: 'Hectárea/Anual', precioAnterior: 103000, precioActual: 108000, variacionPorcentual: 4.85 },
  { id: 'dr-2', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'el-saladito', distrito: 'El Saladito', municipio: 'Popayán', departamento: 'Cauca', tipoPago: 'Hectárea/Anual', precioAnterior: 94000, precioActual: 98000, variacionPorcentual: 4.26 },
  { id: 'dr-3', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'los-cedros', distrito: 'Los Cedros', municipio: 'Piendamó - Tunía', departamento: 'Cauca', tipoPago: 'Hectárea/Anual', precioAnterior: 80000, precioActual: 83000, variacionPorcentual: 3.75 },
  { id: 'dr-4', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'mocari', distrito: 'Mocarí', municipio: 'Montería', departamento: 'Córdoba', tipoPago: 'Hectárea/Anual', precioAnterior: 252771, precioActual: 252771, variacionPorcentual: 0 },
  { id: 'dr-5', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'la-doctrina', distrito: 'La Doctrina', municipio: 'Lorica', departamento: 'Córdoba', tipoPago: 'Hectárea/Anual', precioAnterior: 187449, precioActual: 187449, variacionPorcentual: 0 },
  { id: 'dr-6', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'asodistricharte', distrito: 'Asodistricharte', municipio: 'Aguazul', departamento: 'Casanare', tipoPago: 'Hectárea/Anual', precioAnterior: 19000, precioActual: 19000, variacionPorcentual: 0 },
  { id: 'dr-7', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'uso-chicamocha', distrito: 'Uso Chicamocha', municipio: 'Duitama', departamento: 'Boyacá', tipoPago: 'Hectárea/Bimestral', precioAnterior: 31694, precioActual: 31639, variacionPorcentual: -0.17 },
  { id: 'dr-8', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'caravi', distrito: 'Caravi', municipio: 'Apía', departamento: 'Risaralda', tipoPago: 'Hectárea/Mensual', precioAnterior: 15000, precioActual: 22000, variacionPorcentual: 46.67 },
  { id: 'dr-9', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'asojuncal', distrito: 'Asojuncal', municipio: 'Palermo', departamento: 'Huila', tipoPago: 'Hectárea/Semestral', precioAnterior: 65063, precioActual: 63063, variacionPorcentual: -3.07 },
  { id: 'dr-10', fechaAnterior: '2025-04', fechaActual: '2025-10', distritoId: 'asozulia', distrito: 'Asozulia', municipio: 'San José de Cúcuta', departamento: 'Norte de Santander', tipoPago: 'Hectárea/Semestral', precioAnterior: 87193, precioActual: 87193, variacionPorcentual: 0 },
];

// ============ ABASTECIMIENTO ============
export const abastecimientoGrupos: AbastecimientoGrupo[] = [
  // Total 32 mercados
  { id: 'ab-1', mercadoId: 'total', mercado: 'Total 32 mercados', mes: '2025-10', grupo: 'Frutas', cantidadToneladas: 149233, participacionPorcentual: 22.16, variacionPorcentual: 4.93 },
  { id: 'ab-2', mercadoId: 'total', mercado: 'Total 32 mercados', mes: '2025-10', grupo: 'Tubérculos, raíces y plátanos', cantidadToneladas: 182828, participacionPorcentual: 27.14, variacionPorcentual: 5.39 },
  { id: 'ab-3', mercadoId: 'total', mercado: 'Total 32 mercados', mes: '2025-10', grupo: 'Verduras y hortalizas', cantidadToneladas: 187515, participacionPorcentual: 27.84, variacionPorcentual: 6.85 },
  { id: 'ab-4', mercadoId: 'total', mercado: 'Total 32 mercados', mes: '2025-10', grupo: 'Otros grupos', cantidadToneladas: 153950, participacionPorcentual: 22.86, variacionPorcentual: 5.08 },
  // Mercar Armenia
  { id: 'ab-5', mercadoId: 'mercar', mercado: 'Mercar', mes: '2025-10', grupo: 'Frutas', cantidadToneladas: 2567, participacionPorcentual: 24.24, variacionPorcentual: 4.22 },
  { id: 'ab-6', mercadoId: 'mercar', mercado: 'Mercar', mes: '2025-10', grupo: 'Tubérculos, raíces y plátanos', cantidadToneladas: 2887, participacionPorcentual: 27.26, variacionPorcentual: -0.55 },
  { id: 'ab-7', mercadoId: 'mercar', mercado: 'Mercar', mes: '2025-10', grupo: 'Verduras y hortalizas', cantidadToneladas: 3669, participacionPorcentual: 34.64, variacionPorcentual: -2.14 },
  { id: 'ab-8', mercadoId: 'mercar', mercado: 'Mercar', mes: '2025-10', grupo: 'Otros grupos', cantidadToneladas: 1467, participacionPorcentual: 13.86, variacionPorcentual: 5.86 },
  // Barranquillita
  { id: 'ab-9', mercadoId: 'barranquillita', mercado: 'Barranquillita', mes: '2025-10', grupo: 'Frutas', cantidadToneladas: 6892, participacionPorcentual: 16.55, variacionPorcentual: 11.44 },
  { id: 'ab-10', mercadoId: 'barranquillita', mercado: 'Barranquillita', mes: '2025-10', grupo: 'Tubérculos, raíces y plátanos', cantidadToneladas: 10335, participacionPorcentual: 24.81, variacionPorcentual: 9.20 },
  { id: 'ab-11', mercadoId: 'barranquillita', mercado: 'Barranquillita', mes: '2025-10', grupo: 'Verduras y hortalizas', cantidadToneladas: 7865, participacionPorcentual: 18.89, variacionPorcentual: 10.41 },
  { id: 'ab-12', mercadoId: 'barranquillita', mercado: 'Barranquillita', mes: '2025-10', grupo: 'Otros grupos', cantidadToneladas: 16555, participacionPorcentual: 39.75, variacionPorcentual: 19.91 },
  // Corabastos
  { id: 'ab-13', mercadoId: 'corabastos', mercado: 'Corabastos', mes: '2025-10', grupo: 'Frutas', cantidadToneladas: 45200, participacionPorcentual: 23.5, variacionPorcentual: 3.2 },
  { id: 'ab-14', mercadoId: 'corabastos', mercado: 'Corabastos', mes: '2025-10', grupo: 'Tubérculos, raíces y plátanos', cantidadToneladas: 52100, participacionPorcentual: 27.1, variacionPorcentual: 4.8 },
  { id: 'ab-15', mercadoId: 'corabastos', mercado: 'Corabastos', mes: '2025-10', grupo: 'Verduras y hortalizas', cantidadToneladas: 55800, participacionPorcentual: 29.0, variacionPorcentual: 5.5 },
  { id: 'ab-16', mercadoId: 'corabastos', mercado: 'Corabastos', mes: '2025-10', grupo: 'Otros grupos', cantidadToneladas: 39300, participacionPorcentual: 20.4, variacionPorcentual: 2.1 },
];

// ============ VEHICULOS INGRESO ============
export const vehiculosIngreso: VehiculosIngreso[] = [
  { id: 'v-1', mercadoId: 'mercar', mercado: 'Mercar', mes: '2025-10', vehiculosLivianos: 1592, vehiculosPesados: 1045, total: 2637 },
  { id: 'v-2', mercadoId: 'barranquillita', mercado: 'Barranquillita', mes: '2025-10', vehiculosLivianos: 9, vehiculosPesados: 3685, total: 3694 },
  { id: 'v-3', mercadoId: 'granabastos', mercado: 'Granabastos', mes: '2025-10', vehiculosLivianos: 5, vehiculosPesados: 700, total: 705 },
  { id: 'v-4', mercadoId: 'corabastos', mercado: 'Corabastos', mes: '2025-10', vehiculosLivianos: 2595, vehiculosPesados: 29515, total: 32110 },
  { id: 'v-5', mercadoId: 'paloquemao', mercado: 'Paloquemao', mes: '2025-10', vehiculosLivianos: 636, vehiculosPesados: 1129, total: 1765 },
  { id: 'v-6', mercadoId: 'plaza-las-flores', mercado: 'Plaza Las Flores', mes: '2025-10', vehiculosLivianos: 423, vehiculosPesados: 1785, total: 2208 },
  { id: 'v-7', mercadoId: 'centroabastos', mercado: 'Centroabastos', mes: '2025-10', vehiculosLivianos: 1815, vehiculosPesados: 8061, total: 9876 },
  { id: 'v-8', mercadoId: 'cavasa', mercado: 'Cavasa', mes: '2025-10', vehiculosLivianos: 760, vehiculosPesados: 4251, total: 5011 },
  { id: 'v-9', mercadoId: 'central-mayorista', mercado: 'Central Mayorista de Antioquia', mes: '2025-10', vehiculosLivianos: 200, vehiculosPesados: 10681, total: 10881 },
  { id: 'v-10', mercadoId: 'bazurto', mercado: 'Bazurto', mes: '2025-10', vehiculosLivianos: 46, vehiculosPesados: 2870, total: 2916 },
];

// ============ NOTICIAS ============
export const noticiasAgricolas: NoticiaAgricola[] = [
  {
    id: 'n-1',
    titulo: 'Precios de la papa registran incremento del 15% en mercados mayoristas',
    fuente: 'DANE',
    fecha: '2025-11-21',
    url: 'https://www.dane.gov.co',
  },
  {
    id: 'n-2',
    titulo: 'Exportaciones de banano alcanzan récord histórico en octubre',
    fuente: 'MinAgricultura',
    fecha: '2025-11-20',
    url: 'https://www.minagricultura.gov.co',
  },
  {
    id: 'n-3',
    titulo: 'ICA implementa nuevas medidas fitosanitarias para cítricos',
    fuente: 'ICA',
    fecha: '2025-11-19',
    url: 'https://www.ica.gov.co',
  },
  {
    id: 'n-4',
    titulo: 'Abastecimiento alimentario crece 5.6% en principales mercados',
    fuente: 'SIPSA',
    fecha: '2025-11-18',
    url: 'https://www.dane.gov.co/sipsa',
  },
  {
    id: 'n-5',
    titulo: 'Fenómeno de La Niña afectará producción agrícola en la Costa',
    fuente: 'IDEAM',
    fecha: '2025-11-17',
    url: 'https://www.ideam.gov.co',
  },
  {
    id: 'n-6',
    titulo: 'Nuevos subsidios para pequeños productores de café y cacao',
    fuente: 'MinAgricultura',
    fecha: '2025-11-16',
    url: 'https://www.minagricultura.gov.co',
  },
  {
    id: 'n-7',
    titulo: 'Precios de fertilizantes se estabilizan tras meses de alzas',
    fuente: 'SIPSA',
    fecha: '2025-11-15',
    url: 'https://www.dane.gov.co/sipsa',
  },
  {
    id: 'n-8',
    titulo: 'Colombia avanza en certificación de agricultura sostenible',
    fuente: 'MinAgricultura',
    fecha: '2025-11-14',
    url: 'https://www.minagricultura.gov.co',
  },
];

// ============ DEFAULT USER LOCATION ============
export const defaultUbicacion = {
  departamentoCodigo: '11',
  departamento: 'Bogotá, D.C.',
  municipioCodigo: '11001',
  municipio: 'Bogotá, D.C.',
};

// ============ HELPER FUNCTIONS ============

export const getTipoNombre = (tipo: TipoProducto): string => {
  const nombres: Record<TipoProducto, string> = {
    producto_agricola: 'Producto Agrícola',
    insumo_agricola: 'Insumo Agrícola',
    distrito_riego: 'Distrito de Riego',
    mercado_mayorista: 'Mercado Mayorista',
  };
  return nombres[tipo];
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-CO').format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
  });
};
