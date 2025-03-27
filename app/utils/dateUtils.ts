export function getDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function getStringFromYears(years: number): string {
  if(years < 1){
    return `~${Math.ceil(years * 12)} months old`;
  }
  return years === 1 ? "~1 year old" : `~${years} years old`;
}