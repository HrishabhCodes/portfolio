import type { Post } from "./writing";

/** Posts grouped by year, preserving newest-first order. */
export function groupByYear(posts: Post[]): [string, Post[]][] {
  const byYear = new Map<string, Post[]>();
  for (const p of posts) {
    const y = p.date.slice(0, 4);
    byYear.set(y, [...(byYear.get(y) ?? []), p]);
  }
  return [...byYear];
}
