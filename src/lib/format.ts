export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatEuroShort(value: number): string {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  return formatEuro(value)
}

export function formatNumber(value: number): string {
  return value.toLocaleString('de-AT')
}
