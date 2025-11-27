/**
 * Formatting Utilities
 * Helper functions for formatting prices, dates, and numbers
 */

/**
 * Format price with thousands separator
 */
export const formatPrice = (price: number): string => {
  return Math.round(price).toLocaleString('es-CO');
};

/**
 * Format price with currency
 */
export const formatPriceCOP = (price: number): string => {
  return `$${formatPrice(price)} COP`;
};

/**
 * Format date to Spanish locale
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format date to short format
 */
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Format date to long format
 */
export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
};

/**
 * Calculate percent change between two values
 */
export const calculatePercentChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Format percent with sign
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format number with abbreviation (K, M, B)
 */
export const formatNumberAbbreviated = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

/**
 * Format weight in toneladas
 */
export const formatToneladas = (value: number): string => {
  return `${formatPrice(value)} t`;
};

/**
 * Parse Colombian price string to number
 */
export const parseCOPPrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[.$\s]/g, ''), 10) || 0;
};

/**
 * Get month name in Spanish
 */
export const getMonthName = (month: number): string => {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  return months[month];
};

/**
 * Format date range
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${getMonthName(end.getMonth())} ${end.getFullYear()}`;
    }
    return `${start.getDate()} ${getMonthName(start.getMonth())} - ${end.getDate()} ${getMonthName(end.getMonth())} ${end.getFullYear()}`;
  }
  return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
};

/**
 * Calculate statistics from array of numbers
 */
export const calculateStats = (values: number[]) => {
  if (values.length === 0) return { min: 0, max: 0, avg: 0, median: 0, stdDev: 0 };

  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;

  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const squareDiffs = values.map((value) => Math.pow(value - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  const stdDev = Math.sqrt(avgSquareDiff);

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg,
    median,
    stdDev,
    p25: sorted[Math.floor(sorted.length * 0.25)],
    p75: sorted[Math.floor(sorted.length * 0.75)],
  };
};
