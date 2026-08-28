/**
 * Helper utility to safely format numeric values as currency (ETB) and locale numbers
 * preventing "Cannot read properties of undefined (reading 'toLocaleString')" errors.
 */

export function formatETB(value: number | string | null | undefined): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return 'ETB 0';
  }
  return `ETB ${Number(value).toLocaleString()}`;
}

export function formatNumber(value: number | string | null | undefined, fallback: number = 0): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return Number(fallback).toLocaleString();
  }
  return Number(value).toLocaleString();
}
