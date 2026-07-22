export function getDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Fractional years since a birth date, floored at 0 for a future date typo. */
export function ageYearsFromBirthDate(birthDate: string | Date, now: Date = new Date()): number {
  return Math.max(0, (now.getTime() - new Date(birthDate).getTime()) / MS_PER_YEAR);
}

/** "8 months old" / "1 year old" / "2 years, 3 months old" - exact age from a birth date. */
export function getReadableAge(years: number): string {
  const totalMonths = Math.max(0, Math.round(years * 12));
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  const yearPart = `${y} year${y === 1 ? "" : "s"}`;
  const monthPart = `${m} month${m === 1 ? "" : "s"}`;
  if (y === 0) return `${monthPart} old`;
  if (m === 0) return `${yearPart} old`;
  return `${yearPart}, ${monthPart} old`;
}

/** Approximate age from a hand-entered number of years - keeps the "~" to signal the estimate. */
export function getStringFromYears(years: number): string {
  if (years < 1) {
    return `~${Math.ceil(years * 12)} months old`;
  }
  return years === 1 ? "~1 year old" : `~${years} years old`;
}
