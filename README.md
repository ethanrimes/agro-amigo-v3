# Agro Amigo

Aplicación móvil para explorar datos de precios agrícolas e insumos de Colombia, utilizando información del Sistema de Información de Precios y Abastecimiento del Sector Agropecuario (SIPSA) del DANE.

## Características

- **Exploración de precios**: Consulta precios de productos agrícolas, insumos y distritos de riego
- **Análisis visual**: Gráficos interactivos con series de tiempo, histogramas y comparaciones
- **Geovisor**: Mapa interactivo de Colombia con visualización de precios por departamento y mercado
- **Búsqueda inteligente**: Búsqueda jerárquica (Categoría > Subcategoría > Producto > Presentación)
- **Noticias del sector**: Últimas noticias agrícolas de fuentes oficiales

## Stack Tecnológico

- **Framework**: React Native + Expo
- **Navegación**: React Navigation
- **UI Components**: Gluestack UI v3
- **Visualización**: D3.js + React Native SVG
- **Mapas**: Mapbox (rnmapbox)
- **Backend**: FastAPI (scaffold)

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── charts/       # Gráficos (LineChart, BarChart, HistogramChart)
│   ├── SearchBar.tsx
│   ├── AppModal.tsx
│   ├── PriceTicker.tsx
│   └── ...
├── screens/          # Pantallas principales
│   ├── HomeScreen.tsx
│   ├── AnalyzeScreen.tsx
│   ├── GeovisorScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/       # Configuración de navegación
├── services/         # API y servicios
├── data/            # Datos mock
├── theme/           # Configuración de tema y estilos
├── types/           # Definiciones de TypeScript
└── hooks/           # Custom hooks
```

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

## Datos

La aplicación actualmente utiliza datos mock que simulan la estructura de SIPSA:

- **Productos Agrícolas**: Frutas, tubérculos, verduras, pescados
- **Insumos Agrícolas**: Bioinsumos, fertilizantes, fungicidas, herbicidas
- **Distritos de Riego**: Información de tarifas por hectárea
- **Abastecimiento**: Datos de mercados mayoristas

## Jerarquía de Datos

### Productos
- **Tipo**: Producto Agrícola, Insumo Agrícola, Distrito de Riego, Mercado Mayorista
- **Categoría** > **Subcategoría** > **Producto** > **Presentación**

### Geografía
- **Departamento** > **Municipio** > **Mercado**

## Próximos Pasos

- [ ] Conexión con backend FastAPI
- [ ] Integración con Supabase
- [ ] Implementación de autenticación
- [ ] Notificaciones push
- [ ] Modo offline

## Licencia

Este proyecto está bajo la Licencia MIT.

---

Datos: DANE - SIPSA (Sistema de Información de Precios y Abastecimiento del Sector Agropecuario)
