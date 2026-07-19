const PHP_BASE_URL = process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost/UndanganPanel/';

export function getPhpApiUrl(path: string): string {
  const cleanBase = PHP_BASE_URL.endsWith('/') ? PHP_BASE_URL : `${PHP_BASE_URL}/`;
  return `${cleanBase}api/${path}`;
}

export function formatImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanBase = PHP_BASE_URL.endsWith('/') ? PHP_BASE_URL : `${PHP_BASE_URL}/`;
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  return `${cleanBase}${cleanUrl}`;
}
