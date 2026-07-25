export function getDecimalPlaces(num: number): number {
  const str = num.toString();
  if (str.includes('.')) {
    const decimals = str.split('.')[1];
    if (parseInt(decimals) !== 0) return decimals.length;
  }
  return 0;
}

export function formatValue(latest: number, decimals: number, sep: string): string {
  const hasDecimals = decimals > 0;
  const options: Intl.NumberFormatOptions = {
    useGrouping: !!sep,
    minimumFractionDigits: hasDecimals ? decimals : 0,
    maximumFractionDigits: hasDecimals ? decimals : 0
  };
  const formatted = Intl.NumberFormat('en-US', options).format(latest);
  return sep ? formatted.replace(/,/g, sep) : formatted;
}