import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function calculateDiscountPercentage(
  price: number,
  fullPrice: number
): number {
  return Math.round((1 - price / fullPrice) * 100);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(price);
}
