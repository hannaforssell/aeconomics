export const shortNum = (num: number): string => {
  const abs = Math.abs(num);

  if (abs >= 1000000000) {
    return String(Number((num / 1000000000).toFixed(1))) + 'b';
  } else if (abs >= 1000000) {
    return String(Number((num / 1000000).toFixed(1))) + 'm';
  } else if (abs >= 1000) {
    return String(Number((num / 1000).toFixed(1))) + 'k';
  } else {
    return String(num.toFixed(1));
  }
}