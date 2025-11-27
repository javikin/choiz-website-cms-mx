/**
 * Normaliza las URLs de imagen de TinaCMS
 *
 * TinaCloud transforma las rutas de imagen a su CDN:
 * - Local: /images/hero.jpg
 * - TinaCloud: https://assets.tina.io/CLIENT_ID/images/hero.jpg
 *
 * Esta función convierte las URLs de TinaCloud de vuelta a rutas locales.
 */
export function normalizeImageUrl(url: string | undefined): string {
  if (!url) return '';

  // Si es una URL de TinaCloud, extraer la ruta local
  if (url.includes('assets.tina.io')) {
    // URL format: https://assets.tina.io/CLIENT_ID/images/file.jpg
    // Queremos: /images/file.jpg
    const match = url.match(/assets\.tina\.io\/[^/]+\/(.+)/);
    if (match) {
      return `/${match[1]}`;
    }
  }

  // Si ya es una ruta local, devolverla tal cual
  return url;
}

/**
 * Verifica si una URL es externa (comienza con http)
 */
export function isExternalUrl(url: string | undefined): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}
