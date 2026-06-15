export function formatPrice(price: number, unit: string = 'FCFA', frequency?: string): string {
  const formatted = new Intl.NumberFormat('fr-FR').format(price);
  const result = `${formatted} ${unit}`;
  if (frequency) return `${result} / ${frequency}`;
  return result;
}

export function formatSurface(surface: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(surface)} m²`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}
