/** First professional engineering role (Gutenberg internship). */
export const CAREER_START = new Date("2023-02-01");

/** Years of experience, floored to the nearest half year, e.g. 3.5. */
export function yearsOfExperience(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return Math.floor((months / 12) * 2) / 2;
}

/** "3.5+" style label used across the page, JSON-LD and llms.txt. */
export function yearsLabel(now: Date = new Date()): string {
  return `${yearsOfExperience(now)}+`;
}
