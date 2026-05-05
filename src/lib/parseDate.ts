export interface ParsedDate {
  year: number;
  month: number;
  day: number;
  monthShort: string;
  monthLong: string;
}

export const MONTHS_SHORT: readonly string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MONTHS_LONG: readonly string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DATE_PATTERN = /^\s*(\d{4})\s*[.\-]\s*(\d{1,2})\s*[.\-]\s*(\d{1,2})\s*$/;

export function parseDate(input: string): ParsedDate | null {
  if (typeof input !== 'string') return null;

  const match = DATE_PATTERN.exec(input);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  return {
    year,
    month,
    day,
    monthShort: MONTHS_SHORT[month - 1],
    monthLong: MONTHS_LONG[month - 1],
  };
}
